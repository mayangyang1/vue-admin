<template>
  <div class="form-page">
    <el-form :model="domainObject" ref="form" label-width="100px">
      <layout :fields="fields" :domainObject="domainObject">
        <!-- 调车模式 -->
        <ele-radio slot="scheduleType"  :editable="editable" :configData="fields.scheduleType" :domainObject="domainObject"  @change="modeChange"></ele-radio>
        <!-- 货源编号 -->
        <ele-input v-if="domainObject['freightNo']"  slot="freightNo"  :editable="editable" :configData="fields.freightNo" :domainObject="domainObject" ></ele-input>
        <!-- 状态 -->
        <ele-select slot="status"  :editable="editable" :configData="fields.status"  :domainObject="domainObject" ></ele-select> 
        <!-- 订单号 -->
        <ele-input slot="logisticsNo" :editable="editable" :configData="fields.logisticsNo" :domainObject="domainObject" ></ele-input>
        <ele-pop-select slot="popSelect"  :popInfoConfig="logisticsPopConfig" @selectOperation="logisticsSelectOperation"></ele-pop-select>                 
        <!-- 客户 -->
        <ele-input slot="clientOrgName" :editable="editable" :configData="fields.clientOrgName" :domainObject="domainObject" ></ele-input>
        <ele-pop-select slot="clientOrgpopSelect"  :popInfoConfig="clientOrgPopConfig" @selectOperation="partnerSelectOperation"></ele-pop-select>  
         <!-- 结算方式 -->
        <ele-select slot="settleMethod"  :editable="editable" :configData="fields.settleMethod"  :domainObject="domainObject" ></ele-select>   
         <!-- 运单生成方式 -->
        <ele-select slot="dispatchMode" :editable="editable" :configData="fields.dispatchMode"  :domainObject="domainObject" ></ele-select>  
        <!-- 业务类型 -->
        <ele-select slot="businessTypeCode" :editable="editable" :configData="fields.businessTypeCode"  :domainObject="domainObject" ></ele-select> 
        <!-- 货物类型 -->
        <ele-select slot="cargoTypeClassificationCode" :editable="editable" :configData="fields.cargoTypeClassificationCode"  :domainObject="domainObject" ></ele-select> 
        <!-- 货物名称 -->
        <ele-input  slot="goodsName"  :editable="editable" :configData="fields.goodsName" :domainObject="domainObject" ></ele-input>  
        <!-- 记量标准 -->       
        <ele-radio slot="meterageType" :editable="editable" :configData="fields.meterageType" :domainObject="domainObject"  @change="meterageTypeChange"></ele-radio>
        <!-- 货物单价 -->
        <ele-input slot="goodsPrice" :editable="editable" :configData="fields.goodsPrice" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <ele-select slot="goodsPriceUnitCode" class="mgl10" :editable="editable" :configData="fields.goodsPriceUnitCode"  :domainObject="domainObject" ></ele-select>   
        <!-- 合理货差系数 -->
        <ele-radio slot="goodsLossMethod"  :editable="editable" :configData="fields.goodsLossMethod" :domainObject="domainObject"  @change="goodsLossChange"></ele-radio>
        <ele-input slot="goodsLoss" class="mgl10" :editable="editable" :configData="fields.goodsLoss" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <ele-select slot="goodsLossUnitCode" class="mgl10" :editable="editable" :configData="fields.goodsLossUnitCode"  :domainObject="domainObject" ></ele-select>             
        <!-- 货物重量 -->
        <ele-input slot="goodsWeight" :editable="editable" :configData="fields.goodsWeight" :domainObject="domainObject" ></ele-input>
        <ele-select slot="goodsWeightUnitCode"  class="mgl10" :editable="editable" :configData="fields.goodsWeightUnitCode"  :domainObject="domainObject"></ele-select>  
        <!-- 货物体积 -->
        <ele-input slot="goodsVolume" :editable="editable" :configData="fields.goodsVolume" :domainObject="domainObject" ></ele-input>
        <ele-select slot="goodsVolumeUnitCode"  class="mgl10" :editable="editable" :configData="fields.goodsVolumeUnitCode"  :domainObject="domainObject"></ele-select>  
        <!-- 货物数量 -->
        <ele-input slot="goodsAmount" :editable="editable" :configData="fields.goodsAmount" :domainObject="domainObject" ></ele-input>
        <ele-select slot="goodsAmountUnitCode" class="mgl10" :editable="editable" :configData="fields.goodsAmountUnitCode"  :domainObject="domainObject"></ele-select>    
        <!-- 需求车次-->
        <ele-input slot="truckQty" :editable="editable" :configData="fields.truckQty" :domainObject="domainObject" ></ele-input>   
        <!-- 车型要求 -->
        <ele-select slot="truckModelRequire" :editable="editable" :configData="fields.truckModelRequire"  :domainObject="domainObject" ></ele-select>            
        <!-- 车长要求 -->        
        <ele-checkbox slot="truckLengthRequire" :editable="editable" :configData="fields.truckLengthRequire" :domainObject="domainObject"></ele-checkbox>
        <!-- 客户运价 -->
        <ele-input slot="clientFreightPrice" :editable="editable" :configData="fields.clientFreightPrice" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <ele-select slot="clientFreightPriceUnitCode" class="mgl10" :editable="editable" :configData="fields.clientFreightPriceUnitCode"  :domainObject="domainObject" ></ele-select>   
        <!-- 司机报价类型 -->
        <ele-radio slot="quoteType"  :editable="editable" :configData="fields.quoteType" :domainObject="domainObject"  @change="quoteTypeChange"></ele-radio>
        <ele-input v-if="quoteType === 'price'" slot="quotePrice" class="mgl10" :editable="editable" :configData="fields.quotePrice" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <ele-select slot="quotePriceUnitCode" class="mgl10" :editable="editable" :configData="fields.quotePriceUnitCode"  :domainObject="domainObject" ></ele-select>             
        <!-- 司机电子合约模板 -->
        <ele-input slot="ssqTid" :editable="editable" :configData="fields.ssqTid" :domainObject="domainObject" @focus="handleFocus"></ele-input>  
        <!-- 线路名称 -->
        <ele-input slot="routeName" :editable="editable" :configData="fields.routeName" :domainObject="domainObject" ></ele-input>
        <ele-pop-select slot="routeNamepopSelect"  :popInfoConfig="routeNamePopConfig" @selectOperation="routeNameSelectOperation"></ele-pop-select>  
        <!-- 标准运距 -->
        <ele-input slot="standardDistance" :editable="editable" :configData="fields.standardDistance" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <ele-select slot="standardDistanceUnitCode" class="mgl10" :editable="editable" :configData="fields.standardDistanceUnitCode"  :domainObject="domainObject" ></ele-select>   
        <!-- 发货单位  -->
        <ele-input slot="loadingOrgName" :editable="editable" :configData="fields.loadingOrgName" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <!-- 收货单位  -->
        <ele-input slot="unloadingOrgName" :editable="editable" :configData="fields.unloadingOrgName" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <!-- 发货单位税号  -->
        <ele-input slot="loadingOrgTaxID" :editable="editable" :configData="fields.loadingOrgTaxID" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <!-- 收货单位税号  -->
        <ele-input slot="unloadingOrgTaxID" :editable="editable" :configData="fields.unloadingOrgTaxID" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <!-- 发货联系人  -->
        <ele-input slot="loadingUserFullName" :editable="editable" :configData="fields.loadingUserFullName" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <!-- 收货联系人  -->
        <ele-input slot="unloadingUserFullName" :editable="editable" :configData="fields.unloadingUserFullName" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <!-- 发货联系电话  -->
        <ele-input slot="loadingUserPhone" :editable="editable" :configData="fields.loadingUserPhone" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <!-- 收货联系电话  -->
        <ele-input slot="unloadingUserPhone" :editable="editable" :configData="fields.unloadingUserPhone" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <!-- 发货地 -->
        <ele-select-area slot="loadingArea" :selectAreaData="fields.loadingArea" :domainObject="domainObject" :editable="editable"></ele-select-area>
        <!-- 收货地 -->
        <ele-select-area slot="unloadingArea" :selectAreaData="fields.unloadingArea" :domainObject="domainObject" :editable="editable"></ele-select-area>
        <!-- 发货详细地址  -->
        <ele-input slot="loadingAddress" :editable="editable" :configData="fields.loadingAddress" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <!-- 收货详细地址  -->
        <ele-input slot="unloadingAddress" :editable="editable" :configData="fields.unloadingAddress" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <!-- 联系人  -->
        <ele-input slot="contactUserFullName" :editable="editable" :configData="fields.contactUserFullName" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <!-- 联系电话  -->
        <ele-input slot="contactPhone" :editable="editable" :configData="fields.contactPhone" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <!-- 货源有效期  -->        
        <ele-date slot="freightEndTime" :editable="editable" :configData="fields.freightEndTime" :domainObject="domainObject"></ele-date>
        <!-- 备注  -->       
        <ele-textarea slot="description" :editable="editable" :configData="fields.description" :domainObject="domainObject"></ele-textarea>
        <!-- 是否代开发票  --> 
        <ele-radio slot="isProxyInvoice" :editable="editable" :configData="fields.isProxyInvoice" :domainObject="domainObject"  @change="proxyInvoiceChange"></ele-radio>
        <!-- 发布范围  --> 
        <ele-radio slot="releaseRange" :editable="editable" :configData="fields.releaseRange" :domainObject="domainObject"  @change="releaseRangeChange"></ele-radio>
        
        <el-button id="main-bg-color" class="common-button" slot="buttonSubmit" @click="submitForm('form')"> 提交认证</el-button>
        <el-button class="common-button"  slot="buttonReset" @click="setForm('form')">重置</el-button>
        
      </layout>
    </el-form> 
    
  </div>
