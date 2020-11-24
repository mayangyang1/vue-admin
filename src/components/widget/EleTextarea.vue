<template>
  <div class="block">
    <el-form-item :prop="this.configData.field" :rules="this.configData.rules" v-if="editable">
      <el-input type="textarea"
        :name="configData.field"
        :placeholder="configData.placeholder"
        v-model="domainObject[configData.field]"
        :maxlength="configData.maxLength"
        v-if="editable" :disabled="configData.readonly==='readonly'">
      </el-input>
    </el-form-item>
    <span v-if="editable === false">{{domainObject[configData.field]}}</span>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'eleTextarea',
    props: {
      isList: Boolean,
      configData: Object,
      editable: {
        type: Boolean,
        'default': true
      },
      domainObject: Object,
      rules: Array
    },
    methods: {
      form() {
        let parent = this.$parent;
        if (parent) {
          while (parent && parent.$options && parent.$options.componentName !== 'eleForm') {
            parent = parent.$parent;
          }
          return parent;
        }
        return null;
      },
      init() {}
    },
    created() {
      this.configData.maxLength = this.configData.maxLength ? Number(this.configData.maxLength) : 1000;
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../assets/scss/common.scss";
.el-textarea__inner:focus {
    outline: 0;
    border-color: $uiColor!important;
}
</style>
