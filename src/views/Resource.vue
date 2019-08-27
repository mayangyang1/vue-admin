<template>
    <div>
        <h2>图片上传功能</h2>
        <div>
            <el-upload
            class="avatar-uploader"
            action="http://localhost:3000/upload"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
    </div>
</template>

<script>
export default {
    name: 'resource',
    data() {
      return {
        imageUrl: '',
        headers: {}
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
          console.log(file);
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      
    },
    created() {
        const token = localStorage.getItem('token');
        this.headers['Authorization'] = 'Bearer ' + token;
    }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>