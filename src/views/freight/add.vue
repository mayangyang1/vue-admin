<template>
  <div class="form-page">
    <el-form :model="domainObject" ref="form" label-width="100px">
      <layout :fields="fields">
        <ele-radio slot="scheduleType" :editable="editable" :configData="fields.scheduleType" :domainObject="domainObject"  @change="modeChange"></ele-radio>

        <ele-input slot="goodsPrice" :editable="editable" :configData="fields.goodsPrice" :domainObject="domainObject" @focus="handleFocus"></ele-input>
        <ele-select slot="goodsPriceUnitCode" class="mgl10" :editable="editable" :configData="fields.goodsPriceUnitCode"  :domainObject="domainObject" ></ele-select>                
     
        <ele-input slot="freightNo" :editable="editable" :configData="fields.freightNo" :domainObject="domainObject" ></ele-input>
        
        <ele-select slot="status" class="mgl10" :editable="editable" :configData="fields.status"  :domainObject="domainObject" ></ele-select>                  

        <ele-input slot="logisticsNo" :editable="editable" :configData="fields.logisticsNo" :domainObject="domainObject" ></ele-input>
        <ele-pop-select slot="popSelect"  :popInfoConfig="logisticsPopConfig" @selectOperation="logisticsSelectOperation"></ele-pop-select>

        <ele-radio slot="meterageType" :editable="editable" :configData="fields.meterageType" :domainObject="domainObject"  @change="meterageTypeChange"></ele-radio>
      
        <ele-date slot="freightEndTime" :editable="editable" :configData="fields.freightEndTime" :domainObject="domainObject"></ele-date>
      
        <ele-checkbox slot="truckLengthRequire" :editable="editable" :configData="fields.truckLengthRequire" :domainObject="domainObject"></ele-checkbox>
      
        <ele-textarea slot="description" :editable="editable" :configData="fields.description" :domainObject="domainObject"></ele-textarea>

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
import {domainObject} from '@/dataConfig/addFreight.js'
import {publishStatus} from '@/config/unitConfig.js'
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
    'ele-pop-select': ElePopSelect
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
          optionsValue: ["platform", "self"],
          options: ["委托调车模式", "自助调车模式"],
          disabled: false,
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
            {"value":"发布中","id":"pushling"},
            {"value":"已结束","id":"finished"}
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
        meterageType: {
          field: "meterageType",
          optionsValue: ["ton", "cube", "item"],
          options: ["吨", "方", "件"],
        },
        freightEndTime:{
          field: "freightEndTime",
          format: "yyyy-MM-dd HH:mm:ss",
          rules:[
            { type: 'date', required: true, message: '请选择货源结束时间', trigger: 'change' }
          ]
        },
        truckLengthRequire: {
          field: "truckLengthRequire",
          optionsValue: ["4.2", "5", "6.2", "6.3", "6.8", "7.2", "7.5", "7.7", "7.8", "8", "8.7", "9.6", "12", "12.5", "13", "13.5", "16", "17.5"],
          options: ["4.2米", "5米", "6.2米", "6.3米", "6.8米", "7.2米", "7.5米", "7.7米", "7.8米", "8米", "8.7米", "9.6米", "12米", "12.5米", "13米", "13.5米", "16米", "17.5米"],
          value: [],
          rules:[
            { type: 'array', required: true, message: '请选择车长', trigger: 'change' }
          ]
        },
        description: {
          field: "description",
          maxLength: 200,
          rules:[
            { required: true, message: '请输入备注', trigger: 'blur' }
          ]
        }
      },
      logisticsPopConfig:{//订单弹窗配置信息
        searchFields:[
          {
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
            
          }
        ],
        searchModel: {
          "freightNo": null,
        },
        columns:[
          {
            title: '货源号',
            key: 'freightNo',
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
        ],
        popServiceUrl: 'freightList',//列表接口
        fieldConfigCode: 'logistics',//弹窗类型
      },
    }
  },
  methods: {
    logisticsSelectOperation(res) {
      console.log('选中的运单信息',res);
      this.$set(this.domainObject, 'logisticsNo', res.params.code);
      // this.domainObject.logisticsNo = 1234555;
    },
    modeChange(val) {
      console.log('modechange is',val);
    },
    handleFocus() {
      console.log('focus is change');
    },
    meterageTypeChange(val) {

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
    }
  },
  mounted() {
    console.log('addResource',this.$refs)
  }
}
</script>