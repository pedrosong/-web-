<template>
  <container>
    <sprite :texture="mapImg" :y="moveY1"> </sprite>
    <sprite :texture="mapImg" :y="moveY2"></sprite>
  </container>
</template>

<script>
import { ref } from "vue";
import mapImg from "../assets/map.jpg";
import { game } from "../game";
export default {
  setup() {
    // 坐标
    // y
    const viewHeight = 1080;
    const moveY1 = ref(0);
    const moveY2 = ref(-viewHeight);

    const speed = 5;
    game.ticker.add(() => {
      // 只需要修改数据即可
      moveY1.value += speed;
      moveY2.value += speed;

      if (moveY1.value >= viewHeight) {
        moveY1.value = -viewHeight;
      }

      if (moveY2.value >= viewHeight) {
        moveY2.value = -viewHeight;
      }
    });

    return {
      mapImg,
      moveY1,
      moveY2,
    };
  },
};
</script>

<style></style>
