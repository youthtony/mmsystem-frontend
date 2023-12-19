<template>
  <div id="Sensor-View">
    <div class="container">
      <TableComponent :TableData="tableData"/>
    </div>
  </div>
</template>

<script>
import TableComponent from "@/components/Table-Component.vue";
   export default{
     created() {
       this.$axios.get('/sensor/getAllSensor')
           .then(res => {
             if (res.data.code==0){
               // 请求成功，处理返回的数据
               this.tableData = res.data.data;
               console.log(this.tableData);
             }else {
               this.$message.error(res.data.message);
             }
           })
           .catch(error => {
             // 请求失败，处理错误
             console.error('Error fetching data:', error);
           });
     },
     name: 'Sensor-View',
     data(){
       return{
         tableData:[]
       }
     },
    components:{
      TableComponent
    }
   }
</script>

<style scoped>
#Sensor-View {
}
.container{
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(220, 223, 230);
}
</style>