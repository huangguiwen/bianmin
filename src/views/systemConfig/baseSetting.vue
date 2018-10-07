<template>
    <div class="app-container">
        <section>
            <h4>手续费设置</h4>
            <el-form ref="form" v-for="(item, index) in formList" :key="index" :inline="true" class="form" :class="{bottomLine: index==3 }" label-width="200px">
                <el-form-item :label="item.title"></el-form-item>
                <el-form-item label="实际成本按充值金额">
                    <el-col :span="6">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="1" style="text-align:center;">
                        <span>%</span>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-input></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="向商户收取手续费按充值金额">
                    <el-col :span="6">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="1" style="text-align:center;">
                        <span>%</span>
                    </el-col>
                    <el-col :span="2" style="text-align:center; font-size:20px;">
                        <span class="el-icon-plus"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-input></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
        </section>
        <section>
            <h4>边民充值账号智能参数设置</h4>
            <el-form ref="form" :inline="true" class="form" label-width="200px">
                <el-form-item label="银联卡每天总额度">
                    <el-col :span="24">
                        <el-input></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="额度最大使用率">
                    <el-col :span="23">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="1" style="text-align:center;">
                        <span>%</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="银联卡最大使用次数">
                    <el-col :span="24">
                        <el-input></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form ref="form" :inline="true" class="form" label-width="200px">
                <el-form-item label="支付宝每天总额度">
                    <el-col :span="24">
                        <el-input></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="额度最大使用率">
                    <el-col :span="23">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="1" style="text-align:center;">
                        <span>%</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="支付宝最大使用次数">
                    <el-col :span="24">
                        <el-input></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form ref="form" :inline="true" class="form" label-width="200px">
                <el-form-item label="微信每天总额度">
                    <el-col :span="24">
                        <el-input></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="额度最大使用率">
                    <el-col :span="23">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="1" style="text-align:center;">
                        <span>%</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="微信最大使用次数">
                    <el-col :span="24">
                        <el-input></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <el-form ref="form" :inline="true" class="form" label-width="200px">
                <el-form-item label="Q码每天总额度">
                    <el-col :span="24">
                        <el-input></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="额度最大使用率">
                    <el-col :span="23">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="1" style="text-align:center;">
                        <span>%</span>
                    </el-col>
                </el-form-item>
                <el-form-item label="Q码卡最大使用次数">
                    <el-col :span="24">
                        <el-input></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
        </section>
        <section>
            <h4>商户设置</h4>
            <el-form ref="form" :inline="true" class="form" label-width="200px">
                <el-form-item label="默认每天最高额度">
                    <el-col :span="24">
                        <el-input></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>

export default {
  name: 'baseSetting',
  data() {
    return {
        formList: [
            {
                title: '银联卡充值手续费：'
            },{
                title: '支付宝充值手续费：'
            },{
                title: '微信充值手续费：'
            },{
                title: 'Q码充值手续费：'
            },{
                title: '银联卡提现手续费：'
            },{
                title: '支付宝提现手续费：'
            },{
                title: '微信提现手续费：'
            },{
                title: 'Q码提现手续费：'
            }]
    }
  },
  methods: {
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    h4 { color: #555; }
    .form {
        padding-top: 20px; 
    }
    .bottomLine {
        border-bottom: 1px solid #ccc;
    }
}
</style>
