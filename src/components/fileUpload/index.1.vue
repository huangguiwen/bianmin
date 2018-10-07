<template>
  <div class="upload-container">
    <template v-if="singleImg&&allFileList&&allFileList.length>0" @click="dialogVisible=true">
      <div @click="dialogVisible=true">
        <slot name="cover" >
          <img :src="allFileList[0].url" class="avatar" @click="dialogVisible=true" :width="imgWidth" :height="imgHeight">
        </slot>
      </div>
    </template>
    <i v-else-if="singleImg&&!uploadedImg" class="el-icon-plus avatar-uploader-icon" @click=" dialogVisible=true"></i>
    <img v-else-if="!singleImg&&successFileList.length>0&&showCover" :src="successFileList[0].url"  class="avatar" @click="dialogVisible=true">
    <el-button v-else :style="{background:color,borderColor:color}" @click=" dialogVisible=true" size="mini" type="primary">上传图片</el-button>
    <slot name="tip">
      <span style="color: #888;font-size: 14px">{{showTip?'点击图片可继续上传':''}}</span>
    </slot>
    <el-dialog :visible.sync="dialogVisible" :before-close="handleCancel">
      <el-upload class="editor-slide-upload" :limit="this.limit" :data="{tenantId:curUser?curUser.tenantId:''}" :action="uploadPath" :multiple="limit&&limit>1" :file-list="allFileList" :show-file-list="true"
        list-type="picture-card" :on-remove="handleRemove" :on-exceed="handleExceed" :on-error="handleError" :on-success="handleSuccess" :before-upload="beforeUpload">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import {mapGetters} from 'vuex'

export default {
  name: 'epicoUpload',
  props: {
    color: {
      type: String,
      default: '#20a0ff'
    },
    limit: {
      type: Number,
      defalut: 5
    },
    uploadedImg: {//单图时默认显示的图片
      type: String,
    },
    jsUploadedImg:{//君胜项目专用图片格式 {fileId,fileName, url}
      type:Object,
    },
    defaultFileList: {
      type: Array,
      default: () => []
    },
    showCover: {//是否显示封面，只有多图时才生效
      type: Boolean,
      default: false
    },
    showTip:{
      type:Boolean,
      default:false
    },
    resetWhenConfirm:{//是否在点击确定的时候清空已选择的图片
      type:Boolean,
      default:false
    },
    imgWidth:{
      type:Number
    },
    imgHeight:{
      type:Number
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: [],
      newListObj:[],//新上传的图片
      uploadPath: process.env.UPLOAD_PATH,
      // uploadedImg:'',// limit 为 1 时才需要这个值
    };
  },
  computed: {
    ...mapGetters([
      'curUser'
    ]),
    singleImg: function () {
      return this.limit && this.limit === 1;
    },
    successFileList() {
      return this.listObj.filter(item => {
        return item.hasSuccess;
      });
    },
    allFileList() {
      let allFiles=this.listObj.concat(this.newListObj);
      console.log("allFiles", allFiles);
      return allFiles;
    }
  },
  watch:{
    uploadedImg() {
      if(this.listObj.length==0) {
        if(this.uploadedImg) {
          this.listObj.push({hasSuccess: true, url: this.uploadedImg});
        }else if(this.jsUploadedImg) {
          this.listObj.push({hasSuccess: true, url: this.jsUploadedImg.url,fileId:this.jsUploadedImg.fileId,fileName:this.jsUploadedImg.fileName});
        }
      }
    },
    defaultFileList() {
      if(this.listObj.length==0) {
        this.defaultFileList.forEach(img => {
          this.listObj.push({hasSuccess: true, url: img.url,fileId:img.fileId,fileName:img.fileName});
        });
      }
    }
  },
  created() {
    this.listObj = this.defaultFileList.map(item => {
      return {hasSuccess:true,url: item.url};
    });
    if(this.singleImg) {
      if(this.uploadedImg){
        this.listObj.push({hasSuccess: true, url: this.uploadedImg});
      }else if(this.jsUploadedImg&&this.jsUploadedImg.fileId) {
        this.listObj.push({hasSuccess: true, url: this.jsUploadedImg.url,fileId:this.jsUploadedImg.fileId,fileName:this.jsUploadedImg.fileName});
        this.listObj = this.listObj.map(item => item);
      }
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.listObj = this.listObj.concat(this.newListObj);
      this.newListObj = [];
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      this.$emit('successCBK',this.singleImg?arr[0]:arr)
      if (this.resetWhenConfirm) {
        this.listObj = [];
      }
      // if(this.singleImg&&arr.length>0) {
      //   this.uploadedImg = arr[0].url;
      // }
      // this.listObj = {}
      // this.fileList = []
      this.dialogVisible = false;
    },
    handleCancel() {
      this.newListObj = [];
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      console.log(response)
      const uid = file.uid;
      // console.log("this.newListOb ",this.newListObj)
      const objKeyArr = Object.keys(this.newListObj);
      // console.log("keys",objKeyArr)
      // console.log("length",this.newListObj.length)
      for (let i = 0, len = this.newListObj.length; i < len; i++) {
        if (this.newListObj[i].uid === uid) {
          this.$set(this.newListObj,i, {
            name:response.data.fileName,
            url: response.data.url,
            fileName: response.data.fileName,
            newFileName: response.data.newFileName,
            hasSuccess: true
          });
          return
        }else{
          console.log("test")
        }
      }
    },
    handleError(err, file, fileList) {
      console.log(err);
    },
    handleRemove(file) {
      const uid = file.uid;
      let objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[i].uid === uid) {
          this.listObj.splice(i, 1);
          return;
        }
      }
      objKeyArr = Object.keys(this.newListObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.newListObj[i].uid === uid) {
          this.newListObj.splice(i, 1);
          return;
        }
      }

    },
    handleExceed() {
      this.showErrorMsg("只能上传" + this.limit + "张图片");
    },
    beforeUpload(file) {
      const _self = this;
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid;
      // this.listObj[fileName] = {}
      this.newListObj.push({hasSuccess: false, uid: file.uid});
      // return new Promise((resolve, reject) => {
      //   const img = new Image();
      //   img.src = _URL.createObjectURL(file)
      //   img.onload = function () {
      //     // _self.listObj.push({hasSuccess: false, uid: file.uid, width: this.width, height: this.height});
      //     _self.newListObj.push({hasSuccess: false, uid: file.uid, width: this.width, height: this.height});
      //   };
      //   resolve(true)
      // })
    },
    getUploadedFiles() {
      return Object.keys(this.listObj).map(v => this.listObj[v]);
    },
    getJsUploadedFiles() {//获取君胜专用的图片列表格式
      let files=this.getUploadedFiles().map(item=>{
        return {fileId: item.newFileName||item.fileId, fileName: item.fileName, url: item.url}
      });
      if(this.singleImg) {
        return files && files.length > 0 ? files[0] : "";
      }else{
        return files;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .upload-container {
        .editor-slide-upload {
            margin-bottom: 20px;
        }
    }
    .avatar{max-width: 150px;max-height: 150px;}
</style>
