const publishStatus = {//货源发布状态
    pushling: '发布中',
    finished: '已结束'
}
const scheduleType = {//调车模式
    self: '自助调车',
    platform: '委托调车'
}
const meterageType = {//计量标准
    ton: '吨',
    cube: '方',
    item: '件',
}
const releaseRange = {//发布范围
    platform: '全平台',
    designated: '指定范围',
    private: '不公开',
}
function getAreaName(provinceCode, cityCode, countyCode) {
    const areaInfo = JSON.parse(localStorage.getItem('areaInfo'));
    let provinceName = areaInfo['province'][provinceCode];
    let cityName = areaInfo['city'][cityCode];
    let countyName = areaInfo['county'][countyCode];
    return provinceName + '-' + cityName + '-' + countyName;
}
const meterageUnitConfig = {
    'cube': {
        'carrier.price': {
            'yuanpersquare': '元/方',
            'yuanpertruck': '元/车',
        },
        'driver.prices': {
            'yuanpercube': '元/方',
            'yuanpertruck': '元/车'
        },
        'driver.price': [{
                name: '元/方',
                id: 'yuanpercube'
            },
            {
                name: '元/车',
                id: 'yuanpertruck'
            }
        ],
        'goods.loss': {
            'cube': '方/车'
        },
        'goods.price': {
            name: '元/方',
            id: 'yuanpercube'
        },
        'goods.volume': {
            'cube': '方'
        },
        'settle.volume.unit': {
            'cube': '方'
        },
        'truck.cubage': {
            'cube': '方'
        }
    },
    'item': {
        'carrier.price': {
            'yuanperitem': '元/件',
            'yuanpertruck': '元/车'
        },
        'driver.prices': {
            'yuanperitem': '元/件',
            'yuanpertruck': '元/车'
        },
        'driver.price': [{
                name: '元/件',
                id: 'yuanperitem'
            },
            {
                name: '元/车',
                id: 'yuanpertruck'
            }
        ],
        'goods.loss': {
            'item': '件/车'
        },
        'goods.number': {
            'item': '件'
        },
        'goods.price': {
            name: '元/件',
            id: 'yuanperitem'
        },
        'settle.volume.unit': {
            'item': '件'
        }
    },
    'ton': {
        'carrier.price': {
            'yuanperton': '元/吨',
            'yuanpertruck': '元/车'
        },
        'driver.prices': {
            'yuanperton': '元/吨',
            'yuanpertruck': '元/车'
        },
        'driver.price': [{
                name: '元/吨',
                id: 'yuanperton'
            },
            {
                name: '元/车',
                id: 'yuanpertruck'
            }
        ],
        'goods.loss': {
            'ton': '吨/车'
        },
        'goods.price': {
            name: '元/吨',
            id: 'yuanperton'
        },
        'goods.weight': {
            'ton': '吨'
        },
        'settle.volume.unit': {
            'ton': '吨'
        },
        'truck.carry': {
            'ton': '吨'
        },
    },
}

export {
    publishStatus,
    scheduleType,
    meterageType,
    releaseRange,
    getAreaName,
    meterageUnitConfig,
}