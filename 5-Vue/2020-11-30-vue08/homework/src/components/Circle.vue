<template>
  <circle :x="moveX" y="100"></circle>
</template>

<script>
import { game } from "../init";
import { ref, onUnmounted, onMounted } from "vue";
export default {
  setup() {
    const moveX = ref(100);
    let speed = 5;
    // 组件挂在完成后小球在移动
    onMounted(() => {
      game.ticker.add(() => {
        // 让小球移动
        moveX.value += speed;
        // 小球碰到边缘会回弹
        if (moveX.value == game.view.width - 50 || moveX.value == 50) {
          speed = speed * -1;
        }
      });
    });
    // 组件销毁时需要删除循环侦听
    onUnmounted(() => {
      game.ticker.stop();
    });
    return {
      moveX,
    };
  },
};
</script>
<style></style>