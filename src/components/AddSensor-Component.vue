<template>
  <div id="add-Component">
    <el-dialog title="添加新传感器" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="formData">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input type="text"
                    v-model="formData.sensorName"
                    style="width: 500px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="型号" :label-width="formLabelWidth">
          <el-input type="text"
                    v-model="formData.sensorType"
                    style="width: 200px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生产厂商" :label-width="formLabelWidth">
          <el-input type="text"
                    v-model="formData.sensorManufacturer"
                    style="width: 500px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出厂日期" :label-width="formLabelWidth">
          <el-date-picker
              v-model="formData.sensorDate"
              type="date"
              style="width: 200px"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="使用年限" :label-width="formLabelWidth">
          <el-input-number v-model="formData.sensorLife" :min="1" :max="50"
                           label="使用年限"></el-input-number>
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
  watch: {
    //   立即对dialogFormVisible进行赋值
    IsDialogShow: {
      immediate: true,
      handler() {
        this.dialogFormVisible = this.IsDialogShow;
      }
    }
  },
  props: ['IsDialogShow', 'addDataObject', 'propertyNames'],
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      formData: {
        /**
         * 传感器名称
         */
       sensorName:'',
        /**
         * 传感器类型
         */
        sensorType: '',
        /**
         * 传感器生产厂商
         */
        sensorManufacturer: '',
        /**
         * 传感器出产日期
         */
       sensorDate:'',
        /**
         * 使用年限
         */
       sensorLife:0
      },
    };
  },
  methods: {
    // 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效
    handleClose(done) {
      // 执行你的操作，例如将 dialogFormVisible 设置为 false，并通知父组件
      this.dialogFormVisible = false;
      this.$emit('newAddDialog', this.dialogFormVisible);
      done();
    },
    // 点击确定按钮
    clickSubmit() {
      //   将数据传递给父组件
      console.log("添加提交后数据", this.formData);
      // 请求添加数据
      this.addSensor();
      this.dialogFormVisible = false;
      this.$emit('newAddDialog', this.dialogFormVisible);
    },
    //  点击取消按钮
    clickEsc() {
      this.dialogFormVisible = false
      this.$emit('newAddDialog', this.dialogFormVisible);
    },
    // 添加数据对象的属性值
    addData(prop, value) {
      this.$set(this.addDataObject, prop, value);
    },
    // 重置
    resetForm() {
      this.formData = {};
    },
    // 添加传感器
    addSensor(){
      this.$axios.post('/sensor/addSensor',this.formData)
          .then(res => {
            if (res.data.code==0){
              // 请求成功，处理返回的数据
              // 返回给父组件
              this.$emit('IsAddSensor', true);
              console.log("IsAddSensor",this.res.data.data);
            }else {
              this.$emit('IsAddSensor', false);
              this.$message.error(res.data.message);
            }
          })
          .catch(error => {
            // 请求失败，处理错误
            this.$emit('IsAddSensor', false);
            console.error('Error fetching data:', error);
          });
    },
  }
}
</script>

<style scoped>
#add-Component {
}
.el-dialog {
  position: relative;
  margin: 0 auto 50px;
  background: #FFF;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
  box-sizing: border-box;
  width: 40%;
}
</style>