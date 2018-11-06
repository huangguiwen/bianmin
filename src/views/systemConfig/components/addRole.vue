<template>
    <div class="app-container">
        <el-dialog title="添加角色" width="40%" :visible.sync="componentMenuFlag">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
                <el-form-item label="角色名称:" prop="name">
                    <el-input placeholder="请输入角色名称" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述:">
                    <el-input type="textarea" placeholder="请输入角色描述" v-model="ruleForm.note"></el-input>
                </el-form-item>
            </el-form>
            <div class="flexbox">
                <div class="left">
                    <h4>请选择菜单权限</h4>
                    <el-tree ref="tree" :data="menuArray" node-key="id" show-checkbox @check="checkHandle"></el-tree>
                </div>
                <div class="right">
                    <h4>已选中菜单权限</h4>
                    <div class="show-box" v-for="(item, index) in showSelectedItem" :key="index">
                        <div class="text">{{ item.label }}</div>
                        <div class="remove">
                            <el-button size="mini" type="danger" @click="removeMenu(item.id)">移除</el-button>
                        </div>
                    </div>
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
import systemConfig from 'api/systemConfig'
export default {
    data() {
        return {
            componentMenuFlag: false,
            selectedArray: [],
            menuArray: [],
            ruleForm: {
                name: '',
                note: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ]
            }
        }
    },
    computed: {
        ...mapGetters([
            'permissionRoutes'
        ]),
        // 筛选出选中的子菜单，去除主菜单
        showSelectedItem() {
            return this.selectedArray.filter(item => {
                if(!item.children && !item.children > 0) {
                    return true
                }
            })
        }
    },
    props: {
        addRoleFlag: {
            type: Boolean,
            default: true
        },
    },
    watch: {
       addRoleFlag(value) {
           this.componentMenuFlag = value
       },
       componentMenuFlag(value) {
           this.$emit('addMenuChange', value)
       }
    },
    created() {
        // 获取所有可以显示的主菜单
        let menuList = this.permissionRoutes.filter(item => {
            if(item.meta && item.meta.menu) {
                return item.meta.menu
            }
        })
        this.menuArray = menuList.map(item => {
            if(item.children && item.children.length > 0) {
                return {
                    label: item.meta.title,
                    name: item.name,
                    id: item.meta.id,
                    children: this.filterChildren(item.children)
                }
            }
        })
    },
    methods: {
        cancel() {
            this.componentMenuFlag = false
        },
        submit() {
            this.ruleForm.auth_list = this.selectedArray
            systemConfig.submitAuth(this.ruleForm).then(res => {
                if(res.code == 200) {
                    this.$message.success('提交成功！')
                    this.componentMenuFlag = false
                }
            })
        },
        // 获取所有可以显示的子菜单
        filterChildren(children) {
            return children.filter(item => item.meta.menu == true).map(item => {
                return {
                    label: item.meta.title,
                    name: item.name,
                    id: item.meta.id
                }
            })
        },
        checkHandle() {
            this.selectedArray = this.$refs.tree.getCheckedNodes()
            console.log(this.selectedArray)
        },
        removeMenu(id) {
            let newSelectedArray = this.selectedArray.filter(item => {
                if(!item.children && !item.children > 0) {
                    if(item.id != id) {
                        return true
                    }
                }
            })
            this.$refs.tree.setCheckedNodes(newSelectedArray)
            this.selectedArray = this.$refs.tree.getCheckedNodes()
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
    .flexbox {
        display: flex;
        .left {
            h4 {
                text-align: center;
                margin: 0;
            }
            flex: 1;
            border: 1px solid #eee;
            margin: 5px;
            padding: 15px;
            max-height: 300px;
            overflow: auto;
        }
        .right {
            h4 {
                text-align: center;
                margin: 0;
            }
            .show-box {
                margin: 2px 0;
                display: flex;
                .text {
                    flex: 1;
                    text-align: left;
                    line-height: 28px;
                }
                .remove {
                    flex: 1;
                    text-align: right;
                }
            }
            flex: 1;
            border: 1px solid #eee;
            margin: 5px;
            padding: 15px;
            max-height: 300px;
            overflow: auto;
        }
    }
}
</style>
