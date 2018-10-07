<template>
    <div class="select-area-container">
        <el-cascader
            @change="handleChange"
            :options="options"
            v-model="selectedOptions">
        </el-cascader>
    </div>
</template>

<script>

import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
// provinceAndCityData是省市二级联动数据（不带“全部”选项）
// regionData是省市区三级联动数据（不带“全部”选项）
// provinceAndCityDataPlus是省市区三级联动数据（带“全部”选项）
// regionDataPlus是省市区三级联动数据（带“全部”选项）
// "全部"选项绑定的value是空字符串""
// CodeToText是个大对象，属性是区域码，属性值是汉字 用法例如：CodeToText['110000']输出北京市
// TextToCode是个大对象，属性是汉字，属性值是区域码 用法例如：TextToCode['北京市'].code输出110000,TextToCode['北京市']['市辖区'].code输出110100,TextToCode['北京市']['市辖区']['朝阳区'].code输出110105
export default {
    data() {
        return {
            options: regionDataPlus,
            selectedOptions: [],
            selectedValue: ''
        }
    },
    watch: {
        value() {
            if(this.value.length != 0) {
                let valueArray = this.value.split('/')
                this.selectedOptions = [
                    TextToCode[valueArray[0]].code,
                    TextToCode[valueArray[0]][valueArray[1]].code, 
                    TextToCode[valueArray[0]][valueArray[1]][valueArray[2]].code]
            }
        }
    },
    model: {  // 使用model， 这儿2个属性，prop属性说，我要将msg作为该组件被使用时（此处为aa组件被父组件调用）v-model能取到的值，event说，我emit ‘cc’ 的时候，参数的值就是父组件v-model收到的值。
        prop: 'value',
        event: 'value'
    },
    props: {
        value: ''
    },
    methods: {
        handleChange(value) {
            this.selectedValue = []
            this.selectedValue = value.map( item => CodeToText[item])
            this.$emit('value', this.selectedValue.join('/'))
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.select-area-container {

}
</style>
