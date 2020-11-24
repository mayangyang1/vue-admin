<template>
  <div id="date-pick">
    <el-form-item :prop="configData.field"  v-if="editable">
      <el-date-picker
        v-if="editable"
        :type="dateFormat"
        v-model="model"
        @change="handleChange"
        placeholder="选择日期"
        :class="configData.field"
        :format="configData.format"
        :readonly="configData.readonly === 'TRUE'">
      </el-date-picker>
    </el-form-item>
    <span v-if="editable === false">{{ dateText }}</span>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'eleDate',
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
        dateFormat: 'date',
        model: '',
        sync: true,
        dateText: ''
      };
    },
//    computed: {
//      text() {
//        return this.domainObject[this.configData.field];
//      }
//    },
    mounted() {

        this.init();
       

      this.$watch(`domainObject.${this.configData.field}`, (val) => {
        if (val) {
          this.dateText = this.getDateText();
          // 处理日期控件带出值不显示问题
          this.model = this.domainObject[this.configData.field];
        }
      });
    },
    created() {
      this.dateFormat = this.configData.format ? 'datetime' : 'date';
      this.model = this.domainObject[this.configData.field];

      this.dateText = this.getDateText();
    },
    methods: {
      getDateText() {
        const fmt = this.configData.format;
        var field = this.domainObject[this.configData.field];
//        console.log('格式化为：', fmt);
        if(field==null){
            return "";
        }
        field=field.toString()
        switch(fmt) {
          case 'yyyy':
            return field ? field.substring(0, 4) : '';
            break;
          case 'yyyy-MM':
            return field ? field.substring(0, 7) : '';
            break;
          case 'yyyy-MM-dd':
            return field ? field.substring(0, 10) : '';
            break;
          default:
            return field;
        }
      },
      handleChange(val) {
        console.log('changed', val, 'model', this.model);
        this.sync = false;
        // this.$set()
        // this.domainObject[this.configData.field] = val;
        this.$set(this.domainObject,this.configData.field,val);
        this.$watch(`domainObject.${this.configData.field}`, (newVal, oldVal) => {
          if(null == newVal){
            this.model = newVal;
          }
          if (this.sync) {
            this.model = newVal;
          } else {
            this.sync = true;
          }
        });
      },
      init() {
        console.log('field', this.configData.field, 'value', this.model);
        this.$watch(`domainObject.${this.configData.field}`, (val) => {
          if (this.sync) {
            this.model = val;
          } else {
            this.sync = true;
          }
        });
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
#date-pick{
  .el-form-item__content {
    .el-input{
        width: 200px!important;
      }
  }
}
</style>
