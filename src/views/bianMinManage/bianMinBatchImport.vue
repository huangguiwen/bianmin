<template>
    <div class="app-container">
        <h4>批量导入说明：</h4>
        <p class="text">1.导入功能不会覆盖和更新已存在的边民信息，如需修改请通过页面上的编辑功能完成更新。</p>
        <p class="text">2.首次使用如需模板请下载，根据表格格式填写边民信息。</p>
        <p class="text">
            <span>①下载表格模版，批量填写边民信息</span>
            <a :href="downloadExcel" download="边民信息录入模板">
                <el-button type="primary" size="mini" style="margin-left: 15px;">下载</el-button>
            </a>
        </p>
        <p class="text">
            <span >②上传填写好的表格</span>
            <el-button type="primary" size="mini" style="margin-left: 15px;" :loading="uploading" @click="uploadFile()">上传文件</el-button>
            <input type="file" @change="importFile()" id="file" style="display: none"
                 accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
        </p>

        <div class="import-table" v-if="uploadTableList.length" style="margin-top:30px;">
            <h6><span>您一共上传了 <strong style="color:#ff0000;">{{uploadTableList.length}}</strong> 条数据：</span></h6>
            <el-table :data="uploadTableList" stripe border style="width: 100%; margin:10px 0;">
                <el-table-column prop="identity_num" label="*身份证" fixed="left"></el-table-column>
                <el-table-column prop="sex" label="*性别" fixed="left"></el-table-column>
                <el-table-column prop="phone" label="*手机号" fixed="left"></el-table-column>
                <el-table-column prop="address1" label="*省" fixed="left"></el-table-column>
                <el-table-column prop="address2" label="*市" fixed="left"></el-table-column>
                <el-table-column prop="address3" label="*区" fixed="left"></el-table-column>
                <el-table-column prop="address4" label="*详细地址" fixed="left"></el-table-column>
                <el-table-column prop="note" label="备注" fixed="left"></el-table-column>
            </el-table>
            <p class="txt" style="color:#999;">
            <span><i class="el-icon-warning"></i> 请确认以上信息填写正确</span>
            <p class="txt" style="color:#999;">如信息有误，请调整excel重新上传</p>
        </div>
        <div v-show="uploadTableList.length">
            <el-button type="primary" @click="submit" :loading="loading">确定</el-button>
        </div>
    </div>
</template>

<script>
import downloadExcel from 'assets/边民信息录入模板.xlsx'
import bianMinManage from '@/api/bianMinManage'

const XLSX = require('xlsx');
export default {
    name: 'bianMinBatchImport',
    data() {
        return {
            downloadExcel: downloadExcel,
            uploading: false,
            loading: false,
            file: '',
            uploadTableList: [],
            dataList: [],
            fieldNameList: []
        }
    },
    mounted() {
        this.file = document.getElementById('file');
    },
    methods: {
        uploadFile(){
            if(this.uploading) {
                return false
            }
            this.file.click()
        },
        importFile() {
            let inputDom = this.file
            if(!inputDom.files) {
                this.uploading = false
                return false
            }
            this.uploading = true
            let file = this.file.files[0]
            let _this = this
            this.fileName = file.name

            let reader = new FileReader()

            reader.readAsBinaryString(file)

            reader.onload = function(e) {

                _this.uploading = false
                let data = e.target.result
                _this.list = XLSX.read(data, {
                    type: 'binary'
                })
                let bianMinInfo = _this.list.Sheets[_this.list.SheetNames[0]]
                let json = XLSX.utils.sheet_to_json(bianMinInfo, {header: _this.defaultKeys})
                _this.parseData(json)
            }
        },
        parseData(data) { // 解析导入数据
            if(data.length > 0) {
                for(let k in data[0]) {
                    if(k.includes('填写须知') || k.includes('EMPTY')) {
                        this.$message.error('请删除"填写须知整行数据"后再次上传，谢谢！')
                        this.uploading = false
                        return false
                    }
                }
                let template = []
                data.forEach(item => {
                    template.push({
                        'identity_num': item['*身份证'],
                        'sex': item['*性别'],
                        'phone': item['*手机号'],
                        'address1': item['*省'],
                        'address2': item['*市'],
                        'address3': item['*区'],
                        'address4': item['*详细地址'],
                        'note': item['备注'],
                    }) 
                })
                this.uploadTableList = template
            }
        },
        submit() {
            this.loading = true
            let submitData = {
                list: this.uploadTableList
            }
            bianMinManage.batchImportBianMin(submitData).then(res => {
                if(res.code == 200) {
                    this.loading = false
                    this.$message.success('批量导入成功！')
                    this.$router.push({ name: 'bianMinInfo' })
                }
            }).catch(() => {
                this.loading = false
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    .text {
        padding: 3px 10px;
    }
}
</style>
