<template>
    <div class="app-container">
        <el-tabs v-model="tabsName">
            <el-tab-pane label="个人资料" name="first">
                <div class="item">
                   <span class="text">身份证：</span>
                   <span>{{ tabsList.identity_num }}</span>
                </div>
                <div class="item">
                    <span class="text" style="vertical-align: top;">身份证正面：</span>
                    <img :src="tabsList.identyty_img_front" style="max-width: 120px;" alt="">
                </div>
                <div class="item">
                    <span class="text" style="vertical-align: top;">身份证反面：</span>
                    <img :src="tabsList.identyty_img_back" style="max-width: 120px;" alt="">
                </div>
                <div class="item">
                    <span class="text">姓名:</span>
                    <span>{{ tabsList.name }}</span>
                </div>
                <div class="item">
                    <span class="text">年龄: </span>
                    <span>{{ tabsList.age }}</span>
                </div>
                <div class="item">
                    <span class="text">性别: </span>
                    <span>{{ tabsList.sex }}</span>
                </div>
                <div class="item">
                    <span class="text">手机号码: </span>
                    <span>{{ tabsList.phone }}</span>
                </div>
                <div class="item">
                    <span class="text">地址: </span>
                    <span>{{ tabsList.address }}</span>
                </div>
                <div class="item">
                    <span class="text" style="vertical-align: top;">指纹图片：</span>
                    <img :src="tabsList.fingerprint" style="max-width: 120px;" alt="">
                </div>
                <div class="item">
                    <span class="text">授权书附件: </span>
                    <span>{{ tabsList.authorization | getFileName }}</span>
                    <el-button v-show="tabsList.authorization" @click="downloadFile(tabsList.authorization)" type="primary" size="mini" style="margin-left: 20px;">下载</el-button>
                </div>
                <div class="item">
                    <span class="text">其它附件: </span>
                    <span>{{ tabsList.attachment | getFileName }}</span>
                    <el-button v-show="tabsList.attachment" @click="downloadFile(tabsList.attachment)" type="primary" size="mini" style="margin-left: 20px;">下载</el-button>
                </div>
                <div class="item">
                    <span class="text">备注: </span>
                    <span>{{ tabsList.note }}</span>
                </div>
            </el-tab-pane>
            <el-tab-pane label="账户信息" name="seconde">
                <el-form ref="form" :inline="true">
                    <el-form-item label="账号ID">
                        <el-input placeholder="请输入账号ID" v-model="searchForm.zh_id"></el-input>
                    </el-form-item>
                    <el-form-item label="户名">
                        <el-input placeholder="请输入户名"  v-model="searchForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证">
                        <el-input placeholder="请输入身份证"  v-model="searchForm.identity_num"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input placeholder="请输入手机号"  v-model="searchForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="账号">
                        <el-input placeholder="请输入账号"  v-model="searchForm.account"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行">
                        <el-input placeholder="请输入开户行"  v-model="searchForm.bank"></el-input>
                    </el-form-item>
                    <el-form-item label="余额">
                        <el-col :span="11">
                            <el-input placeholder="请输入余额最小值"  v-model="searchForm.balance_gt"></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-input placeholder="请输入余额最大值"  v-model="searchForm.balance_lt"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="额度">
                        <el-col :span="11">
                            <el-input placeholder="请输入额度最小值"  v-model="searchForm.day_limit_gt"></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-input placeholder="请输入额度最大值"  v-model="searchForm.day_limit_lt"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select clearable placeholder="请选择"  v-model="searchForm.account_type">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="银联卡" value="1"></el-option>
                            <el-option label="支付宝" value="2"></el-option>
                            <el-option label="微信" value="3"></el-option>
                            <el-option label="Q码" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select clearable placeholder="请选择"  v-model="searchForm.status">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="停用" value="0"></el-option>
                            <el-option label="使用中" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="录入时间">
                        <el-date-picker  v-model="searchForm.create_time" type="datetimerange" value-format="timestamp" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="el-icon-search" @click="searchData">搜索</el-button>
                    </el-form-item>
                    
                </el-form>
                <el-table :data="dataList">
                    <el-table-column label="账号ID" prop="zh_id"></el-table-column>
                    <el-table-column label="户名" prop="name"></el-table-column>
                    <el-table-column label="身份证" prop="identity_num"></el-table-column>
                    <el-table-column label="手机号" prop="phone"></el-table-column>
                    <el-table-column label="类型">
                        <template slot-scope="scope">
                            <el-tag>{{ scope.row.account_type | accounType }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="账号" prop="account"></el-table-column>
                    <el-table-column label="初始余额" prop="balance">
                        <template slot-scope="scope">
                            <span>￥{{ scope.row.balance | toFixed(2) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="开户行" prop="bank"></el-table-column>
                    <el-table-column label="密码" prop="account_pwd"></el-table-column>
                    <el-table-column label="收款码" prop="qr_code">
                        <template slot-scope="scope">
                            <zoom-img :src="scope.row.qr_code"></zoom-img>
                        </template>
                    </el-table-column>
                    <el-table-column label="额度" prop="day_limit">
                        <template slot-scope="scope">
                            <span>￥{{ scope.row.day_limit | toFixed(2) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="录入时间" prop="create_time">
                        <template slot-scope="scope">
                            <span>{{ scope.row.create_time | timeFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" prop="status">
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status==1 ? 'success' : 'danger'">{{ scope.row.status | accontStatus }}</el-tag>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination @current-change="handleCurrentChange" :current-page.sync="searchForm.page" :page-size="searchForm.limit" 
                    :total="searchForm.dataCount" layout="total, prev, pager, next, jumper"></el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import bianMinManage from '@/api/bianMinManage'
import zoomImg from '@/components/zoomImg'
export default {
    name: 'bianMinInfoDetail',
    components: {
        zoomImg
    },
    data() {
        return {
            id: 0,
            tabsName: 'first',
            tabsList: {},
            dataList: [],
            searchForm: {
                page: 1,
                limit: 10,
                dataCount: 0,
                zh_id: '',
                name: '',
                identity_num: '',
                phone: '',
                account_type: '',
                account: '',
                balance_gt: '',
                balance_lt: '',
                bank: '',
                account_pwd: '',
                qr_code: '',
                day_limit_gt: '',
                day_limit_lt: '',
                create_time: '',
                create_time_gt: '',
                create_time_lt: '',
                status: ''
            },
        }
    },
    created() {
        this.id = this.$route.query.id
        this.getDataList()
    },
    filters: {
        getFileName(value) {
            if(value) {
                return value.split('&name=')[1]
            } else {
                return ''
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
        accontStatus(value) {
            switch(value) {
                case 0: 
                    return '停用'
                case 1: 
                    return '使用中'
            }
        }
    },
    methods: {
        getDataList() {
            bianMinManage.getBianMin({id: this.id}).then(res => {
                if(res.code == 200) {
                    this.tabsList = res.data.list[0]
                }
            })
            this.searchForm.bianmin_id = this.id
            bianMinManage.getBianMinAccounts(this.searchForm).then(res => {
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
        searchData() {
            try {
                if(this.searchForm.create_time != '') {
                    this.searchForm.create_time_gt = parseInt(this.searchForm.create_time[0])/1000
                    this.searchForm.create_time_lt = parseInt(this.searchForm.create_time[1])/1000
                }
            } catch (error) {
                
            }
            this.getDataList()
        },
        downloadFile(file) {
            fetch(file).then(res => res.blob().then(blob => {
                let a = document.createElement('a');
                let url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = file.split('&name=')[1];
                a.click();
                window.URL.revokeObjectURL(url);
            }))
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    .item {
        padding: 15px 0;
    }
    .text {
        width: 120px;
        text-align: right;
        display: inline-block;
    }
}
</style>
