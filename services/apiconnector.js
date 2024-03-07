const axios = require("axios");

const axiosInstance = axios.create({});

const apiConnector = (method, url, bodyData, headers, params) => {
    console.log("here inside apiConnector ", url);
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    });
};

module.exports = { apiConnector };
