'use strict'

import BaseComponent from './baseComponent'

/*
腾讯地图调配组件
 */
class AddressComponent extends BaseComponent {
    constructor() {
        super();
        this.tencentKey = '3TLBZ-TNKWF-ISHJA-NQS72-Z37Z6-J5BBC'
    }
    // 搜索地址
    async searchPlace(keyword, cityName, type = 'search') {
        try {
            let resObj = await this.fetch('http://apis.map.qq.com/ws/place/v1/search', {
                key: this.tencentKey,
                keyword: encodeURIComponent(keyword),
                boundary: 'region(' + encodeURIComponent(cityName) + ',0)',
                page_size: 10
            });
            if (resObj.status == 0) {
                return resObj;
            } else {
                throw new Error('搜索位置信息失败');
            }
        } catch (err) {
            throw new Error(err);
        }
    }
    // 通过geohash获取精确位置
    async getPois(lon, lat) {
        try {
            const res = await this.fetch('http://apis.map.qq.com/ws/geocoder/v1/', {
                key: this.tencentKey,
                location: lat + ',' + lon
            });
            if (res.status == 0) {
                return res;
            } else {
                throw new Error('通过geohash获取具体位置失败');
            }
        } catch (err) {
            console.log('getPois获取定位失败');
			throw new Error(err);
        }
    }
}

export default AddressComponent;