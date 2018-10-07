<template>
    <div class="upload-container">
        <el-button type="primary" size="mini" @click="dialogVisible=true" v-if="showImg.length == 0">上传图片</el-button>
        <img class="image" v-else v-for="(item, index) in showImg" :key="index" :src="item" @click="dialogVisible=true">
        <el-dialog :visible.sync="dialogVisible" width="50%">
            <el-upload :action="uploadPath" :limit="limit" list-type="picture-card" :file-list="fileList" :on-success="handdleSuccess"
                :on-exceed="handleExceed" :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="uploadCancel">取 消</el-button>
                <el-button type="primary" @click="uploadComfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            showImg: [],
            uploadPath: process.env.UPLOAD_PATH,
            baseApi: process.env.BASE_API,
            fileList: []
        }
    },
    props: {
        limit: {
            type: Number,
            default: 5
        },
        uploadedImg: {
            type: Array,
            default: []
        }
    },
    watch: {
        fileList: {
            handler(value) {
                this.showImg = value.map(item => item.url)
            },
            deep: true
        },
        uploadedImg(value) {
            this.fileList = value.map(item => {
                return {
                    url: item,
                    uid: item.split('?uid=')[1]
                }
            })
        }
    },
    methods: {
        handdleSuccess(response, file, fileList) {
            this.fileList = fileList.map(item => {
                return {
                    url: `${this.baseApi}/${item.response.data}?uid=${item.uid}`,
                    uid: item.uid
                }
            })
        },
        handleExceed(files, fileList) {
            this.$message.error(`上传文件不得超出${this.limit}个!`)
        },
        uploadComfirm() {
            this.dialogVisible = false
            this.$emit('successUpload', this.showImg)
        },
        uploadCancel() {
            this.dialogVisible = false
            this.fileList = []
        },
        handleRemove(file) {
            this.fileList.forEach((item, index) => {
                if(item.uid == file.uid) {
                    this.fileList.splice(index, 1)
                    return false
                }
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
    .image {
        width: 150px;
        height: 150px;
        padding: 10px;
        cursor: pointer;
    }
}
</style>
