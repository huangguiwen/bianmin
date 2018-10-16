<template>
    <div class="app-container">
        <el-dialog title="编辑" :visible.sync="showFlag" :before-close="beforeClose" width="40%">
            <div class="item">
                <span class="text">商户ID：</span>
                <span>{{ dataList.sh_id }}</span>
            </div>
            <div class="item">
                <span class="text">账号：</span>
                <span>{{ dataList.username }}</span>
            </div>
            <div class="item">
                <span class="text">手机号：</span>
                <span>{{ dataList.phone }}</span>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form" label-width="140px">
                <el-form-item label="商户名称：" prop="shop_name">
                    <el-input v-model="ruleForm.shop_name"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" prop="contact">
                    <el-input v-model="ruleForm.contact"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="tel">
                    <el-input v-model="ruleForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="地址：" prop="firstAddress">
                    <select-area v-model="ruleForm.firstAddress"></select-area>
                </el-form-item>
                <el-form-item label="" prop="secondAddress">
                    <el-input type="textarea" v-model="ruleForm.secondAddress"></el-input>
                </el-form-item>
                <el-form-item label="每天额度:" prop="shop_day_limit">
                    <el-input v-model="ruleForm.shop_day_limit"></el-input>
                </el-form-item>
                <el-form-item label="银联卡充值手续费:" required>
                    <el-col :span="8">
                        <el-form-item  prop="cz_service_fee_per1">
                            <el-input type="number" max="100" v-model="ruleForm.cz_service_fee_per1">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  prop="cz_service_fee1">
                            <el-input type="number" v-model="ruleForm.cz_service_fee1" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="支付宝充值手续费:" required>
                    <el-col :span="8">
                        <el-form-item  prop="cz_service_fee_per2">
                            <el-input type="number" max="100" v-model="ruleForm.cz_service_fee_per2">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  prop="cz_service_fee2">
                            <el-input type="number" v-model="ruleForm.cz_service_fee2" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="微信充值手续费:" required>
                    <el-col :span="8">
                        <el-form-item  prop="cz_service_fee_per3">
                            <el-input type="number" max="100" v-model="ruleForm.cz_service_fee_per3">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  prop="cz_service_fee3">
                            <el-input type="number" v-model="ruleForm.cz_service_fee3"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="Q码充值手续费:" required>
                    <el-col :span="8">
                        <el-form-item  prop="cz_service_fee_per4">
                            <el-input type="number" max="100" v-model="ruleForm.cz_service_fee_per4">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  prop="cz_service_fee4">
                            <el-input type="number" v-model="ruleForm.cz_service_fee4" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="银联卡提现手续费:" required>
                    <el-col :span="8">
                        <el-form-item  prop="tx_service_fee_per">
                            <el-input type="number" max="100" v-model="ruleForm.tx_service_fee_per">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  prop="tx_service_fee">
                            <el-input type="number" v-model="ruleForm.tx_service_fee" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="审核意见:" prop="note">
                    <el-input type="textarea" v-model="ruleForm.note"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="checkCancel">取 消</el-button>
                <el-button type="primary" @click="checkSumbit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import merchantManage from '@/api/merchantManage'
