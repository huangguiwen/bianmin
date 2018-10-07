<template>
    <div class="app-container">
        <el-form ref="form" :inline="true">
            <el-form-item label="订单号">
                <el-input placeholder="请输入订单号"></el-input>
            </el-form-item>
            <el-form-item label="商户订单号">
                <el-input placeholder="请输入商户订单号"></el-input>
            </el-form-item>
            <el-form-item label="商户名称">
                <el-input placeholder="请输入商户名称"></el-input>
            </el-form-item>
            <el-form-item label="户名">
                <el-input placeholder="请输入户名"></el-input>
            </el-form-item>
            <el-form-item label="收款账号">
                <el-input placeholder="请输入收款账号"></el-input>
            </el-form-item>
            <el-form-item label="充值金额">
                <el-col :span="11">
                    <el-input placeholder="请输入金额最小值"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入金额最大值"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="收取手续费">
                <el-col :span="11">
                    <el-input placeholder="请输入手续费最小值"></el-input>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-input placeholder="请输入手续费最大值"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="录入时间">
                <el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="类型">
                <el-select clearable placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="银联卡" value="1"></el-option>
                    <el-option label="支付宝" value="2"></el-option>
                    <el-option label="微信" value="3"></el-option>
                    <el-option label="Q码" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select clearable placeholder="请选择">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="待审核" value="0"></el-option>
                    <el-option label="确认到账" value="1"></el-option>
                    <el-option label="未到账" value="-1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <!-- <el-button type="primary" class="el-icon-search">搜索</el-button> -->
            </el-form-item>
        </el-form>
        <el-table :data="dataList">
            <el-table-column label="订单号" prop="cz_id"></el-table-column>
            <el-table-column label="商户订单号" prop="shop_order_id"></el-table-column>
            <el-table-column label="商户名称" prop="shop_name"></el-table-column>
            <el-table-column label="订单金额" prop="total_fee">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.total_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="充值金额" prop="real_fee">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.real_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="收取手续费" prop="service_fee">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.service_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="手续费成本" prop="cost_fee">
                <template slot-scope="scope">
                    <span>￥{{ scope.row.cost_fee | toFixed(2) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="类型" prop="account_type">
                <template slot-scope="scope">
                    <el-tag>{{ scope.row.account_type | accounType }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="户名" prop="account_name"></el-table-column>
            <el-table-column label="收款账户" prop="account"></el-table-column>
            <el-table-column label="充值时间" prop="create_time">
                <template slot-scope="scope">
                    <span>{{ scope.row.create_time | timeFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="status">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status==0 ? 'primary' : (scope.row.status==1 ? 'success' : 'warning')">{{ scope.row.status | accontStatus }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="title" width="150px">
                <template slot-scope="scope">
                    <!-- <el-button size="small">查看</el-button> -->
                    <el-button type="primary" size="small" @click="audit(scope.row)" v-if="scope.row.status==0">审核</el-button>
                    <el-button type="success" size="small" @click="edit(scope.row)" v-else>修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination @current-change="handleCurrentChange" :current-page.sync="searchForm.page" :page-size="searchForm.limit" 
            :total="searchForm.dataCount" layout="total, prev, pager, next, jumper"></el-pagination>

        <el-dialog title="审核" :visible.sync="visibleAuditFlag" width="40%">
            <el-form :model="auditForm" :rules="rules" ref="auditForm" label-width="120px">
                <el-form-item label="订单号：">
                    <span>{{ this.auditForm.cz_id }}</span>
                </el-form-item>
                <el-form-item label="商户订单号：">
                    <span>{{ this.auditForm.shop_order_id }}</span>
                </el-form-item>
                <el-form-item label="商户名称：">
                    <span>{{ this.auditForm.shop_name }}</span>
                </el-form-item>
                <el-form-item label="订单金额：">
                    <span>{{ this.auditForm.total_fee }}</span>
                </el-form-item>
                <el-form-item label="充值金额：">
                    <span>{{ this.auditForm.real_fee }}</span>
                </el-form-item>
                <el-form-item label="收取手续费：">
                    <span>{{ this.auditForm.service_fee }}</span>
                </el-form-item>
                <el-form-item label="手续费陈本：">
                    <span>{{ this.auditForm.cost_fee }}</span>
                </el-form-item>
                <el-form-item label="类型：">
                    <span>{{ this.auditForm.account_type | accounType }}</span>
                </el-form-item>
                <el-form-item label="户名：">
                    <span>{{ this.auditForm.account_name }}</span>
                </el-form-item>
                <el-form-item label="收款账户：">
                    <span>{{ this.auditForm.account }}</span>
                </el-form-item>
                <el-form-item label="充值时间：">
                    <span>{{ this.auditForm.create_time | timeFormat('yyyy-MM-dd hh:mm:ss') }}</span>
                </el-form-item>
                <el-form-item label="审核结果：" prop="status">
                    <el-radio-group v-model="auditForm.status">
                        <el-radio :label="1">确认到账</el-radio>
                        <el-radio :label="-1">未到账</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="订单号：" prop="pay_order_id" v-if="auditForm.status!=-1">
                    <el-input placeholder="请输入订单号" v-model="auditForm.pay_order_id"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="note">
                    <el-input type="textarea" placeholder="请输入备注" v-model="auditForm.note"></el-input>
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
    name: 'rechargeManage',
    data() {
        let validateAudit = (rule, value, callback) => {
            if (value == 0) {
                return callback(new Error('请选择审核结果！'));
            } else {
                callback()
            }
        }
        return {
            visibleAuditFlag: false,
            dataList: [],
            isEdit: false,
            searchForm: {
                page: 1,
                limit: 10,
                dataCount: 0
            },
            auditForm: {},
            rules: {
                status: [
                    { required: true, validator: validateAudit, trigger: 'change' },
                ],
                pay_order_id: [
                    { required: true, message: '请输入订单号', trigger: 'blur' }
                ],
                note: [
                    { required: true, message: '请输入备注', trigger: 'blur' }
                ],
            }
        }
    },
    created() {
        this.getDataList()
    },
    filters: {
        accounType(value) {
            switch(value) {
                case 1: 
                    return '银联卡'
                case 2: 
                    return '支付宝'
                case 3: 
                    return '微信'
                case 4: 
                    return 'Q码'
            }
        },
        accontStatus(value) {
            switch(value) {
                case 0: 
                    return '待审核'
                case 1: 
                    return '确认到账'
                case -1: 
                    return '未到账'
            }
        }
    },
    methods: {
        getDataList() {
            fundsManage.getRechargeList(this.searchForm).then(res => {
                if(res.code == 200) {
                    this.dataList = res.data.list
                    this.searchForm.dataCount = res.data.dataCount
                }
            })
        },
        handleCurrentChange(value) {
            this.searchForm.page = value
            this.getDataList()
        },
        audit(row) {
            this.isEdit = false
            this.auditForm = Object.assign({}, row)
            this.visibleAuditFlag = true
            if(this.$refs.auditForm) {
                this.$refs.auditForm.clearValidate()
            }
        },
        edit(row) {
            this.isEdit = true
            this.auditForm = Object.assign({}, row)
            this.visibleAuditFlag = true
            if(this.$refs.auditForm) {
                this.$refs.auditForm.resetField()
            }
        },
        auditSubmit() {
            this.$refs.auditForm.validate(async (valid) => {
                if(!valid) {
                    this.$message.error("请填写完整信息！")
                    return false
                }
                let submitData = { 
                    id: this.auditForm.id,
                    status: this.auditForm.status,
                    note: this.auditForm.note,
                    pay_order_id: this.auditForm.pay_order_id
                }
                let auditResult = await fundsManage.auditRecharge(submitData)
                if(auditResult.code == 200) {
                    this.visibleAuditFlag = false
                    this.$message.success('审核通过')
                    await this.getDataList()
                }
            })
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    .line {
        text-align: center;
    }
}
</style>
