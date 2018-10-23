<template>
    <div class="app-container">
        <el-dialog title="添加角色" width="40%" :visible.sync="componentMenuFlag">
            <div class="flexbox">
                <div class="left">
                    <el-tree :data="menuArray" show-checkbox @check="checkHandle"></el-tree>
                </div>
                <div class="right">

                </div>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            componentMenuFlag: false,
            selectedID: 0,
            menuArray: [],
        }
    },
    computed: {
        ...mapGetters([
            'permissionRoutes'
        ])
    },
    props: {
        menuFlag: {
            type: Boolean,
            default: true
        },
    },
    watch: {
       menuFlag(value) {
           this.componentMenuFlag = value
       },
       componentMenuFlag(value) {
           this.$emit('changeMenu', value)
       }
    },
    methods: {
        cancel() {
            let menuList = this.permissionRoutes.filter(item => {
                if(item.meta && item.meta.menu) {
                    return item.meta.menu
                }
            })
            this.menuArray = menuList.map(item => {
                this.selectedID ++
                if(item.children && item.children.length > 0) {
                    return {
                        label: item.meta.title,
                        name: item.name,
                        id: this.selectedID,
                        children: this.filterChildren(item.children)
                    }
                }
            })
            console.log(this.menuArray)
            this.componentMenuFlag = false
        },
        submit() {
            this.componentMenuFlag = false
        },
        filterChildren(children) {
            this.selectedID ++
            return children.filter(item => item.meta.menu == true).map(item => {
                return {
                    label: item.meta.title,
                    name: item.name,
                    id: this.selectedID
                }
            })
        },
        checkHandle(data1, data2) {
            console.log(data1)
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    .flexbox {
        display: flex;
        .left {
            flex: 1;
        }
        .right {
            flex: 1;
        }
    }
}
</style>
