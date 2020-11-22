<template>
    <div>
        <h1>this is login</h1>
        <router-link to="/home">home(页面路由)<br></router-link>
        <router-link to="/login/home2">home2（嵌套路由）</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name:'Login'
};
</script>

<style></style>