<template>
  <div id="Table-Component">
    <el-table
        :data="TableData"
        stripe
        style="width: 100%"
        @row-click="handleRowClick($event)"
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
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>
    <UpdateComponent :IsDialogShow="dialogFormVisible" @newDialog="updateDialogFormVisible"/>
  </div>
</template>

<script>
import UpdateComponent from "@/components/Update-Component.vue";
import data from "bootstrap/js/src/dom/data";
export default {
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
      upData:''
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
  //   点击修改按钮
    updateData(){
      // 将被点击的行的数据赋值给upData
      console.log(data);
      this.upData = { ...data };
      // this.dialogFormVisible = true;
    },
  //   获取这一行数据
    handleRowClick(event){
      console.log(event);
      this.upData = { ...event.id };
      console.log("你点击了这一行");
      console.log(this.upData);
    }
  }
}
</script>

<style scoped>
#Table-Component {
}
</style>