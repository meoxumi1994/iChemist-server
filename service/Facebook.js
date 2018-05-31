const fetch = require("node-fetch");

module.exports = {
    getUserInfo: access_token => {
        return fetch(
            "https://graph.facebook.com/me?fields=id,name,picture,cover&access_token=" + access_token
        ).then(response => response.json());
    }
};
