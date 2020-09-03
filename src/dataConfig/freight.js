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
						let statusMap = {
								finished: '已结束',

						}
						let freightStatus = statusMap[row.status];

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
						let dispatchModeMap = {
								self: '自助调车模式',

						}
						let dispatchMode = dispatchModeMap[row.scheduleType];

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
						let meteMap = {
								ton: '吨',
								cube: '方',
								item: '件',

						}
						let meterageType = meteMap[row.meterageType];

						return h('span', meterageType);
				}
		},
		{
				title: '发布范围',
				render: (h, {
						row,
						column,
						index
				}) => {
						let releaseRangeMap = {
								platform: '全平台',

						}
						let releaseRange = releaseRangeMap[row.releaseRange];

						return h('span', releaseRange);
				}
		},
		{
				title: '需求车次',
				key: 'truckQty'
		},
		// {
		//   title: '待处理车次',
		//   key: 'acceptTruckNumber'
		// },
		{
				title: '已接车次',
				key: 'acceptTruckNumber'
		},
		{
				title: '已派车次',
				key: 'dispatchTruckNumber'
		},
		{
				title: '发货详细地址',
				key: 'loadingAddress'
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
				title: '联系人',
				key: 'contactUserFullName'
		},
		{
				title: '联系电话',
				key: 'contactPhone'
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
	return [
		{
		"showName":"运单号",
		"elementCode":"text",
		"extraParams":[{"field":"waybillNo","placeholder":"请输入运单号","controlType":"text","datasource":"","value":"","maxLength":1000}],
		"fieldConfigCode":"waybillNo",
		},
		{
		"showName":"车牌号",
		"elementCode":"text",
		"extraParams":[{"field":"truckLicenseNo","placeholder":"请输入车牌号","controlType":"text","datasource":"","value":"","maxLength":1000}],
		"fieldConfigCode":"truckLicenseNo",
		}
	]
}
function searchModel() {
	return {
		"waybillNo": null,
		"truckLicenseNo": null,
		"logisticsNo": null,
		"waybillStatus": null,
		"scheduleType": null,
		"driverConfirmStatus": null,
		"clientOrgName": null,
		"originalConsignOrgName": null,
		"consignOrgName": null,
		"driverFullName": null,
		"settleStatus": null,
		"consignEvaluation": null,
		"routeName": null,
		"routeCode": null,
		"loadingOrgName": null,
		"creatorUsername": null,
		"unloadingOrgName": null,
		"loadingProvinceCode": null,
		"loadingCityCode": null,
		"loadingCountyCode": null,
		"unloadingProvinceCode": null,
		"unloadingCityCode": null,
		"unloadingCountyCode": null,
		"waybillTag": null,
		"from_createTime": null,
		"undefined": null,
		"to_createTime": null
	}
}

export {
	columns,
	searchModel,
	searchFields,
};