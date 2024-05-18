import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData ? fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        }) : fetch(url);

        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (res.ok === false) throw new Error(`${data.message}(${res.status})`)

        return data;//resolved value of the promise
    }
    catch (err) {
        throw err;// re-throw to reject promise that is being returned
    }

}

/*
export const getJSON = async function (url) {
    try {
        const fetchPro = fetch(url);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (res.ok === false) throw new Error(`${data.message}(${res.status})`)

        return data;//resolved value of the promise
    }
    catch (err) {
        throw err;// re-throw to reject promise that is being returned
    }
}

export const sendJSON = async function (url, uploadData) {
    try {
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        });
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (res.ok === false) throw new Error(`${data.message}(${res.status})`)

        return data;//resolved value of the promise
    }
    catch (err) {
        throw err;// re-throw to reject promise that is being returned
    }
}
*/