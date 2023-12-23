<template>
  <div id="Socket-View" class="center-table">
    <div class="container">
      <div class="row justify-content-center">
        <div class="">
          <el-table
              :data="socketData"
              stripe
              style="width: 100%"
              @cell-mouse-enter="handleRowClick($event)"
          >
            <el-table-column
                key="gasConcentration"
                prop="gasConcentration"
                label="瓦斯浓度"
                width="180">
            </el-table-column>
            <el-table-column
                key="waterLevel"
                prop="waterLevel"
                label="水位"
                width="180">
            </el-table-column>
            <el-table-column
                key="temperature"
                prop="temperature"
                label="温度"
                width="180">
            </el-table-column>
            <el-table-column
                label="操作"
                width="180">
              <el-button type="danger" @click="deleteData">删除</el-button>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socketData: [],
      upDataId: '',
    }
  },
  mounted() {
    this.getSocketData();
    this.startDataFetchingInterval(); // 启动定时器
  },
  beforeDestroy() {
    this.clearDataFetchingInterval(); // 在组件销毁前清除定时器
  },
  methods: {
    // 获取Socket数据
    getSocketData() {
      this.$axios.get("/socket/getAllSocketData")
          .then((res) => {
            if (res.data.code == 0) {
              this.socketData = res.data.data;
              console.log(res.data.data);
            } else {
              console.log(res.data.msg);
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    // 点击删除按钮
    deleteData() {
      // 删除这一行数据
      this.$axios.post("/socket/deleteSocketData?id=" + this.upDataId)
          .then((res) => {
            if (res.data.code == 0) {
              this.$message.success('删除成功');
              this.getSocketData();
              console.log(res.data.data);
            } else {
              console.log(res.data.msg);
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    //   获取这一行数据
    handleRowClick(event) {
      // 将被点击的行的数据赋值给upData
      this.upDataId = event.id;
    },
    startDataFetchingInterval() {
      this.fetchDataInterval = setInterval(() => {
        this.getSocketData();
      }, 10000); // 每隔10秒执行一次
    },

    clearDataFetchingInterval() {
      clearInterval(this.fetchDataInterval);
    },
  }
}
</script>

<style scoped>
#Socket-View {
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(220, 223, 230);
}

.container {
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(220, 223, 230);
}
</style>