<template>
  <div class="block">
    <el-form-item :prop="configData.field"  v-if="editable">
      <el-radio-group  v-model="domainObject[configData.field]" @change="changeHandle">
        <el-radio :disabled="configData.disabled"  :label="value" v-for="(value, index) in configData.optionsValue" :key="value">
          {{configData.options[index]}}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <span v-if="editable === false">{{text}}</span>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'eleRadio',
    props: {
      configData: Object,
      editable: {
        type: Boolean,
        'default': true
      },
      domainObject: Object,
    },
    data() {
      return{
      }
    },
    computed: {
      text() {
        let modelValue = this.domainObject[this.configData.field];
        if (modelValue !== null && typeof modelValue !== 'undefined' && this.configData.optionsValue) {
          modelValue = modelValue.toString();
          for (let i = 0, len = this.configData.optionsValue.length; i < len; i += 1) {
            if (modelValue === this.configData.optionsValue[i].toString()) {
              modelValue = this.configData.options[i];
              break;
            }
          }
        }
        return modelValue;
      }
    },
    mounted() {
      const modelValue = this.domainObject[this.configData.field];
      if (modelValue !== null && typeof modelValue !== 'undefined' && this.configData.optionsValue) {
        const strValue = `${modelValue}`;
        for (let i = 0, len = this.configData.optionsValue.length; i < len; i += 1) {
          if (strValue === this.configData.optionsValue[i].toString()) {
            this.$set(this.domainObject, this.configData.field, this.configData.optionsValue[i]);
            break;
          }
        }
      }
    },
    methods: {
      changeHandle(val) {
        this.$emit('change', val);
        console.log(' radio change ...',val);
      },
    },
    created() {
      
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../assets/scss/common.scss";
.el-radio__input.is-checked .el-radio__inner {
    border-color: $uiColor;
    background: $uiColor;
}
.el-radio__inner:hover {
    border-color: $uiColor;
}
.el-radio__input.is-checked+.el-radio__label {
    color: #606266;
}
</style>
