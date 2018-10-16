<template>
    <div class="app-container">
        <!-- 添加账户 -->
        <el-dialog title="添加账户" :visible.sync="addAccountFlag" width="30%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                <el-form-item label="身份证" required>
                    <el-select v-model="searchIdentity" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
                        <el-option v-for="(item, index) in bainMinList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="户名" required>
                    <el-input placeholder="请输入户名" disabled required v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input placeholder="请输入手机号" v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="账号类型" prop="accounType">
                    <el-select v-model="ruleForm.accounType" @change="handleAccountTypeChange" placeholder="请选择">
                        <el-option label="银联卡" :value="1"></el-option>
                        <el-option label="支付宝" :value="2"></el-option>
                        <el-option label="微信" :value="3"></el-option>
                        <el-option label="Q码" :value="4" disabled></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号" prop="account" v-if="ruleForm.accounType==1">
                    <el-input placeholder="请输入账号" v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item label="开户行" prop="bank" v-if="ruleForm.accounType==1">
                    <el-input placeholder="请输入开户行" v-model="ruleForm.bank"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="ruleForm.accounType==1">
                    <el-input placeholder="请输入密码" v-model="ruleForm.password"></el-input>
                </el-form-item>

                <el-form-item label="支付宝账号" prop="account" v-if="ruleForm.accounType==2">
                    <el-input placeholder="请输入支付宝账号" v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item label="支付宝密码" prop="password" v-if="ruleForm.accounType==2">
                    <el-input placeholder="请输入支付宝密码" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="支付宝收款码" prop="password" v-if="ruleForm.accounType==2" required>
                    <el-upload class="avatar-uploader" :action="uploadPath" :show-file-list="false" :on-success="handleAvatarSuccess">
                        <img v-if="ruleForm.moneyQR" :src="ruleForm.moneyQR" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="微信账号" prop="account" v-if="ruleForm.accounType==3">
                    <el-input placeholder="请输入微信账号" v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item label="微信密码" prop="password" v-if="ruleForm.accounType==3">
                    <el-input placeholder="请输入微信密码" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="微信收款码" prop="password" v-if="ruleForm.accounType==3" required>
                    <el-upload class="avatar-uploader" :action="uploadPath" :show-file-list="false" :on-success="handleAvatarSuccess">
                        <img v-if="ruleForm.moneyQR" :src="ruleForm.moneyQR" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <el-form-item label="Q码账号" prop="account" v-if="ruleForm.accounType==4">
                    <el-input placeholder="请输入Q码账号" v-model="ruleForm.account"></el-input>
                </el-form-item>

                <el-form-item label="每日额度" prop="dayLimit">
                    <el-input placeholder="请输入每日额度" v-model="ruleForm.dayLimit"></el-input>
                </el-form-item>
                <el-form-item label="初始余额" prop="balance">
                    <el-input placeholder="请输入初始余额" v-model="ruleForm.balance"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeVisibleAddAccountFlag">取 消</el-button>
                <el-button type="primary" @click="addAccountOK">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import bianMinManage from '@/api/bianMinManage'
