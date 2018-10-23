<template>
    <div class="app-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" width="500">
            <el-form-item label="身份证" prop="identityNum">
                <el-input placeholder="请输入身份证号码" v-model="ruleForm.identityNum"></el-input>
            </el-form-item>
            <el-form-item label="身份证正面" prop="identytyImgFront">
                <fileUpload :limit="1" :uploadedImg="ruleForm.identytyImgFront" @successUpload="identytyFrontSuccess"></fileUpload>
            </el-form-item>
            <el-form-item label="身份证反面" prop="identytyImgBack">
                <fileUpload :limit="1" :uploadedImg="ruleForm.identytyImgBack" @successUpload="identytyBackSuccess"></fileUpload>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input placeholder="请输入姓名" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="ruleForm.sex" clearable placeholder="请选择">
                    <el-option label="女" :value="0"></el-option>
                    <el-option label="男" :value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input placeholder="请输入手机号码" v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <select-area v-model="ruleForm.firstAddress"></select-area>
                <el-input v-model="ruleForm.secondAddress" style="margin-top: 30px;" placeholder="请填写详细地址，请勿重复省市区信息"></el-input>
            </el-form-item>
            <el-form-item label="指纹图片">
                <fileUpload :limit="1" :uploadedImg="ruleForm.fingerPrint" @successUpload="fingerPrintSuccess"></fileUpload>
            </el-form-item>
            <el-form-item label="授权书附件">
                <el-upload :action="uploadPath" :on-exceed="handleExceed" :limit="1" :on-success="authorizationChange" :file-list="ruleForm.authorization">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="其它附件">
                <el-upload :action="uploadPath" :on-exceed="handleExceed" :limit="1" :on-success="attachmentChange" :file-list="ruleForm.attachment">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" placeholder="请输入备注" v-model="ruleForm.note"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">确定</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import selectArea from '@/components/selectArea'
