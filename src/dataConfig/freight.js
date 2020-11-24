import {publishStatus,scheduleType, meterageType,releaseRange, getAreaName} from '../config/unitConfig.js'
function columns (){
	return [
		{
      title: '货源号',
      slot: 'freightNo',
      fixCol:true
		},
		{
      title: '订单号',
      key: 'logisticsCode'
		},
		{
      title: '货源状态',
      render: (h, {
        row,
        column,
        index
      }) => {
        let freightStatus = publishStatus[row.status];

        return h('span', freightStatus);
      }
		},
		{
      title: '调车模式',
      render: (h, {
        row,
        column,
        index
      }) => {
        let dispatchMode = scheduleType[row.scheduleType];

        return h('span', dispatchMode);
      }
		},
		{
      title: '计量标准',
      render: (h, {
        row,
        column,
        index
      }) => {
        let meterageTypes = meterageType[row.meterageType];

        return h('span', meterageTypes);
      }
		},
		{
      title: '发布范围',
      render: (h, {
        row,
        column,
        index
      }) => {
        let releaseRanges = releaseRange[row.releaseRange];

        return h('span', releaseRanges);
      }
		},
		{
      title: '需求车次',
      key: 'truckQty'
		},
		{
      title: '已接车次',
      key: 'acceptTruckNumber'
		},
		{
      title: '已派车次',
      key: 'dispatchTruckNumber'
		},
		{
			title: '发货地',
			render: (h, {
				row,
				column,
				index
			}) => {
				let loadingAddress = getAreaName(row.loadingProvinceCode, row.loadingCityCode, row.loadingCountyCode);

				return h('span', loadingAddress);
			}
		},
		{
      title: '发货详细地址',
      key: 'loadingAddress'
		},
		{
			title: '收货地',
			render: (h, {
				row,
				column,
				index
			}) => {
				let loadingAddress = getAreaName(row.unloadingProvinceCode, row.unloadingCityCode, row.unloadingCountyCode);

				return h('span', loadingAddress);
			}
		},
  {
      title: '收货详细地址',
      key: 'unloadingAddress'
		},
		{
      title: '货物名称',
      key: 'goodsName'
		},
		{
      title: '货物重量',
      key: 'goodsWeight'
		},
		{
			title: '货物体积',
			key: 'goodsVolume'
		},
		{
			title: '货物数量',
			key: 'goodsAmount'
		},
		{
			title: '报价类型',
			slot: 'quoteType'
		},
		{
			title: '车型要求',
			slot: 'truckModelRequire'
		},
		{
			title: '车长要求',
			render: (h, {
				row,
				column,
				index
			}) => {
				let truckLengthRequireList = row.truckLengthRequire ? row.truckLengthRequire.split(',') : [];
				let truckLengthRequire = '';
				truckLengthRequireList.forEach((item)=>{
					truckLengthRequire+=item+'米 '
				})

				return h('span', truckLengthRequire);
			}
		},
		{
      title: '联系人',
      key: 'contactUserFullName'
		},
		{
      title: '联系电话',
      key: 'contactPhone'
		},
		{
			title: '发布人',
			key: 'publishUserFullName'
		},
		{
      title: '货源有效期',
      key: 'freightEndTime'
		},
		{
      title: '客户',
      key: 'clientOrgName'
		},
		{
      title: '线路名称',
      key: 'routeName'
		},
	];
}
function searchFields() {
	return [{
		"showName": "货源号",
		"elementCode": "text",
		"extraParams": [{
			"field": "freightNo",
			"controlType": "text",
			"datasource": "",
			"value": "",
			"maxLength": 1000
		}],
		"fieldConfigCode": "freightNo",
		
	}, {
		"showName": "订单号",
		"elementCode": "text",
		"extraParams": [{
			"field": "logisticsNo",
			"controlType": "text",
			"datasource": "",
			"value": "",
			"maxLength": 1000
		}],
		"fieldConfigCode": "logisticsNo",
	}, {
		"showName": "货源状态",
		"elementCode": "select",
		"extraParams": [{
			"field": "status",
			"optionsValue": ["pushling", "finished"],
			"options": ["发布中", "已结束"],
			"controlType": "select",
			"datasource": "",
			"value": "",
			"text": ""
		}],
		"fieldConfigCode": "status",
	
	}, {
		"showName": "调车模式",
		"elementCode": "select",
		"extraParams": [{
			"required": "false",
			"field": "scheduleType",
			"default": "",
			"optionsValue": ["platform", "self"],
			"options": ["委托调车模式", "自助调车模式"],
			"controlType": "select",
			"datasource": "",
			"value": "",
			"text": ""
		}],
		"fieldConfigCode": "scheduleType",
		"required": "false",
		"detailLinkVisiable": "false",
	},  {
		"showName": "发货地",
		"elementCode": "selectArea",
		"extraParams": [{
			"field": "loadingProvinceCode",
			"controlType": "select",
			"datasource": "province",
			"value": "",
			"text": ""
		}, {
			"field": "loadingCityCode",
			"controlType": "select",
			"datasource": "city",
			"value": "",
			"text": ""
		}, {
			"field": "loadingCountyCode",
			"controlType": "select",
			"datasource": "county",
			"value": "",
			"text": ""
		}],
		"fieldConfigCode": "loadingArea",
	}, {
		"showName": "收货地",
		"elementCode": "selectArea",
		"extraParams": [{
			"field": "unloadingProvinceCode",
			"controlType": "select",
			"datasource": "province",
			"value": "",
			"text": ""
		}, {
			"field": "unloadingCityCode",
			"controlType": "select",
			"datasource": "city",
			"value": "",
			"text": ""
		}, {
			"field": "unloadingCountyCode",
			"controlType": "select",
			"datasource": "county",
			"value": "",
			"text": ""
		}],
		"fieldConfigCode": "unloadingArea",
	}]
}
function searchModel() {
	return {
		"freightNo": null,
		"status": null,
		"scheduleType": null,
		"logisticsNo": null,
		"loadingProvinceCode": null,
		"loadingCityCode": null,
		"loadingCountyCode": null,
		"unloadingProvinceCode": null,
		"unloadingCityCode": null,
		"unloadingCountyCode": null
	}
}

export {
	columns,
	searchModel,
	searchFields,
};