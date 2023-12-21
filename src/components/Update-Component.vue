<template>
  <div id="Update-Component">
    <el-dialog title="修改数据" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="formData">
        <el-form-item v-for="item in propertyNames" :label="$t(item)" :key="item" :label-width="formLabelWidth">
          <el-input type="text"
                    v-model="formData[item]"
                    :value="updateDataObject[item]"
                    @input="updateData(item, $event)"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickEsc">取 消</el-button>
        <el-button @click="resetForm">清 空</el-button>
        <el-button type="primary" @click="clickSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {


  },
  watch: {
    //   立即对dialogFormVisible进行赋值
    IsDialogShow: {
      immediate: true,
      handler() {
        console.log("update组件被创建",this.updateDataObject);
        this.dialogFormVisible = this.IsDialogShow;
        this.formData = { ...this.updateDataObject };
      }
    }
  },
  props: ['IsDialogShow', 'updateDataObject', 'propertyNames'],
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      formData: { ...this.updateDataObject },
    };
  },
  methods: {
    // 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效
    handleClose(done) {
      // 执行你的操作，例如将 dialogFormVisible 设置为 false，并通知父组件
      this.dialogFormVisible = false;
      this.$emit('newDialog', this.dialogFormVisible);
      done();
    },
    // 点击确定按钮
    clickSubmit() {
      //   将数据传递给父组件
      console.log("修改后数据", this.formData);
      // 是否确认修改
      this.$confirm('是否确认修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center:true
      }).then(() => {
        // 提交给数据库
        if (this.propertyNames[0]=='sensorName'){
          //提交给传感器服务
          this.$axios.post('/sensor/updateSensor', this.formData).then(res => {
            console.log(res.data);
            if (res.data.code == 0) {
              // 请求成功，处理返回的数据
              this.updateSensor();
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.data.message);
            }
          }).catch(error => {
            // 请求失败，处理错误
            console.error('Error fetching data:', error);
          });
        }else {
          // 提交给煤矿服务
          this.$axios.post('/coalMine/updateCoalMine', this.formData).then(res => {
            console.log(res.data);
            if (res.data.code == 0) {
              // 请求成功，处理返回的数据
              this.updateCoalMine();
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.data.message);
            }
          }).catch(error => {
            // 请求失败，处理错误
            console.error('Error fetching data:', error);
          });
        }
      }).catch(() => {
        // 恢复数据
        this.formData = { ...this.updateDataObject };
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
      this.dialogFormVisible = false;
      this.$emit('newDialog', this.dialogFormVisible);
    },
    //  点击取消按钮
    clickEsc() {
      this.dialogFormVisible = false
      this.$emit('newDialog', this.dialogFormVisible);
    },
    // 更新数据对象的属性值
    updateData(prop, value) {
      this.$set(this.updateDataObject, prop, value);
    },
    // 重置
    resetForm() {
      this.formData = {};
    },
    // 更新传感器
    updateSensor(){
      this.$axios.get('/sensor/getAllSensor')
          .then(res => {
            if (res.data.code==0){
              // 请求成功，处理返回的数据
              // 返回给父组件
              this.$emit('newTableData', res.data.data);
              console.log(this.res.data.data);
            }else {
              this.$message.error(res.data.message);
            }
          })
          .catch(error => {
            // 请求失败，处理错误
            console.error('Error fetching data:', error);
          });
    },
    // 更新煤矿
    updateCoalMine(){
      this.$axios.get('/coalMine/getAllCoalMine')
          .then(res => {
            if (res.data.code==0){
              // 请求成功，处理返回的数据
              console.log(res.data.data);
              this.$emit('newTableData', res.data.data);
            }else {
              this.$message.error(res.data.message);
            }
          })
          .catch(error => {
            // 请求失败，处理错误
            console.error('Error fetching data:', error);
          });
    }
  }
}
</script>

<style scoped>
#Update-Component {
}
</style>