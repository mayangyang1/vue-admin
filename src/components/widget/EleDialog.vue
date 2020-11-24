<template>
  <el-dialog v-if='dialogVisible' :title="title" :visible.sync="dialogVisible" size="large" :before-close="handleBeforeClose">
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit" :disabled="isBusy">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'eleDialog',
    props: {
      title: {
        type: String,
        'default': 'Dialog'
      },
      isBusy: {
        type: Boolean,
        'default': false
      }
    },
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleBeforeClose(done){
        done();
        this.dialogVisible = false;
      },
      open() {
        this.dialogVisible = true;
      },
      close() {
        this.dialogVisible = false;
      },
      submit() {
        console.log('submit click');
        this.$emit('submit', this);
      },
      cancel() {
        this.$emit('cancel', this);
      }
    }
  };
</script>
