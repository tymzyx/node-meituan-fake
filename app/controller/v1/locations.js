'use strict'

import AddressComponent from '../common/addressComponent';

class locationHandle extends AddressComponent {
    constructor() {
        super();
        this.pois = this.pois.bind(this);
    }

    async pois(req, res) {
        let geohash = req.params.geohash;
        try {
            if (geohash.indexOf(',') == -1) {
                throw new Error('参数错误');
            }
        } catch (err) {
            res.send({
                status: 0,
                type: 'ERROR_PARAMS',
                message: '参数错误'
            });
            return;
        }

        let poisArr = geohash.split(',');
        try {
            let result = await this.getPois(poisArr[1], poisArr[0]);
            let addressInfo = {
                address: result.result.address,
				city: result.result.address_component.province,
				latitude: poisArr[0],
				longitude: poisArr[1],
				name: result.result.formatted_addresses.recommend,
            };
            res.send(addressInfo);
        } catch (err) {
            console.log('getpois返回信息失败');
			res.send({
				status: 0,
				type: 'ERROR_DATA',
				message: '获取数据失败',
			})
        }
    }
}

export default new locationHandle();