<template>
  <div>
      用户列表
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <el-row :gutter="25">
          <el-col :span="10">
          <el-input placeholder="请输入搜素内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          </el-col>
          <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
          </el-col>
        </el-row>
        
        <el-table :data="userList" border :stripe="true">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="邮箱" prop="email"></el-table-column>
          <el-table-column label="密码" prop="password"></el-table-column>
          <el-table-column label="角色" prop="role"></el-table-column>
          <el-table-column label="状态" prop="state">
            <!-- 作用域插槽 -->
            <template slot-scope="scope">
              <el-switch v-model="scope.row.state"></el-switch>
              
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
            <!-- 权限 -->
            <el-tooltip effect="dark" content="分配权限" placement="top-start" :enterable="false"><!--文字提示 enterable 隐藏-->
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[1, 2, 5, 100]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-card>
  </div>
</template>

<script>
export default {
  created(){
    this.getUserList()
  },
  data(){
    return{
        queryInfo:{
          query:"",
          pageNum:1,
          pageSize:5
        },
        userList: [],
        total: 0,
    }
  },
  methods:{
    async getUserList(){
      const {data: res} = await this.$http.get("/allUser", {params:this.queryInfo});
      this.userList = res.data; //用户列表数据
      this.total = res.numbers; // 总用户数封装
    },
    handleSizeChange(newSize){
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    handleCurrentChange(newPage){
      this.queryInfo.pageNum = newPage;
      this.getUserList();
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb{
  font-size: 17px;
  margin-bottom: 15px;
}
</style>