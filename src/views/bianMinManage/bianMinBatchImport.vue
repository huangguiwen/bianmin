<template>
    <div class="app-container">
        <h4>批量导入说明：</h4>
        <p class="text">1.导入功能不会覆盖和更新已存在的边民信息，如需修改请通过页面上的编辑功能完成更新。</p>
        <p class="text">2.首次使用如需模板请下载，根据表格格式填写边民信息。</p>
        <p class="text">
            <span>①下载表格模版，批量填写边民信息</span>
            <a :href="downloadExcel">
                <el-button type="primary" size="mini" style="margin-left: 15px;">下载</el-button>
            </a>
        </p>
        <p class="text">
            <span >②上传填写好的表格</span>
            <el-button type="primary" size="mini" style="margin-left: 15px;">上传文件</el-button>
        </p>
    </div>
</template>

<script>
import downloadExcel from 'assets/边民信息录入模板.xlsx'
export default {
    name: 'bianMinBatchImport',
    data() {
        return {
            downloadExcel: downloadExcel
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
