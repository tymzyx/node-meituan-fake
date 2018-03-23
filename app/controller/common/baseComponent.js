'use strict'

let fetch = require('node-fetch');

class BaseComponent {
    constructor() {
        this.test = 'test';
    }

    async fetch(url = '', data = {}, type = 'GET', resType = 'json') {
        type = type.toUpperCase();
        resType = resType.toUpperCase();

        if (type === 'GET') {
            let dataStr = ''; // GET数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&';
            });
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
                url = url + '?' + dataStr;
            }
        }

        let requestConfig = {
            method: type,
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json'
            }
        };

        if (type === 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }

        let responseJson;
        try {
            const response = await fetch(url, requestConfig);
            if (resType === 'TEXT') {
                responseJson = await response.text();
            } else {
                responseJson = await response.json();
            }
        } catch (err) {
            console.log('获取HTTP数据失败', err);
            throw new Error(err);
        }
        return responseJson;
    }
}

export default BaseComponent;