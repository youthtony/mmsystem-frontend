<template>
  <div id="Update-Component">
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
   export default{
     watch:{
     //   立即对dialogFormVisible进行赋值
       IsDialogShow:{
         immediate:true,
         handler(){
           this.dialogFormVisible=this.IsDialogShow;
         }
       }
     },
     props:['IsDialogShow'],
     data() {
       return {
         dialogTableVisible: false,
         dialogFormVisible: false,
         form: {
           name: '',
           region: '',
           date1: '',
           date2: '',
           delivery: false,
           type: [],
           resource: '',
           desc: ''
         },
         formLabelWidth: '120px'
       };
     },
     methods:{
       clickSubmit(){
         this.dialogFormVisible = false;
         //   将数据传递给父组件
         this.$emit('newDialog',this.dialogFormVisible);
       }
     }
   }
</script>

<style scoped>
#Update-Component {
}
</style>