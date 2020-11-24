
<template>
  <div class="block">
    <el-form-item :prop="this.configData.field" :rules="configData.rules" v-if="editable">
      <el-input
        v-model="domainObject[configData.field]"
        :name="configData.field"
        :placeholder="configData.placeholder"
        :maxlength="configData.maxLength"
        :readonly="configData.readonly==='true'"
        @focus="handleFocus"
        :disabled="configData.readonly==='readonly'"></el-input>
    </el-form-item>
    <span v-else>{{domainObject[configData.field]}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
//   import { dealInputKey } from '../../../api/Utils';

//   import { BaseDomain } from '../../../api/ApiConst';

  export default {
    name: 'eleInput',
    // inject: ['eventBus'],
    props: {
      configData: Object,
      editable: {
        type: Boolean,
        'default': true
      },
      domainObject: Object,
    },
    data() {
      return {
        dialogVisible: false,
        iframeSrc: ''
      }
    },
    computed: {
//       text() {
//         // console.log('input.text', this.domainObject, this.configData, this.editable, this.configData.default);
//         if (this.domainObject && this.configData && 'field' in this.configData && this.configData.field in this.domainObject) {
// //          console.log('input.text.model');
//           return this.domainObject[this.configData.field];
//         }
//         return this.configData.default ? this.configData.default : '';
//       }
    },
    methods: {
      loadRobot() {
        const localStorage = window.localStorage,
          projectName = JSON.parse(localStorage.getItem('appInfo')).projectName || '';
        let params = '',
          hostName = BaseDomain;
        // 默认参数传小智机器人名称，字段配置里面的robotName
        params = `bizEventNo=${this.configData.robotName}`;
        // hostName = hostName.replace(/.*?\./, '//ysmartz.');
        hostName = `${hostName}/smartz`;
        // hostName = `//192.168.10.180:8007`;
        console.log('robot host name is', hostName);
        // 如果需要额外传递参数，则字段里面需要配置robotParams(eg, fieldNameInOurSystem=tipMessage=paramsToBackend
        // 多个参数以逗号区分开)
        if (this.configData.robotParams) {
          const robotParamsArray = this.configData.robotParams.split(','); // [fieldNameInOurSystem=tipMessage=paramsToBackend]
          for (let i = 0; i < robotParamsArray.length; i++) {
            const v = robotParamsArray[i].split('='), // 第一个为本系统存储字段名称，第二个为提示信息，第三个为传递后端参数名称
              n = this.configData.allowNullParams ? this.configData.allowNullParams.split(',') : []; // 配置是否允许为空
            // 如果页面没有值，且没有额外配置允许为空，则提示用户错误信息
            if (!this.domainObject[v[0]] && !n.includes(v[2])) {
              this.$message({
                type: 'warning',
                message: `小智机器人提示：${v[1]}！`,
                duration: 3000
              });
              return false;
            } else {
              // 有值才拼接参数传递
              if (this.domainObject[v[0]]) {
                params += `&${v[2]}=${this.domainObject[v[0]]}`;
              }
            }
          }
          this.dialogVisible = true;
          this.iframeSrc = `${hostName}/call?${params}`;
          // console.log('robotParams is', robotParamsArray, 'typeof is', typeof(robotParamsArray));
        } else {
          this.dialogVisible = true;
          this.iframeSrc = `${hostName}/call?${params}`;
        }
        
      },
    //   form() {
    //     let parent = this.$parent;
    //     if (parent) {
    //       while (parent && parent.$options && parent.$options.componentName !== 'eleForm') {
    //         parent = parent.$parent;
    //       }
    //       return parent;
    //     }
    //     return null;
    //   },
    //   init() {

    //   },
      handleFocus() {
        this.$emit('focus');
      }
    },
    beforeCreate() {
//      console.log('beforeCreate domainObject', this.domainObject);
//      console.log('beforeCreate configData', this.configData);
    },
    mounted() {
    //   if (!this.isList) {
    //     if (this.eventBus) {
    //       this.eventBus.$emit('eleMounted', this);
    //     }
    //   }
    },
    created() {
    //   if (!this.isList) {
    //     if (this.eventBus) {
    //       this.eventBus.$emit('eleCreated', this);
    //       console.log('ele input created, field is', this.configData.field);
    //     }
    //     this.configData.maxLength = this.configData.maxLength ? Number(this.configData.maxLength) : 1000;
    //     if (this.configData.inputKey) {
    //       dealInputKey(this.configData.inputKey, (inputFieldKey, outData) => {
    //         this.$set(this.domainObject, this.configData.field, outData[inputFieldKey]);
    //         // this.domainObject[this.configData.field] = outData[inputFieldKey];
    //       });
    //     }
    //   }
//      console.log('create domainObject', this.domainObject);
//      console.log('create configData', this.configData);
      // const event = new Event('loadEleDone');
      // document.dispatchEvent(event);
    },
    updated() {
//      console.log('updated domainObject', this.domainObject);
//      console.log('updated configData', this.configData);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../assets/scss/common.scss";
.iframe {
  width: 100%;
  height: 100%;
  min-height: 290px;
}
 .el-input.is-disabled .el-input__inner {
    background-color: #fff!important;
}
.ico-robotic {
  position: absolute;
  top: 50%;
  margin-top: -10px;
  right: 5px;
  width: 20px;
  height: 20px;
//   background: url(./robotic.png) no-repeat center center;
  opacity: .3;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}
.el-input {
  &:hover {
    &+.ico-robotic {
      opacity: 1;
    }
  }
}
</style>
