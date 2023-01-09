<template>

    <div>
        <el-button type="primary" plain size="mini" @click="showNasDialog">Nas信息</el-button>

        <!--数据库信息的对话框-->
        <el-dialog title="数据库信息" :visible.sync="NasDialogVisible" width="50%" :append-to-body="true">
            <!--主体区域-->
            <el-card>
                <el-button type="primary" @click="addDialogVisible = true">添加客户端(Nas)</el-button>
                <!--用户列表区域-->
                <el-table :data="userList" border stripe>
                    <el-table-column label="id" prop="id"></el-table-column>
                    <el-table-column label="nasname" prop="nasname"></el-table-column>
                    <el-table-column label="shortname" prop="shortname"></el-table-column>
                    <el-table-column label="type" prop="type"></el-table-column>
                    <el-table-column label="ports" prop="ports"></el-table-column>
                    <el-table-column label="secret" prop="secret"></el-table-column>
                    <el-table-column label="server" prop="server"></el-table-column>
                    <el-table-column label="community" prop="community"></el-table-column>
                    <el-table-column label="description" prop="description"></el-table-column>
                    <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">

                        <!-- 删除按钮 -->
                        
                            <el-tooltip effect="dark" content="删除" placement="top-start" :enterable="false">
                                <el-button type="danger" icon="el-icon-delete" size="mini"
                                    @click="removeUserById(scope.$index)">
                                </el-button>
                            </el-tooltip>
                       

                    </template>
                </el-table-column>
                </el-table>
            </el-card>
            <!--底部区域-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="NasDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="NasDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <div>
            <!--添加Nas的对话框-->
            <el-dialog title="添加Nas" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed"
                :append-to-body="true">

                <!--主体区域-->
                <el-form :model="addForm" label-width="200px" :rules="addFormRules" ref="addFormRef">
                    <el-form-item label="nasname" prop="nasname">
                        <el-input v-model="addForm.nasname"></el-input>
                    </el-form-item>
                    <el-form-item label="shortname" prop="shortname">
                        <el-input v-model="addForm.shortname"></el-input>
                    </el-form-item>
                    <el-form-item label="type" prop="type">
                        <el-input v-model="addForm.type"></el-input>
                    </el-form-item>
                    <el-form-item label="ports" prop="ports">
                        <el-input v-model="addForm.ports"></el-input>
                    </el-form-item>
                    <el-form-item label="secret" prop="secret">
                        <el-input v-model="addForm.secret"></el-input>
                    </el-form-item>
                    <el-form-item label="server" prop="server">
                        <el-input v-model="addForm.server"></el-input>
                    </el-form-item>
                    <el-form-item label="community" prop="community">
                        <el-input v-model="addForm.community"></el-input>
                    </el-form-item>
                    <el-form-item label="description" prop="description">
                        <el-input v-model="addForm.description"></el-input>
                    </el-form-item>
                </el-form>


                <!--底部区域-->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
            </el-dialog>


        </div>


    </div>
</template>
  
<script>

import { AddNas, DeleteNas, UpdateNas, GetNas } from '@/api/globalDialog'

export default {


    data() {
        // 检查ports是否纯数字
        var checkports = (rule, value, cb) => {
            const regMobile = /^[0-9]*$/
            if (regMobile.test(value)) {
                return cb()
            }
            cb(new Error('请输入纯数字'))
        }
        return {

            userList: [],

            // 控制添加用户对话框显示与隐藏
            addDialogVisible: false,
            NasDialogVisible: false,
            addForm: {
                
                nasname:'',
                shortname:'',
                type:'',
                ports:'',
                secret:'',
                server:'',
                community:'',
                description:'',
            },

  // 添加表单验证规则对象
  addFormRules: {
                nasname: [                   
                    {
                        min: 0,
                        max: 64,
                        message: 'Nas名的长度在0-64个字符之间',
                        trigger: 'blur'
                    }
                ],
                shortname: [
                 
                    {
                        min: 0,
                        max: 16,
                        message: '缩略名的长度在0-16个字符之间',
                        trigger: 'blur'
                    }
                ],
                type: [
                  
                    {
                        min: 0,
                        max: 15,
                        message: 'Nas类型的长度在0-15个字符之间',
                        trigger: 'blur'
                    }

                ],
                ports: [
                   
                    {
                        validator: checkports,
                        trigger: 'blur'
                    }                 
                  
                ],
                secret: [
                    {
                        required: true,
                        message: '请输入Nas共享密钥',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 30,
                        message: 'Nas共享密钥的长度在1-30个字符之间',
                        trigger: 'blur'
                    }
                ],
                community: [
                    {
                        min: 0,
                        max: 25,
                        message: '社团名的长度在0-25个字符之间',
                        trigger: 'blur'
                    }

                ],
                description: [               
                    {
                        min: 0,
                        max: 100,
                        message: '描述的长度在0-100个字符之间',
                        trigger: 'blur'
                    }
                ],
            },
            

        }
    },


    methods: {

        //获取用户列表
        getUserList() {

            GetNas().then(
                Response => {
                    console.log("after GetNas:Response.data.data", Response.data.data)
                    this.userList = Response.data.data;

                }).catch(err => console.log("GetNas error:", err))

            console.log("after GetNas");
        },


        showNasDialog() {
            this.NasDialogVisible = true;
            this.getUserList();
        },

        // 监听添加用户对话框的关闭事件
        async addDialogClosed() {
            // 重置表单
            this.$refs.addFormRef.resetFields()
        },

        // 点击按钮，添加新用户
        addUser() {
            this.$refs.addFormRef.validate(async valid => {
                if (!valid) return
                // 可以发起添加用户的网络请求


                console.log("AddNas: this.addForm", this.addForm)

                AddNas(this.addForm)
                    .then(Response => {
                        console.log("AddNas finish")
                        // 添加成功
                        this.$message.success("添加成功")
                        // 隐藏弹出框
                        this.addDialogVisible = false;
                        // 刷新用户列表
                        this.getUserList()
                    }).catch(err => {
                        console.log(err);
                    })

            })

            console.log("after AddNas");
        },


        // 根据id删除对应的用户信息
        async removeUserById(id) {
            // 弹框提示用户是否删除
            const confirmResult = await this.$confirm(
                '此操作将删除该域, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).catch(err => err)
            // 如果用户确认删除，则返回字符串 confirm
            // 如果用户取消删除，则返回字符串 cancel
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除')
            }

            DeleteNas(this.userList[id].id)
                .then(Response => {
                    console.log("DeleteNas finish")
                    // 更新成功
                    this.$message.success('删除成功')

                    // 刷新用户列表
                    this.getUserList()

                }).catch(err => {
                    console.log(err);
                })
            console.log("after DeleteNas");

        }
    }
}

</script>
  
  