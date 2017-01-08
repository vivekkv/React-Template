import 'whatwg-fetch';
var Promise = require('bluebird');

function parseJSON(response) {
    return new Promise((resolve) => {
        response.json().then((data) => {
            data.status = response.status;
            return resolve(data)
        });
    })
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function request(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => ({
            data
        }))
        .catch((err) => ({
            err
        }));
}