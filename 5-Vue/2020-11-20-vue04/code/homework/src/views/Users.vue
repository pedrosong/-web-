<template>
  <div>this user: {{ $route.params.id }}</div>
</template>

<script>
export default {
//   props: ["id"],
  //   mounted() {
  //     console.log(this.$route); //打印这个可以看到路由的相关信息
  //   },
  
  watch: {
    $route() {
      console.log(this.$route);
    },
  },
  beforeRouteUpdate(){
      console.log('123')
  }
};
</script>
