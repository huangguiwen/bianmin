<template>
    <div class="app-container">
        <el-dialog title="分配边民" width="40%" :visible.sync="componentBianminFlag">
        
            <el-transfer  style="text-align: left; display: inline-block" v-model="checkedList" :data="bianminArray" 
            :titles="['请选择边民', '已选择边民']" :button-texts="['移除', '选择']" filterable ></el-transfer>
                        
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="edit">确 定</el-button>
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
            componentBianminFlag: false,
            menuId: 0,
            checkedKeys: [],
            bianminArray: [],
            checkedList:[]
        }
    },
    computed: {
        ...mapGetters([
            'permissionRoutes'
        ]),
        
    },
    props: {
        setBianminFlag: {
            type: Boolean,
            default: true
        },
        editId: {
            type: Number,
            default: 0
        }
    },
    watch: {
       setBianminFlag(value) {
           this.componentBianminFlag = value
       },
       componentBianminFlag(value) {
           this.$emit('setBianminChange', value)
       },
       editId(value) {
        this.checkedList = []
        this.bianminArray = []
        systemConfig.getAllotList().then(res => {           
            if(res.code == 200) {               
                res.data.list.map(item => {
                    let falg = item.admin_id ? true:false 
                    this.bianminArray.push({
                        key: item.id,
                        label: item.name,
                        disabled: falg
                    });
                }) 
                this.getAllot()           
            }
        })
      
       }
    },
    created() {
        
    },
    methods: {
        cancel() {           
            this.componentBianminFlag = false
        },
        edit() {
            
            let dataList = Object.assign( {
                        admin_id: this.editId,
                        ids:this.checkedList,
                    })
                console.log(dataList);
            systemConfig.allotBianmin(dataList).then(res => {
                if(res.code == 200) {
                    this.$message.success('编辑成功！')
                    this.componentBianminFlag = false
                }
            })
        },
        getAllot(){
            systemConfig.getAllotAdmin({ id: this.editId }).then(res => {
                if(res.code == 200) {               
                    let idsArr = res.data.bianmin_ids
                    if(idsArr){
                        this.checkedList = idsArr.split(',').map(item => parseInt(item))                          
                    }
                    this.bianminArray.map(i => {
                        this.checkedList.map(k => {
                            if(i.key == k){
                                i.disabled = false
                            }
                        })
                        
                    })       
                }
            })
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
