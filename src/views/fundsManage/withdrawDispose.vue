<template>
    <div class="app-container">
        <section>
            <div class="flex-box">
                <div>
                    <p>订单号：{{ messageList.tx_id }}</p>
                    <p>提现金额：{{ messageList.total_fee }}</p>
                    <p>银行：{{ messageList.bank }}</p>
                    <p>申请时间：{{ messageList.create_time | timeFormat('yyyy-MM-dd hh:mm:ss') }}</p>
                </div>
                <div>
                    <p>商户名称：{{ messageList.shop_name }}</p>
                    <p>收取手续费：{{ messageList.service_fee }}</p>
                    <p>户名：{{ messageList.bank_username }}</p>
                    <p>状态：{{ messageList.status | statusFilter }}</p>
                </div>
                <div>
                    <p>手续费成本：{{ messageList.cost_fee }}</p>
                    <p>收款账号：{{ messageList.tx_id }}</p>
                </div>
            </div>
        </section>
        <section>
            <h3>——选择打款给商户的边民账号——</h3>
            <el-form ref="form" :inline="true">
                <el-form-item label="户名">
                    <el-input placeholder="请输入户名"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input placeholder="请输入账号"></el-input>
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
                <el-form-item label="今日提现金额">
                    <el-col :span="11">
                        <el-input placeholder="请输入今日提现金额最小值"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-input placeholder="请输入今日提现金额最大值"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="本月提现金额">
                    <el-col :span="11">
                        <el-input placeholder="请输入本月提现金额最小值"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-input placeholder="请输入本月提现金额最大值"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-icon-search">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="dataList" max-height="400">
                <el-table-column label="账户ID" prop="zh_id"></el-table-column>
                <el-table-column label="户名" prop="name"></el-table-column>
                <el-table-column label="类型" prop="account_type">
                    <template slot-scope="scope">
                        <el-tag>{{ scope.row.account_type | accounType }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="账号" prop="account"></el-table-column>
                <el-table-column label="账户余额" prop="balance">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.balance | toFixed(2) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="今日提现金额" prop="day_fee">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.day_fee | toFixed(2) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="今日提现笔数" prop="day_count"></el-table-column>
                <el-table-column label="本月提现金额" prop="month_fee">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.month_fee | toFixed(2) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="本月提现笔数" prop="month_count"></el-table-column>
                <el-table-column label="操作" prop="title" width="150px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="selectData(scope.row)">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <section>
            <h3>——已选择打款给商户的边民账号——</h3>
            <el-table :data="selectedDataList" max-height="400">
                <el-table-column label="账户ID" prop="zh_id"></el-table-column>
                <el-table-column label="户名" prop="name"></el-table-column>
                <el-table-column label="类型" prop="account_type">
                    <template slot-scope="scope">
                        <el-tag>{{ scope.row.account_type | accounType }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="账号" prop="account"></el-table-column>
                <el-table-column label="账户余额" prop="balance">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.balance | toFixed(2) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="今日提现金额" prop="day_fee">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.day_fee | toFixed(2) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="今日提现笔数" prop="day_count"></el-table-column>
                <el-table-column label="本月提现金额" prop="month_fee">
                    <template slot-scope="scope">
                        <span>￥{{ scope.row.month_fee | toFixed(2) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="本月提现笔数" prop="month_count"></el-table-column>
                <el-table-column label="*订单号" prop="pay_order" width="200px">
                    <template slot-scope="scope">
                        <el-input v-model="selectedDataList[scope.$index].pay_order"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="*取款金额" prop="fee" width="150px">
                    <template slot-scope="scope">
                        <el-input type="number" :max="messageList.total_fee" min="0" v-model="selectedDataList[scope.$index].fee"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="*备注" prop="note" width="200px">
                    <template slot-scope="scope">
                        <el-input v-model="selectedDataList[scope.$index].note"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="操作" prop="title" width="150px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="removeData(scope.row)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <div style="text-align: center;">
            <!-- <el-button type="primary" size="medium" @click="saveData">存草稿</el-button> -->
            <el-button type="primary" size="medium" @click="submitData">提交</el-button>
        </div>
    </div>
</template>

<script>
import fundsManage from '@/api/fundsManage'
export default {
    name: 'withdrawDispose',
    data() {
        return {
            searchForm: {
                id: ''
            },
            messageList: {},
            dataList: [],
            selectedDataList: []
        }
    },
    created() {
        this.searchForm.id = this.$route.query.id
        this.getDataList()
    },
    filters: {
        statusFilter(value) {
            switch(value) {
                case -2: 
                    return '拒绝提现'
                case -1: 
                    return '关闭提现'
                case 0: 
                    return '待审核提现'
                case 1: 
                    return '待商户确认'
                case 2: 
                    return '待处理提现'
                case 3: 
                    return '处理完成'
            }
        },
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
    },
    methods: {
        getDataList() {
            new Promise(resolve => {
                fundsManage.getWithdrawList({ id: this.$route.query.id }).then(res =>{
                    if(res.code == 200) {
                        this.messageList = res.data.list[0]
                        resolve()
                    }
                })
                fundsManage.getDepositList(this.searchForm).then(res =>{
                    if(res.code == 200) {
                        this.dataList = res.data.list
                        resolve()
                    }
                })
            })
        },
        selectData(data) {
            this.selectedDataList.push(data)
            this.dataList = this.dataList.filter(item => {
                return item.id != data.id
            })
        },
        removeData(data) {
            this.dataList.push(Object.assign(data, {pay_order: '', fee: '', note: ''}))
            this.selectedDataList = this.selectedDataList.filter(item => {
                return item.id != data.id
            })
        },
        saveData() {
            let saveData = {
                id: this.$route.query.id,
                list: this.selectedDataList,
                isSave: true
            }
            if(this.selectedDataList.length > 0) {
                fundsManage.submitDeposeData(saveData).then(res => {
                    if(res.code == 200) {
                        this.$confirm('是否确定打款?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '提交成功！'
                            });
                            }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消操作'
                            })     
                        })
                    } 
                })
            } else {
                this.$message.error('请添加账户！')
            }
            
        },
        submitData() {
            let returnFlag = false
            this.selectedDataList.forEach(item => {
                if(item.fee < 0) {
                    this.$message.error('取款金额不能为负数！')
                    returnFlag = true
                    return false
                }
            })
            if(returnFlag) {
                return false
            }
            let saveData = {
                id: this.$route.query.id,
                list: this.selectedDataList,
                isSave: false
            }
            if(this.selectedDataList.length > 0) {
                fundsManage.submitDeposeData(saveData).then(res => {
                    if(res.code == 200) {
                        this.$confirm('是否确定打款?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'})
                            .then(() => {
                                this.$message({
                                    type: 'success',
                                    message: '提交成功！'
                                })
                                this.$router.push({ name: 'withdrawManage' })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消操作'
                                })     
                        })
                    } 
                })
            } else {
                this.$message.error('请添加账户！')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    .flex-box {
        display: flex;
        align-items: center;
        &>div {
            flex: 1;
        }
    }
    h3 {
        text-align: center;
    }
    
}
.line {
    text-align: center;
}

</style>
