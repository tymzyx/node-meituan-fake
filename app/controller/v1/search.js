'use stric'

import AddressComponent from '../common/addressComponent'

class SearchPlace extends AddressComponent {
    constructor() {
        super();
        this.search = this.search.bind(this);
    }

    async search(req, res) {
        let {type = 'search', cityName, keyword} = req.query;
        if (!keyword || !cityName) {
            res.send({
                name: 'ERROR_QUERY_TYPE',
				message: '参数错误',
            });
            return;
        }
        try {
            let resObj = await this.searchPlace(keyword, cityName, type);
            let placeList = [];
            resObj.data.forEach((item, index) => {
                placeList.push({
                    name: item.title,
                    address: item.address,
                    latitude: item.location.lat,
                    longitude: item.location.lng,
                    geohash: item.location.lat + ',' + item.location.lng,
                })
            });
            res.send(placeList);
        } catch (err) {
            res.send({
                name: 'GET_ADDRESS_ERROR',
                message: '获取地址信息失败'
            });
        }
    }
}

export default new SearchPlace();