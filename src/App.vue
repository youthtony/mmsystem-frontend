<template>
  <div id="app">
    <HomeView/>
  </div>
</template>

<script>
import HomeView from "@/views/Home-View.vue";
export default {
  name: 'App',
  created() {
    document.title = '煤矿管理系统';
  },
  components: {
    HomeView
  }
}
</script>

<style>

</style>
