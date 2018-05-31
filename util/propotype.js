module.exports = {
    clean: obj => {
        const newobj = {};
        for (var propName in obj) {
            if (obj[propName] !== null && obj[propName] !== undefined) {
                newobj[propName] = obj[propName];
            }
        }
        return newobj;
    },
    del_then_push_front: (arr, value) => {
        const newarr = []
        arr.map(v => {
            if(v !== value)
                newarr.push(v)
        })
        newarr.unshift(value)
        return newarr
    }
};
