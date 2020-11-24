const area = require('./area.json')
import {meterageUnitConfig} from '../config/unitConfig.js'

const dataSourcesObj = {};

/**
 * 省数据
 */
const province = dataSourcesObj.province = {
    getData(params, callback) {
        const autoData = [];
        area.forEach((data) => {
            autoData.push({
                'id': `${data.code}`,
                'value': data.name,
                'name': data.name,
                'data': data.name
            });
        });
        callback(autoData, null);
    },
};
/**
 * 市据源
 */
const city = dataSourcesObj.city = {
  getData(params, callback) {
    const autoData = [];
    for (let i = 0; i < area.length; i++) {
      const province = area[i];
      if (province.code == params.keyword) {
        const citys = province.citys;
        citys.forEach((data) => {
          autoData.push({
            'id': `${data.code}`,
            'value': data.name,
            'name': data.name,
            'data': data.name
          });
        });
        break;
      }
    }
    callback(autoData, null);
  },
};
/**
 * 区据源
 */
const county = dataSourcesObj.county = {
  getData(params, callback) {
    const autoData = [];
    for (let i = 0; i < area.length; i++) {
      const province = area[i];
      const citys = province.citys;
      for (let j = 0; j < citys.length; j++) {
        const city = citys[j];
        if (city.code == params.keyword) {
          const areas = city.county;
          areas.forEach((data) => {
            autoData.push({
              'id': `${data.code}`,
              'value': data.name,
              'name': data.name,
              'data': data.name
            });
          });
          break;
        }
      }
    }
    callback(autoData, null);
  },
};
/**
 * 货物单价单位
 */
const goodsPriceUnitCode = (params, callback) => {
  const autoData = [];
  let unit = params.keyword;
  let goodsPrice = meterageUnitConfig[unit]['goods.price'];
  autoData.push({
    'id': `${goodsPrice.id}`,
    'value': goodsPrice.name,
    'name': goodsPrice.name,
    'data': goodsPrice.name
  });
  callback(autoData, null);
};


function getAll(sources, params, cb) {
    let data = [],
        count = 0;
    const len = sources.length,
        cacheArray = ['province', 'city', 'county', 'goodsLossRation', 'goodsLoss', 'standardDistance', 'goodsNumber', 'goodsVolume', 'goodsWeight', 'chargeItemNumber', 'chargeItemPrice', 'chargeItemAmount', 'truckModel', 'truckSize', 'truckCarry', 'truckCubage', 'driverPrice', 'routeDuration', 'goodsPrice', 'carrierPrice'];
    sources.forEach((val) => {
        const key = `${val}-${Object.keys(params)}-${Object.values(params)}`;
        if (localStorage.getItem(key)) {
            data = data.concat(JSON.parse(localStorage.getItem(key)));
            count += 1;
            if (count === len) {
                cb(data, null);
            }
        } else {
            dataSourcesObj[val].getData(params, (success) => {
                if (cacheArray.indexOf(val) > -1) {
                    localStorage.setItem(key, JSON.stringify(success));
                }
                data = data.concat(success);
                count += 1;
                if (count === len) {
                    cb(data, null);
                }
            });
        }
    });
}


export {
    getAll,
    province,
    city,
    county,
    goodsPriceUnitCode

};