import fileUpload from '@/components/fileUpload'
import bianMinManage from '@/api/bianMinManage'
export default {
    name: 'addBianMinInfo',
    components: {
        selectArea,
        fileUpload
    },
    data() {
        let validateIdentytyImgFront = (rule, value, callback) => {
            if (value.length == 0) {
                return callback(new Error('请上传身份证正面图片！'));
            } else {
                callback()
            }
        }
        let validateIdentytyImgBack = (rule, value, callback) => {
            if (value.length == 0) {
                return callback(new Error('请上传身份证反面图片！'));
            } else {
                callback()
            }
        }
        // let validateFingerPrint = (rule, value, callback) => {
        //     if (value.length == 0) {
        //         return callback(new Error('请上传指纹图片！'));
        //     } else {
        //         callback()
        //     }
        // }
        // let validateAuthorization = (rule, value, callback) => {
        //     if (value.length == 0) {
        //         return callback(new Error('请上传授权书附件！'));
        //     } else {
        //         callback()
        //     }
        // }
        
        return {
            id: 0,
            uploadPath: process.env.UPLOAD_PATH,
            baseApi: process.env.BASE_API,
            firstAddress: '',
            secondAddress: '',
            ruleForm: {
                identityNum: '',
                identytyImgFront: [],
                identytyImgBack: [],
                name: '',
                sex: '',
                phone: '',
                firstAddress: '',
                secondAddress: '',
                fingerPrint: [],
                authorization: [],
                attachment: [],
                note: ''
            },
            rules: {
                identityNum: [
                    { required: true, message: '请输入身份证号码', trigger: 'blur' }
                ],
                identytyImgFront: [
                    { required: true, validator: validateIdentytyImgFront }
                ],
                identytyImgBack: [
                    { required: true, validator: validateIdentytyImgBack }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' }
                ],
                // fingerPrint: [
                //     { required: true, validator: validateFingerPrint }
                // ],
                // authorization: [
                //     { required: true, validator: validateAuthorization }
                // ],
            }
        }
    },
    created() {
        this.id = this.$route.query.id
        if(this.id) {
            bianMinManage.getBianMin({ id: this.id }).then(res => {
                if(res.code == 200) {
                    let dataList = res.data.list[0]
                    let addressArray = dataList.address.split('/')
                    this.ruleForm.identityNum = dataList.identity_num
                    this.ruleForm.identytyImgFront.push(dataList.identyty_img_front)
                    this.ruleForm.identytyImgBack.push(dataList.identyty_img_back)
                    this.ruleForm.name = dataList.name
                    this.ruleForm.sex = dataList.sex
                    this.ruleForm.phone = dataList.phone
                    this.ruleForm.secondAddress = addressArray.pop()
                    this.ruleForm.firstAddress = addressArray.join('/')
                    this.ruleForm.fingerPrint.push(dataList.fingerprint)
                    this.ruleForm.note = dataList.note
                    try {
                        this.ruleForm.authorization.push({
                            url: dataList.authorization,
                            uid: dataList.authorization.split('?uid=')[1].split('&name=')[0],
                            name: dataList.authorization.split('?uid=')[1].split('&name=')[1]
                        })
                        this.ruleForm.attachment.push({
                            url: dataList.attachment,
                            uid: dataList.attachment.split('?uid=')[1].split('&name=')[0],
                            name: dataList.attachment.split('?uid=')[1].split('&name=')[1]
                        }) 
                    } catch (error) {
                        
                    }
                    
                } 
            })
            
        }
    },
    methods: {
        identytyFrontSuccess(value) {
            this.ruleForm.identytyImgFront = [...value]
        },
        identytyBackSuccess(value) {
            this.ruleForm.identytyImgBack = [...value]
        },
        fingerPrintSuccess(value) {
            this.ruleForm.fingerPrint = [...value]
        },
        handleExceed(files, fileList) {
            this.$message.error(`上传文件超出限制个数!`)
        },
        authorizationChange(response, file, fileList) {
            this.ruleForm.authorization = fileList.map(item => {
                return {
                    url: `${this.baseApi}/${file.response.data}?uid=${item.uid}&name=${item.name}`,
                    uid: item.uid,
                    name: item.name
                }
            })
        },
        attachmentChange(response, file, fileList) {
            this.ruleForm.attachment = fileList.map(item => {
                return {
                    url: `${this.baseApi}/${file.response.data}?uid=${item.uid}&name=${item.name}`,
                    uid: item.uid,
                    name: item.name
                }
            })
        },
        handleSubmit() {
            this.$refs.ruleForm.validate(async (valid) => {
                if(!valid) {
                    this.$message.error("请填写完整信息！")
                    return false
                }
                let _data = {
                    identity_num: this.ruleForm.identityNum,
                    identyty_img_front: this.ruleForm.identytyImgFront[0],
                    identyty_img_back: this.ruleForm.identytyImgBack[0],
                    name: this.ruleForm.name,
                    sex: this.ruleForm.sex,
                    phone: this.ruleForm.phone,
                    address: `${this.ruleForm.firstAddress}/${this.ruleForm.secondAddress}`,
                    fingerprint: this.ruleForm.fingerPrint[0],
                    authorization: this.ruleForm.authorization[0] ? this.ruleForm.authorization[0].url : '',
                    attachment: this.ruleForm.attachment[0] ? this.ruleForm.attachment[0].url : '',
                    note: this.ruleForm.note
                }

                if(this.$route.query.id) {
                    _data.id = this.$route.query.id
                    var addBianMinResult = await bianMinManage.editBianMin(_data)
                } else {
                    var addBianMinResult = await bianMinManage.addBianMin(_data)
                }
                
                if(addBianMinResult.code == 200) {
                    this.$message.success(addBianMinResult.data)
                    this.$router.push({ name: 'bianMinInfo' })
                }
            })
        },
        
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    width: 600px;
}
</style>
