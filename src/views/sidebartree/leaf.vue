<template>
    <el-container>
        <el-header style="height: fit-content;">
             
            <el-tag type="info">节点名称:   {{currentLabel}}</el-tag>
            <el-tag type="info">创建者:     {{owner}}</el-tag>
            <el-tag type="info">节点id:     {{currentId}}</el-tag>
       

        </el-header>
        <el-main style="align-items: center;">

            <admin :NodeId="currentId"></admin>

        </el-main>
    </el-container>

</template>

<script>

import admin from "./admin.vue";


export default {
    props: ['NodeId'],

    // 组件注册
    components: {      
        admin
    },
    data() {
        return {
           currentLabel: this.$store.getters.treeObj.getCurrentNode().label,
            owner:this.$store.getters.treeObj.getCurrentNode() .owner,
           currentId:this.$store.getters.treeObj.getCurrentNode() .id,
        }


    }

}

</script>



<style lang="less" scoped>

</style>








      
      
 