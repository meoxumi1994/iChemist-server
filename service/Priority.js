const Priority = require("../model/Priority");

const MAX_LEVEL = process.env.MAX_LEVEL;
const MAX_PRIORITY_LENGTH = process.env.MAX_PRIORITY_LENGTH;

const d_x = [0, 0, 1, 1]
const d_y = [0, 1, 0, 1]

const compare_of_agency = (first, second) => {
    return first._score < second._score
}

const balance_agency = (agencies, index) => {
    let id = index
    while (0 < id && agencies[id - 1]._score < agencies[id]._score) {
        const t = agencies[id - 1];
        agencies[id - 1] = agencies[id];
        agencies[id] = t;
        id = id - 1;
    }
    while (id < agencies.length - 1 && agencies[id]._score < agencies[id + 1]._score) {
        const t = agencies[id + 1];
        agencies[id + 1] = agencies[id];
        agencies[id] = t;
        id = id + 1;
    }
}

const push_to_priority = (lvl, x, y, { _category_id, _agency_id, _score, lat, lng, name, marker_icon }) => {
    const _hash_id = _category_id + "+" + lvl + "+" + x + "+" + y
    const data_push_to_agency = { _agency_id, _score, lat: lat - 90, lng: lng - 180, name, marker_icon }
    return Priority.findOne({ _hash_id }).then(priority => {
        if (!priority) {
            return Priority.create({
                _hash_id,
                agencies: [data_push_to_agency]
            });
        } else {
            const agencies = priority.agencies;
            let isInside = false;
            for (let i = 0; i < agencies.length; i++) {
                if (agencies[i]._agency_id+'' === _agency_id+'') {
                    agencies[i]._score = _score;
                    agencies[i].lat = lat - 90
                    agencies[i].lng = lng - 180
                    agencies[i].name = name
                    balance_agency(agencies, i);
                    isInside = true
                    break;
                }
            }
            if (!isInside) {
                agencies.push(data_push_to_agency);
                balance_agency(agencies, agencies.length - 1);
            }

            while (agencies.length > MAX_PRIORITY_LENGTH && lvl < MAX_LEVEL)
                agencies.pop();
            priority.agencies = agencies;
            priority.markModified('agencies');
            return priority.save();
        }
    });
}

const push_tree = (lvl, x, y, dis, data) => {
    const { lat, lng } = data;

    push_to_priority(lvl, x, y, data);

    if (lvl >= MAX_LEVEL) return;

    const new_dis = dis / 2;
    const new_x = lng < (x * 2 + 1) * new_dis ? x * 2 : x * 2 + 1;
    const new_y = lat < (y * 2 + 1) * new_dis ? y * 2 : y * 2 + 1;

    push_tree(lvl + 1, new_x, new_y, new_dis, data);
}

const down_tree = (lvl, x, y, dis, data) => {
    const { _category_id, lat, lng, _agency_id } = data;

    const new_dis = dis / 2;
    const new_x = lng < (x * 2 + 1) * new_dis ? x * 2 : x * 2 + 1;
    const new_y = lat < (y * 2 + 1) * new_dis ? y * 2 : y * 2 + 1;

    return push_to_priority(lvl, x, y, data)
        .then(cur_priority => {
            const agencies = cur_priority.agencies
            if( lvl < MAX_LEVEL ){
                return down_tree(lvl + 1, new_x, new_y, new_dis, data)
                    .then(child_priority => {
                        if( agencies[ agencies.length - 1 ]._agency_id == _agency_id ){
                            return { need_update: true, cur_priority, child_priority }
                        }else {
                            return { need_update: false, cur_priority }
                        }
                    })
            }
            return { need_update: false, cur_priority }
        })
        .then(({ need_update, child_priority, cur_priority }) => {
            if(need_update){
                const final_agencies = child_priority.agencies
                return Promise.all(d_x.map((value, index) => {
                    child_x = x * 2 + d_x[index]
                    child_y = y * 2 + d_y[index]
                    if(new_x == child_x && new_y == child_y) return;
                    _hash_id = _category_id + "+" + (lvl + 1) + "+" + child_x + "+" + child_y;
                    return Priority.findOne({ _hash_id })
                        .then(priority => {
                            if(priority){
                                final_agencies.push( ...priority.agencies )
                            }
                        })
                }))
                .then(() => {
                    final_agencies.sort(compare_of_agency)
                    cur_priority.agencies = final_agencies.slice(0, MAX_PRIORITY_LENGTH)
                    return cur_priority.save()
                })
            }else{
                return cur_priority
            }
        })
        .catch(err => {
            return err
        })
}

module.exports = {
    push: data => {
        data.lat = parseFloat(data.lat) + 90;
        data.lng = parseFloat(data.lng) + 180;
        data._score = parseFloat(data._score);

        push_tree(0, data.lng < 180 ? 0 : 1, 0, 180, data);
    },
    down: data => {
        data.lat = parseFloat(data.lat) + 90;
        data.lng = parseFloat(data.lng) + 180;
        data._score = parseFloat(data._score);
        down_tree(0, data.lng < 180 ? 0 : 1, 0, 180, data);
    }
};
