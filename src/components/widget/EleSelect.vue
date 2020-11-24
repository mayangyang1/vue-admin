<template>
  <div class="block">
    <el-form-item :prop="this.configData.field" :rules="this.configData.rules" v-if="editable">
      <el-select
        v-model="domainObject[configData.field]"
        placeholder="请选择"
        clearable
        @change="handleSelect"
        v-if="editable"
        :disabled="configData.readonly === 'TRUE'">
        <el-option
          v-for="item in configData.selectData"
          :key="item.id"
          :label="item.value"
          :value="item.id">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <span v-if="editable === false">{{text}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
import * as DataSourceService from '../../api/DataSourceService.js'

  export default {
    props: {
      configData: Object,
      selectData: Array,
      editable: {
        type: Boolean,
        'default': true
      },
      domainObject: Object,
    },
    data() {
      return {
        text: '',
      };
    },
    methods: {
      handleSelect(res) {
        this.$emit('selectChange',res)
      },
    },
    computed: {

    },

    mounted() {

    },
    created() {

    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
