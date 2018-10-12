<template>
    <div class="app-container">
        <el-dialog title="审核" :visible.sync="visibleAuditFlag" width="40%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                <el-form-item label="订单号：">
                    <span>{{ dataList.tx_id }}</span>
                </el-form-item>
                <el-form-item label="商户名称：">
                    <span>{{ dataList.shop_name }}</span>
                </el-form-item>
                <el-form-item label="提现金额：">
                    <span>{{ dataList.total_fee | toFixed(2) }}</span>
                </el-form-item>
                <el-form-item label="收取手续费：">
                    <span>{{ dataList.service_fee | toFixed(2) }}</span>
                </el-form-item>
                <el-form-item label="手续费成本：">
                    <span>{{ dataList.cost_fee | toFixed(2) }}</span>
                </el-form-item>
                <el-form-item label="银行：">
                    <span>{{ dataList.bank }}</span>
                </el-form-item>
                <el-form-item label="户名：">
                    <span>{{ dataList.bank_username }}</span>
                </el-form-item>
                <el-form-item label="收款账户：">
                    <span>{{ dataList.bank_account }}</span>
                </el-form-item>
                <el-form-item label="申请时间：">
                    <span>{{ dataList.create_time | timeFormat('yyyy-MM-dd hh:mm:ss') }}</span>
                </el-form-item>
                <el-form-item label="状态：">
                    <span>{{ dataList.status | statusFilter }}</span>
                </el-form-item>
                <el-form-item label="审核结果：" prop="status">
                    <el-radio-group v-model="ruleForm.status">
                        <el-radio :label="1">同意提现</el-radio>
                        <el-radio :label="-1">拒绝提现</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注：" prop="note">
                    <el-input type="textarea" placeholder="请输入备注" v-model="ruleForm.note"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visibleAuditFlag = false">取 消</el-button>
                <el-button type="primary" @click="auditSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import fundsManage from '@/api/fundsManage'
export default {
    data() {
        return {
            visibleAuditFlag: false,
            dataList: {},
            ruleForm: {
                id: 0,
                status: '',
                note: ''
            },
            rules: {
                status: [
                    { required: true, message: '请选择审核结果', trigger: 'change' },
                ],
                note: [
                    { required: true, message: '请输入备注', trigger: 'blur' },
                ]
            }
        }
    },
    props: {
        checkFlag: {
            type: Boolean,
            default: false
        },
        id: {
            type: Number
        }
    },
    watch: {
        id(value) {
            fundsManage.getWithdrawList({id: value}).then(res =>{
                if(res.code == 200) {
                    this.dataList = res.data.list[0]
                    this.ruleForm.note = res.data.list[0].note
                }
            })
        },
        checkFlag(value) {
            this.visibleAuditFlag = value
            if(value && this.$refs.ruleForm) {
                this.$refs.ruleForm.clearValidate()
            }
            
        },
        visibleAuditFlag(value) {
            this.$emit('checkFlagChange', value)
        }
    },
    filters: {
        statusFilter(value) {
            switch(value) {
                case -2: 
                    return '关闭提现'
                case -1: 
                    return '拒绝提现'
                case 0: 
                    return '待审核提现'
                case 1: 
                    return '待商户确认'
                case 2: 
                    return '待处理提现'
                case 3: 
                    return '处理完成'
            }
        }
    },
    methods: {
        auditSubmit(value) {
            this.ruleForm.id = this.id
            this.$refs.ruleForm.validate(valid => {
                if(!valid) {
                    this.$message.error("请填写完整信息！")
                    return false
                }
                fundsManage.auditWithdraw(this.ruleForm).then(res => {
                    if(res.code == 200) {
                        this.$message.success('操作成功！')
                    }
                })  
                this.$emit('checkFlagChange', false)
            })
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