</template>

<script>
import EleDate from '@/components/widget/EleDate.vue'
import layout from '@/views/freight/layout.vue'
import EleSelect from '@/components/widget/EleSelect.vue'
import EleRadio from '@/components/widget/EleRadio.vue'
import EleInput from '@/components/widget/EleInput.vue'
import EleCheckbox from '@/components/widget/EleCheckbox.vue'
import EleTextarea from '@/components/widget/EleTextarea.vue'
import ElePopSelect from '@/components/widget/ElePopSelect.vue'
import EleSelectArea from '@/components/widget/EleSelectArea.vue'
import {domainObject} from '@/dataConfig/addFreight.js'
import {publishStatus, orgCertStatusStatus,meterageUnitConfig} from '@/config/unitConfig.js'
import {formatTime} from '@/config/util.js'
import serviceUrl from '@/api/servise.js'
export default {
  name: 'addResource',
  components: {
    layout,
    'ele-textarea': EleTextarea,
    'ele-checkbox': EleCheckbox,
    'ele-date': EleDate,
    'ele-select': EleSelect,
    'ele-input': EleInput,
    'ele-radio': EleRadio,
    'ele-pop-select': ElePopSelect,
    'ele-select-area': EleSelectArea
  },
  props: {
    editable: {
      type: Boolean,
      'default': true
    },
    isList: {
      type: Boolean,
      'default': false
    },
  },
  data() {
    return {
      domainObject: domainObject(),
      fields:{
        scheduleType :{
          field: "scheduleType",
          optionsValue: [ "self","platform"],
          options: ["自助调车模式","委托调车模式"],
          rules:[
            { required: true, message: '请选择调车模式', trigger: 'change' }
          ]
        },
        goodsPrice: {
          field: "goodsPrice",
          placeholder: "请输入内容",
          maxLength: 1000,
          readonly: 'false',//false/true/readonly
          rules:[
            { required: true, message: '请输入货物单价', trigger: 'blur' },
          ]
        },
        goodsPriceUnitCode: {
          field: "goodsPriceUnitCode",
          selectData:[
            {"value":"元/吨","id":"yuanperton"},
          ],
          rules:[
            { required: true, message: '请选择货物单价', trigger: 'change' }
          ]
        },
        freightNo: {
          field: "freightNo",
          maxLength: 1000,
          readonly: 'false',
          placeholder:'请输入货源号',
          rules:[
            { required: true, message: '请输入货源号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        logisticsNo: {
          field: "logisticsNo",
          readonly: "readonly",
          placeholder: '请选择运单',
          maxLength: 1000
        },
        status: {
          field: "status",
          selectData:[
            {"value":"发布中","id":"pushling"},
            {"value":"已结束","id":"finished"}
          ],
          rules:[
            { required: true, message: '请选择运单状态', trigger: 'change' }
          ]
        },
        clientOrgName: {
          field: "clientOrgName",
          readonly: "readonly",
          placeholder: '请选择客户',
          maxLength: 1000,
          rules:[
            { required: true, message: '请选择客户', trigger: 'change' }
          ]
        },
        settleMethod:{
          field: "settleMethod",
          selectData:[
            {"value":"按发货货量","id":"loadingweight"},
            {"value":"按收货货量","id":"unloadingweight"},
            {"value":"发货与收货两者取小","id":"smaller"},
            {"value":"发货与收货两者取大","id":"bigger"},
            {"value":"按车次","id":"finished"}

          ],
          rules:[
            { required: true, message: '请选择结算方式', trigger: 'change' }
          ]
        },
        dispatchMode:{
          field: "dispatchMode",
          selectData:[
            {"value":"人工确认","id":"manual"},
            {"value":"自动生成","id":"auto"},

          ],
          rules:[
            { required: true, message: '请选择运单生成方式', trigger: 'change' }
          ]
        },
        businessTypeCode: {
          field: "businessTypeCode",
          selectData:[
            {"value":"干线普货运输","id":"1002996"},
            {"value":"城市配送","id":"1003997"},
            {"value":"农村配送","id":"1003998"},
            {"value":"集装箱运输","id":"1002998"},
            {"value":"其他","id":"1003999"},

          ],
          rules:[
            { required: true, message: '请选择业务类型', trigger: 'change' }
          ]
        },
        cargoTypeClassificationCode: {
          field: "cargoTypeClassificationCode",
          selectData:[
            {"id":"0100","value":"煤炭及制品",},
            {"id":"0200","value":"石油、天然气及制品",},
            {"id":"0300","value":"金属矿石"},
            {"id":"0400","value":"钢铁"},
            {"id":"0500","value":"矿建材料"},
            {"id":"0600","value":"水泥"},
            {"id":"0700","value":"木材"},
            {"id":"0800","value":"非金属矿石"},
            {"id":"0900","value":"化肥及农药"},
            {"id":"1000","value":"盐"},
            {"id":"1100","value":"粮食"},
            {"id":"1200","value":"机械、设备、电器"},
            {"id":"1300","value":"轻工原料及制品"},
            {"id":"1400","value":"有色金属"},
            {"id":"1500","value":"轻工医药产品"},
            {"id":"1601","value":"鲜活农产品"},
            {"id":"1602","value":"冷藏冷冻货物"},
            {"id":"1701","value":"商品汽车"},
            {"id":"1700","value":"其他 "}

          ],
          rules:[
            { required: true, message: '请选择货物类型', trigger: 'change' }
          ]
        },
        goodsName: {
          field: "goodsName",
          placeholder:'请输入货物名称',
          rules:[
            { required: true, message: '请输入货物名称', trigger: 'blur' },
          ]
        },
        meterageType: {
          field: "meterageType",
          optionsValue: ["ton", "cube", "item"],
          options: ["吨", "方", "件"],
        },
        goodsLossMethod: {
          field: "goodsLossMethod",
          optionsValue: [ "goods.loss.ration","goods.loss"],
          options: ["按系数","按量"],
        },
        goodsLoss: {
          field: "goodsLoss",
          placeholder:'请输入合理货差系数',
          rules:[
            { required: true, message: '请输入合理货差系数', trigger: 'change' }
          ]

        },
        goodsLossUnitCode: {
          field: "goodsLossUnitCode",
          selectData:[
            {"id":"percent","value":"‰",},
          ]
        },
        goodsWeight:{
          field: "goodsWeight",
          placeholder: "请输入货物重量",
        },
        goodsWeightUnitCode:{
          field: "goodsWeightUnitCode",
          selectData:[
            {"value":"吨","id":"ton"},
          ],
        },
        goodsVolume:{
          field: "goodsVolume",
           placeholder: "请输入货物体积",
        },
        goodsVolumeUnitCode:{
          field: "goodsVolumeUnitCode",
          selectData:[
            {"value":"方","id":"cube"},
          ],
        },
        goodsAmount:{
          field: "goodsAmount",
           placeholder: "请输入货物件数",
        },
        goodsAmountUnitCode:{
          field: "goodsAmountUnitCode",
          selectData:[
            {"value":"件","id":"item"},
          ],
        },
        truckQty: {
          field: "truckQty",
          placeholder: "请输入需求车次",
        },
        truckModelRequire: {
          field: "truckModelRequire",
          selectData:[
            {"id":"percent","value":"重型普通货车",},
          ]
        },
        truckLengthRequire: {
          field: "truckLengthRequire",
          optionsValue: ["4.2", "5", "6.2", "6.3", "6.8", "7.2", "7.5", "7.7", "7.8", "8", "8.7", "9.6", "12", "12.5", "13", "13.5", "16", "17.5"],
          options: ["4.2米", "5米", "6.2米", "6.3米", "6.8米", "7.2米", "7.5米", "7.7米", "7.8米", "8米", "8.7米", "9.6米", "12米", "12.5米", "13米", "13.5米", "16米", "17.5米"],
          value: [],
        },
        clientFreightPrice: {
          field: "clientFreightPrice",
          placeholder:'请输入客户运价'
        },
        clientFreightPriceUnitCode: {
           field: "clientFreightPriceUnitCode",
           selectData:[
            {"id":"percent","value":"元/吨",},
          ]
        },
        quoteType: {
          field: "quoteType",
          optionsValue: [ "quote","price"],
          options: ["司机报价","一口价"],
        },
        quotePrice: {
          field: "quotePrice",
          placeholder:'请输入报价',
          rules:[
            { required: true, message: '请输入报价', trigger: 'change' }
          ]

        },
        quotePriceUnitCode: {
          field: "quotePriceUnitCode",
          selectData:[
            {"id":"yuanperton","value":"元/吨",},
            {"id":"yuanpertruck","value":"元/车",},
          ]
        },
        ssqTid: {
          field: "ssqTid",
          placeholder:'请输入电子合约模板',
        },
        routeName:{
          field: "routeName",
          readonly: "readonly",
          placeholder: '请选择线路名称',
          maxLength: 1000
        },
        standardDistance: {
          field: 'standardDistance',
          placeholder: '请输入标准运距',
        },
        standardDistanceUnitCode: {
          field: 'standardDistanceUnitCode',
          selectData:[
            {"id":"km","value":"公里",},
          ]
        },
        loadingOrgName: {
          field: 'loadingOrgName',
          placeholder: '请输入发货单位',
        },
        unloadingOrgName: {
          field: 'unloadingOrgName',
          placeholder: '请输入收货单位',
          rules:[
            { required: true, message: '请输入收货单位', trigger: 'change' }
          ]
        },
        loadingOrgTaxID: {
          field: 'loadingOrgTaxID',
          placeholder: '请输入发货单位税号',
        },
        unloadingOrgTaxID:{
          field: 'unloadingOrgTaxID',
          placeholder: '请输入收货单位税号',
        },
        loadingUserFullName: {
          field: 'loadingUserFullName',
          placeholder: '请输入发货联系人',
        },
        unloadingUserFullName: {
          field: 'unloadingUserFullName',
          placeholder: '请输入收货联系人',
        },
        loadingUserPhone: {
          field: 'loadingUserPhone',
          placeholder: '请输入发货联系电话',
        },
        unloadingUserPhone: {
          field: 'unloadingUserPhone',
          placeholder: '请输入收货联系电话',
        },
        loadingArea:[
          {
            field: "loadingProvinceCode",
            controlType: "select",
            datasource: "province",
            value: "",
            text: ""
          }, {
            field: "loadingCityCode",
            controlType: "select",
            datasource: "city",
            value: "",
            text: ""
          }, {
            field: "loadingCountyCode",
            controlType: "select",
            datasource: "county",
            value: "",
            text: ""
          }
        ],
        unloadingArea:[
          {
            field: "unloadingProvinceCode",
            controlType: "select",
            datasource: "province",
            value: "",
            text: ""
          }, {
            field: "unloadingCityCode",
            controlType: "select",
            datasource: "city",
            value: "",
            text: ""
          }, {
            field: "unloadingCountyCode",
            controlType: "select",
            datasource: "county",
            value: "",
            text: ""
          }
        ],
        loadingAddress: {
          field:'loadingAddress',
          placeholder: '请输入发货详细地址',
          rules:[
            { required: true, message: '请输入发货详细地址', trigger: 'change' }
          ]
        },
        unloadingAddress: {
          field:'unloadingAddress',
          placeholder: '请输入收货详细地址',
           rules:[
            { required: true, message: '请输入收货详细地址', trigger: 'change' }
          ]
        },
        contactUserFullName: {
          field:'contactUserFullName',
           rules:[
            { required: true, message: '请输入联系人', trigger: 'change' }
          ]
        },
        contactPhone: {
          field:'contactPhone',
           rules:[
            { required: true, message: '请输入联系电话', trigger: 'change' }
          ]
        },
        freightEndTime:{
          field: "freightEndTime",
          format: "yyyy-MM-dd HH:mm:ss",
          rules:[
            { type: 'date', required: true, message: '请选择货源结束时间', trigger: 'change' }
          ]
        },       
        description: {
          field: "description",
          maxLength: 200,
        },
        isProxyInvoice:{
          field: 'isProxyInvoice',
          optionsValue: ["true", "false"],
          options: ["是", "否"],
        },
        releaseRange: {
          field: 'releaseRange',
          optionsValue: ["platform", "designated", "private"],
          options: ["全平台", "指定范围", "不公开"],
        }
      },
      logisticsPopConfig:{//订单弹窗配置信息
        searchFields:[
          {
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
            
          }
        ],
        searchModel: {
          "logisticsNo": null,
        },
        columns:[
          {
            title: '订单号',
            key: 'logisticsNo',
          },
          {
            title: '货品',
            key: 'goodsName'
          },
          {
            title: '计划重量',
            render: (h, {
              row,
              column,
              index
            }) => {
              let planWeight = row.goodsWeight||'' + '吨';

              return h('span', planWeight);
            }
          },
        ],
        popServiceUrl: 'logisticsList',//列表接口
        fieldConfigCode: 'logistics',//弹窗类型
      },
      clientOrgPopConfig: {//客户弹窗配置信息
        searchFields:[
          {
            "showName": "伙伴简称",
            "elementCode": "text",
            "extraParams": [{
              "field": "orgName",
              "controlType": "text",
              "datasource": "",
              "value": "",
              "maxLength": 1000
            }],
            "fieldConfigCode": "orgName",
            
          }
        ],
        searchModel: {
          "orgName": null,
        },
        columns:[
          {
            title: '伙伴简称',
            key: 'orgName',
          },
          {
            title: '认证状态',
            render: (h, {
              row,
              column,
              index
            }) => {
              let certStatus = orgCertStatusStatus[row.certStatus];

              return h('span', certStatus);
            }
          },
        ],
        popServiceUrl: 'orgPartnerList',//列表接口
      },
      routeNamePopConfig: {//线路名称弹窗配置信息
        searchFields:[
          {
            "showName": "线路名称",
            "elementCode": "text",
            "extraParams": [{
              "field": "routeName",
              "controlType": "text",
              "datasource": "",
              "value": "",
              "maxLength": 1000
            }],
            "fieldConfigCode": "routeName",
            
          }
        ],
        searchModel: {
          "routeName": null,
        },
        columns:[
          {
            title: '线路名称',
            key: 'routeName',
          },
          {
            title: '发货单位',
            key: 'loadingOrgName',
          },
          {
            title: '收货单位',
            key: 'unloadingOrgName',
          },
          
        ],
        popServiceUrl: 'routeLlist',//列表接口
      },
      quoteType: 'price'
    }
  },
  methods: {
    logisticsSelectOperation(res) {//订单号
      console.log('选中的运单信息',res);
      const self = this;
      this.$set(this.domainObject, 'logisticsNo', res.params.code);
      let logisticsNoInfo = res.params;
      let domainObjectKyes = Object.keys(this.domainObject);
      
      domainObjectKyes.forEach((item)=>{
        logisticsNoInfo[item] && self.$set(self.domainObject, item, logisticsNoInfo[item]);
        if(item === 'meterageType') {
          self.meterageTypeChange(logisticsNoInfo[item])
        }
      })


      // this.domainObject.logisticsNo = 1234555;
    },
    partnerSelectOperation(res) {//客户
      console.log('选中的客户信息',res);
      this.$set(this.domainObject, 'clientOrgCode',res.params.code);
      this.$set(this.domainObject, 'clientOrgName',res.params.orgName);
      this.$set(this.domainObject, 'platformClientOrgCode',res.params.orgCode);
    },
    routeNameSelectOperation(res) {//线路
      console.log('选中的线路',res)
      this.$set(this.domainObject, 'routeName',res.params.routeName);
      this.$set(this.domainObject, 'routeCode',res.params.code);
      this.$set(this.domainObject, 'loadingAddress',res.params.loadingAddress);
      this.$set(this.domainObject, 'loadingCityCode',res.params.loadingCityCode);
      this.$set(this.domainObject, 'loadingCountyCode',res.params.loadingCountyCode);
      this.$set(this.domainObject, 'loadingOrgName',res.params.loadingOrgName);
      this.$set(this.domainObject, 'loadingProvinceCode',res.params.loadingProvinceCode);
      this.$set(this.domainObject, 'loadingUserFullName',res.params.loadingLinkmanFullName);
      this.$set(this.domainObject, 'loadingUserPhone',res.params.loadingContact);
      this.$set(this.domainObject, 'standardDistance',res.params.standardDistance);
      this.$set(this.domainObject, 'standardDistanceUnitCode',res.params.standardDistanceUnitCode);
      this.$set(this.domainObject, 'unloadingAddress',res.params.unloadingAddress);
      this.$set(this.domainObject, 'unloadingCityCode',res.params.unloadingCityCode);
      this.$set(this.domainObject, 'unloadingCountyCode',res.params.unloadingCountyCode); 
      this.$set(this.domainObject, 'unloadingOrgName',res.params.unloadingOrgName);
      this.$set(this.domainObject, 'unloadingProvinceCode',res.params.unloadingProvinceCode);
      this.$set(this.domainObject, 'unloadingUserFullName',res.params.unloadingLinkmanFullName);
      this.$set(this.domainObject, 'unloadingUserPhone',res.params.unloadingContact);
      this.$set(this.domainObject, 'unloadingOrgTaxID',res.params.unloadingOrgTaxID);
      this.$set(this.domainObject, 'loadingOrgTaxID',res.params.loadingOrgTaxID);
    },
    proxyInvoiceChange(val) {

    },
    releaseRangeChange(val) {

    },
    quoteTypeChange(val) {
      console.log('modechange is',val);
      this.quoteType = val;
      if(val == 'quote'){
        this.$set(this.domainObject, 'quotePrice', null)
      }
    },
    modeChange(val) {

    },
    handleFocus() {
      console.log('focus is change');
    },
    meterageTypeChange(val) {
      console.log('计量标准切换',val)
      //货物单价
      this.$set(this.fields.goodsPriceUnitCode, 'selectData',[meterageUnitConfig[val]['goods.price']]);
      this.$set(this.domainObject, 'goodsPriceUnitCode',meterageUnitConfig[val]['goods.price']['id'])
      //客户运价
      this.$set(this.fields.clientFreightPriceUnitCode, 'selectData',[meterageUnitConfig[val]['goods.price']]);
      this.$set(this.domainObject, 'clientFreightPriceUnitCode',meterageUnitConfig[val]['goods.price']['id'])
      //司机报价类型
       this.$set(this.fields.quotePriceUnitCode, 'selectData',meterageUnitConfig[val]['driver.price']);
      this.$set(this.domainObject, 'quotePriceUnitCode',null)
      //合理货差系数
      if(this.domainObject['goodsLossMethod'] == 'goods.loss') {
        this.$set(this.fields.goodsLossUnitCode, 'selectData',[meterageUnitConfig[val]['goods.loss.ration']]);
      }

    },
    goodsLossChange(val) {
      if(val === 'goods.loss') {
        this.$set(this.fields.goodsLossUnitCode, 'selectData',[meterageUnitConfig[this.domainObject['meterageType']]['goods.loss.ration']]);
        this.$set(this.domainObject, 'goodsLossUnitCode',meterageUnitConfig[this.domainObject['meterageType']]['goods.loss.ration']['id'])
      }else{
        this.$set(this.fields.goodsLossUnitCode, 'selectData',[{"id":"percent","value":"‰",},]);
        this.$set(this.domainObject, 'goodsLossUnitCode','percent')
      }
      
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    setForm(formName) {
      console.log(formName)
      this.$refs[formName].resetFields();
    },
    getCurrentTime() {
      let now = new Date()
      now.setDate(now.getDate() + 1);
      this.$set(this.domainObject, 'freightEndTime', formatTime(now));
      
    },
    getPersonInfo() {
      const self = this;
      this.$axios.get(serviceUrl.getSelfInfo).then((res)=>{
        if(res.code === 200) {
          self.domainObject.contactUserFullName = res.content.fullName;
          self.domainObject.contactPhone = res.content.phone;
        }
        
      })
    },
    getTruckModeListConfig() {
      let truckModelConfig = JSON.parse(localStorage.getItem('truckModelConfig'));
      let truckModelConfigKeys = Object.keys(truckModelConfig);
      let truckModelSelectData = [];
      truckModelConfigKeys.forEach((item)=>{
        let configObj = {};
        configObj.id = item;
        configObj.value = truckModelConfig[item];
        truckModelSelectData.push(configObj);
      })
      this.fields['truckModelRequire']['selectData'] = truckModelSelectData;
    }
  },
  mounted() {
    console.log('addResource',this.$refs)
    this.getCurrentTime();
    this.getPersonInfo();
    this.getTruckModeListConfig();
  }
}
</script>