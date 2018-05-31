const fetch = require("node-fetch");

module.exports = {
    getUserInfo: access_token => {
        return fetch(
            "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" +
                access_token
        ).then(response => response.json());
    },
    getPlaceDetail: place_id => {
        return fetch(
            "https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
                place_id +
                "&key=" +
                process.env.GOOGLE_API_KEY
        ).then(response => response.json());
    }
};
