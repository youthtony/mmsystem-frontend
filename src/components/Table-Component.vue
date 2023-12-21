<template>
  <div id="Table-Component">
    <el-table
        :data="TableData"
        stripe
        style="width: 100%"
        @cell-mouse-enter="handleRowClick($event)"
    >
      <el-table-column v-for="propertyName in propertyNames"
          :key="propertyName"
          :prop="propertyName"
          :label="$t(propertyName)"
          width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <el-button type="primary" @click="updateData()">修改</el-button>
        <el-button type="danger" @click="deleteData">删除</el-button>
      </el-table-column>
    </el-table>
    <UpdateComponent :IsDialogShow="dialogFormVisible" :propertyNames="propertyNames" :updateDataObject="upDataObject" @newTableData="updateToNewTableData" @newDialog="updateDialogFormVisible"/>
  </div>
</template>

<script>
import UpdateComponent from "@/components/Update-Component.vue";
import data from "bootstrap/js/src/dom/data";
export default {
  beforeDestroy() {
    // 在组件销毁前检查 dialogFormVisible 的状态
    if (this.dialogFormVisible) {
      // 如果 dialogFormVisible 为 true，则将其设置为 false
      this.dialogFormVisible = false;
    }
  },
  computed: {
    data() {
      return data
    }
  },
  components:{
    UpdateComponent
  },
  //  组件的选项
  watch: {
    TableData: {
      immediate: true, // 立即执行一次
      handler(newTableData) {
        this.initializePropertyNames(newTableData);
      },
    },
  },
  mounted() {
    // 确保 this.TableData 存在且不为空
    if (this.TableData && this.TableData.length > 0) {
      // 获取第一个数据对象
      const firstDataObject = this.TableData[0];

      // 确保第一个数据对象存在
      if (firstDataObject) {
        // 获取对象的属性名数组
        this.propertyNames = Object.keys(firstDataObject);

        // 要删除的值数组
        let valuesToDelete = ["id", "createTime", "updateTime", "isDelete"];

        // 使用 filter 创建一个新的数组，不包含要删除的值
        this.propertyNames = this.propertyNames.filter(item => !valuesToDelete.includes(item));
      }
    }
    // 初始化属性名
    this.initializePropertyNames(this.TableData);

  },
  props: ['TableData'],
  data() {
    return {
      propertyNames: [],
      dialogFormVisible: false,
      upDataId:'',
      upDataObject:{},
      deDataObject:{},//删除对象
    }
  },
  methods: {
    //  初始化属性名
    initializePropertyNames(data) {
      if (data && data.length > 0) {
        const firstDataObject = data[0];

        if (firstDataObject) {
          this.propertyNames = Object.keys(firstDataObject);
          let valuesToDelete = ["id", "createTime", "updateTime", "isDelete"];
          this.propertyNames = this.propertyNames.filter(item => !valuesToDelete.includes(item));
        }
      }
    },
    // 更新弹窗属性
    updateDialogFormVisible(newDialog){
      this.dialogFormVisible=newDialog;
    },
    updateToNewTableData(newTableData){
      // 给父组件
      this.$emit('updateTableData', newTableData);
    },
  //   点击修改按钮
    updateData() {
      // 检查TableData不为空
      if (this.TableData && this.TableData.length > 0) {
        console.log("表单数据", this.TableData);
        console.log("ID",this.upDataId);
        // 通过ID查找目标数据对象
        const targetData = this.TableData.find(item => item.id === this.upDataId);

        // 如果找到目标数据对象
        if (targetData) {
          // 将目标数据对象赋值给upDataObject
          this.upDataObject = { ...targetData };
          // 显示修改弹窗
          this.dialogFormVisible = true;
        } else {
          // 如果未找到目标数据，记录错误
          console.error(`在TableData中未找到ID为${this.upDataId}的数据`);
        }
      } else {
        // 如果TableData为空，记录错误或进行相应处理
        console.error('TableData为空');
      }
    },
  //   点击删除按钮
    deleteData(){
      this.$confirm('是否确认删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center:true
      }).then(() => {
        console.log("点击了确定",this.propertyNames[0]);
      //    发送请求删除数据
        if (this.propertyNames[0]=='sensorName'){
        //   如果是传感器
        console.log("传感器");
         this.submitDelete("/sensor/deleteSensor","sensor");
        }else {
          // 如果是煤矿
          console.log("煤矿");
          this.submitDelete("/coalMine/deleteCoalMine","coalMine");
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  //   获取这一行数据
    handleRowClick(event){
      // 将被点击的行的数据赋值给upData
      this.upDataId = event.id;
    },
    // 提交删除方法
    submitDelete(link,Name){
      console.log("删除链接",link);
      // 通过ID查找目标数据对象
      const targetData = this.TableData.find(item => item.id === this.upDataId);
      // 如果找到目标数据对象
      if (targetData) {
        // 将目标数据对象赋值给upDataObject
        this.deDataObject = { ...targetData };
        // 删除目标数据对象
        console.log("删除目标数据对象",this.deDataObject);
        this.$axios.post(link, this.deDataObject).then(res => {
          console.log("进入",res.data);
          if (res.data.code == 0) {
            // 请求成功，处理返回的数据
            if (Name=="sensor"){
              this.updateSensor();
            }else {
              this.updateCoalMine();
            }
            this.$message.success("删除成功");
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(error => {
          // 请求失败，处理错误
          console.error('Error fetching data:', error);
        });
      } else {
        // 如果未找到目标数据，记录错误
        console.error(`在TableData中未找到ID为${this.upDataId}的数据`);
      }
    },
    // 更新传感器
    updateSensor(){
      this.$axios.get('/sensor/getAllSensor')
          .then(res => {
            if (res.data.code==0){
              // 请求成功，处理返回的数据
              // todo 返回给父组件
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
              // todo 请求成功，处理返回的数据
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
#Table-Component {
}
</style>