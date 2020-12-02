<template>
  <container>
    <sprite :texture="EndPageImg"></sprite>
    <sprite
      :texture="startBtnImg"
      x="255"
      y="520"
      :interactive="true"
      @click="handleClick"
    ></sprite>
  </container>
</template>

<script>
import EndPageImg from "../assets/end_page.jpg";
import startBtnImg from "../assets/restartBtn.png";
export default {
  setup(props, { emit }) {
    const handleClick = () => {
      console.log("click");
      // 怎么向父级发消息呢
      // this.$emit()
      emit("change-page", "GamePage");
    };

    return {
      EndPageImg,
      startBtnImg,
      handleClick,
    };
  },
};
</script>

<style></style>