import selectArea from '@/components/selectArea'
export default {
    components: {
        selectArea
    },
    data() {
        return {
            dataList: {},
            shop_day_limit: '',
            ruleForm: {
                shop_name: '',
                contact: '',
                tel: '',
                firstAddress: '',
                secondAddress: '',
                note: '',
                cz_service_fee_per1: '',
                cz_service_fee1: '',
                cz_service_fee_per2: '',
                cz_service_fee2: '',
                cz_service_fee_per3: '',
                cz_service_fee3: '',
                cz_service_fee_per4: '',
                cz_service_fee4: '',
                tx_service_fee_per: '',
                tx_service_fee: '',
            },
            rules: {
                shop_name: [
                    { required: true, message: '请输入商户名称', trigger: 'blur' }
                ],
                contact: [
                    { required: true, message: '请输入联系人', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '请输入联系电话', trigger: 'blur' }
                ],
                firstAddress: [
                    { required: true, message: '请选择省市区', trigger: 'change' }
                ],
                secondAddress: [
                    { required: true, message: '请输入地址', trigger: 'blur' }
                ],
                note: [
                    { required: true, message: '请输入审核意见', trigger: 'blur' }
                ],
                shop_day_limit: [
                    { required: true, message: '请输入每天额度', trigger: 'blur' }
                ],
                cz_service_fee_per1: [
                    { required: true, message: '请输入充值金额手续费(%)', trigger: 'blur' }
                ],
                cz_service_fee1: [
                    { required: true, message: '请输入充值金额手续费', trigger: 'blur' }
                ],
                cz_service_fee_per2: [
                    { required: true, message: '请输入充值金额手续费(%)', trigger: 'blur' }
                ],
                cz_service_fee2: [
                    { required: true, message: '请输入充值金额手续费', trigger: 'blur' }
                ],
                cz_service_fee_per3: [
                    { required: true, message: '请输入充值金额手续费(%)', trigger: 'blur' }
                ],
                cz_service_fee3: [
                    { required: true, message: '请输入充值金额手续费', trigger: 'blur' }
                ],
                cz_service_fee_per4: [
                    { required: true, message: '请输入充值金额手续费(%)', trigger: 'blur' }
                ],
                cz_service_fee4: [
                    { required: true, message: '请输入充值金额手续费', trigger: 'blur' }
                ],
                tx_service_fee_per: [
                    { required: true, message: '请输入充值金额手续费(%)', trigger: 'blur' }
                ],
                tx_service_fee: [
                    { required: true, message: '请输入充值金额手续费', trigger: 'blur' }
                ]
            }
        }
    },
    props: {
        editDialog: {
            type: Boolean,
            default: false
        },
        id: {
            type: Number,
            default: 0
        }
    },
    watch: {
        async id(value) {
            await this.getDataList()
            let addressArray = this.dataList.address.split(' ')
            Object.assign(this.ruleForm, {
                shop_name: this.dataList.shop_name,
                contact: this.dataList.contact,
                tel: this.dataList.tel,
                secondAddress: addressArray.pop(),
                firstAddress: addressArray.join('/'),
                note: this.dataList.note,
                checkAdvice: '',
                shop_day_limit: this.dataList.conf[4].shop_day_limit,
                cz_service_fee_per1: this.dataList.conf[0].cz_service_fee_per,
                cz_service_fee1: this.dataList.conf[0].cz_service_fee,
                cz_service_fee_per2: this.dataList.conf[1].cz_service_fee_per,
                cz_service_fee2: this.dataList.conf[1].cz_service_fee,
                cz_service_fee_per3: this.dataList.conf[2].cz_service_fee_per,
                cz_service_fee3: this.dataList.conf[2].cz_service_fee,
                cz_service_fee_per4: this.dataList.conf[3].cz_service_fee_per,
                cz_service_fee4: this.dataList.conf[3].cz_service_fee,
                tx_service_fee_per: this.dataList.conf[0].tx_service_fee_per,
                tx_service_fee: this.dataList.conf[0].tx_service_fee,
            })   
        },
        showFlag() {
            this.$refs.ruleForm.clearValidate()
        }
    },
    computed: {
        showFlag() {
            return this.editDialog
        }
    },
    methods: {
        async getDataList() {
            await new Promise(resolve => {
                merchantManage.getCheckMessage({id: this.id}).then(res => {
                    if(res.code == 200) {
                        this.dataList = res.data
                        resolve()
                    }
                })
            })
            
        },
        beforeClose() {
            this.$emit('editDialogFlag', false)
        },
        checkCancel() {
            this.$emit('editDialogFlag', false)
        },
        checkSumbit() {
            this.$refs.ruleForm.validate(async (valid) => {
                if(!valid) {
                    this.$message.error("请填写完整信息！")
                    return false
                }
                let sumbitData = {
                    id: this.dataList.id,
                    shop_id: this.dataList.shop_id,
                    shop_name: this.ruleForm.shop_name,
                    contact: this.ruleForm.contact,
                    tel: this.ruleForm.tel,
                    address: `${this.ruleForm.firstAddress}/${this.ruleForm.secondAddress}`,
                    shop_day_limit: this.ruleForm.shop_day_limit,
                    conf: [{
                        type: 1,
                        shop_id: this.dataList.shop_id,
                        cz_service_fee_per: this.ruleForm.cz_service_fee_per1,
                        cz_service_fee: this.ruleForm.cz_service_fee1,
                        tx_service_fee_per: this.ruleForm.tx_service_fee_per,
                        tx_service_fee: this.ruleForm.tx_service_fee
                    },{
                        type: 2,
                        shop_id: this.dataList.shop_id,
                        cz_service_fee_per: this.ruleForm.cz_service_fee_per2,
                        cz_service_fee: this.ruleForm.cz_service_fee2
                    },{
                        type: 3,
                        shop_id: this.dataList.shop_id,
                        cz_service_fee_per: this.ruleForm.cz_service_fee_per3,
                        cz_service_fee: this.ruleForm.cz_service_fee3
                    },{
                        type: 4,
                        shop_id: this.dataList.shop_id,
                        cz_service_fee_per: this.ruleForm.cz_service_fee_per4,
                        cz_service_fee: this.ruleForm.cz_service_fee4
                    }],
                    note: this.ruleForm.note
                }
                let editResult = await merchantManage.changeStatus(sumbitData)
                if(editResult.code == 200) {
                    this.$message.success('修改成功！')
                }
                this.$emit('editDialogFlag', false)
            })
            
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    .item {
        padding: 15px 0;
    }
    .text {
        width: 140px;
        text-align: right;
        display: inline-block;
    }
    .form {
        margin-top: 30px;
    }
}   
</style>