export default {
    data() {
        return {
            addAccountFlag: false,
            uploadPath: process.env.UPLOAD_PATH,
            baseApi: process.env.BASE_API,
            loading: false,
            searchIdentity: '',
            bainMinList: [],
            addAccountData: {},
            ruleForm: {
                identityNum: '',
                bainMinId: '',
                name: '',
                phone: '',
                accounType: '',
                account: '',
                bank: '',
                password: '',
                moneyQR: '',
                dayLimit: '',
                balance: 8000
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ],
                accounType: [
                    { required: true, message: '请输入账号类型', trigger: 'change' },
                ],
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                bank: [
                    { required: true, message: '请输入开户行', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                dayLimit: [
                    { required: true, message: '请输入每日额度', trigger: 'blur' },
                ],
                balance: [
                    { required: true, message: '请输入初始余额', trigger: 'blur' },
                ],
            }
        }
    },
    props: {
        visibleAddAccountFlag: {
            type: Boolean,
            default: false
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        editData: {
            type: Object,
            default: null
        }
    },
    watch: {
        visibleAddAccountFlag(value) {
            this.addAccountFlag = value
        },
        addAccountFlag(value) {
            this.$emit('changeFlag', value)
        },
        searchIdentity(value) {
            let selectedBainMin = this.bainMinList.filter(item => {
                return item.value == value
            })
            if(selectedBainMin.length > 0) {
                this.ruleForm.bainMinId = selectedBainMin[0].bianMinId
                this.ruleForm.name = selectedBainMin[0].name
                this.ruleForm.phone = selectedBainMin[0].phone
                this.ruleForm.identityNum = selectedBainMin[0].value
            }
            
        },
        editData(value) {
            if(value != null) {
                if(this.$refs.ruleForm) {
                    this.$refs.ruleForm.clearValidate()
                }
                this.ruleForm.accounType = value.account_type
                this.ruleForm.bainMinId = value.id
                this.searchIdentity = value.identity_num
                this.ruleForm.name = value.name
                this.ruleForm.phone = value.phone
                this.ruleForm.account = value.account
                this.ruleForm.bank = value.bank
                this.ruleForm.password = value.account_pwd
                this.ruleForm.moneyQR = value.qr_code
                this.ruleForm.dayLimit = value.day_limit
                this.ruleForm.balance = value.balance
                this.ruleForm.accountId = value.id
            } else {
                if(this.$refs.ruleForm) {
                    this.$refs.ruleForm.clearValidate()
                }
                this.searchIdentity = ''
                this.ruleForm = {
                    balance: 8000
                } 
            }
        }
    },
    methods: {
        changeVisibleAddAccountFlag() {
            this.$emit('changeFlag', false)
        },
        handleAccountTypeChange() {
            this.$refs.ruleForm.clearValidate()
        },
        handleAvatarSuccess(res, file) {
            this.ruleForm.moneyQR = `${this.baseApi}/${res.data}`
        },
        remoteMethod(value) {
            this.loading = true
            bianMinManage.getBianMin({identity_num: value}).then(res => {
                if(res.code == 200) {
                    this.bainMinList = res.data.list.map(item => {
                        return {
                            label: item.identity_num,
                            value: item.identity_num,
                            name: item.name,
                            phone: item.phone,
                            bianMinId: item.id
                        }
                    })
                    this.loading = false
                }
            })
        },
        addAccountOK() {
            this.$refs.ruleForm.validate(async (valid) => {
                if(!valid) {
                    this.$message.error("请填写完整信息！")
                    return false
                }
                let dataList = {
                    bianmin_id: this.ruleForm.bainMinId,
                    identity_num: this.ruleForm.identityNum,
                    account_type: this.ruleForm.accounType,
                    day_limit: this.ruleForm.dayLimit,
                    balance: this.ruleForm.balance,
                    phone: this.ruleForm.phone
                }
                if(this.ruleForm.accounType == 1) {
                    dataList = Object.assign(dataList, {
                        account: this.ruleForm.account,
                        bank: this.ruleForm.bank,
                        account_pwd: this.ruleForm.password
                    }) 
                } else if(this.ruleForm.accounType == 2 || this.ruleForm.accounType == 3) {
                    dataList = Object.assign(dataList, {
                        account: this.ruleForm.account,
                        account_pwd: this.ruleForm.password,
                        qr_code: this.ruleForm.moneyQR
                    })
                } else if(this.ruleForm.accounType == 4) {
                    dataList = Object.assign(dataList, {
                        account: this.ruleForm.account,
                    })
                }
                if(this.isEdit) {
                    // 编辑账户比添加账户多一个账户ID
                    dataList = Object.assign(dataList, {
                        id: this.ruleForm.accountId,
                    })
                    let addAccountResult = await bianMinManage.editBianMinAccounts(dataList)
                    if(addAccountResult.code == 200) {
                        this.$emit('changeFlag', false)
                        this.$message.success('修改成功！')
                        this.getDataList()
                    }
                } else {
                    let addAccountResult = await bianMinManage.addBianMinAccounts(dataList)
                    if(addAccountResult.code == 200) {
                        this.$emit('changeFlag', false)
                        this.$message.success('添加成功！')
                        this.getDataList()
                    }
                }
                
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
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
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
}
</style>
