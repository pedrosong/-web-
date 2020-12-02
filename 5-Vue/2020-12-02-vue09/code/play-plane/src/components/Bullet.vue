<template>
  <container>
    <sprite :texture="bulletImg"> </sprite>
  </container>
</template>

<script>
import { reactive, onMounted, onUnmounted } from "vue";
import { game } from "../game";
import bulletImg from "../assets/bullet.png";

export default {
  setup() {
    return {
      bulletImg,
    };
  },
};

export function useBullets() {
  // composition api 是特别灵活的
  // 过于灵活 你必须要有一定的设计代码的能力
  // 组织代码是有一定的要求的

  const bullets = reactive([]);
  const width = 61;
  const height = 99;

  const addBullet = (x, y) => {
    bullets.push({ x, y, width, height });
  };

  function move() {
    // 移动的逻辑
    const speed = 3;
    const handleTicker = () => {
      bullets.forEach((bullet, index) => {
        bullet.y -= speed;

        // 做判断
        // 优化点，超出屏幕的时候 删除飞机
        if (bullet.y < -100) {
          bullets.splice(index, 1);
        }
      });
    };

    // 注册一个函数在组件 mounted 的时候调用
    onMounted(() => {
      game.ticker.add(handleTicker);
    });

    onUnmounted(() => {
      game.ticker.remove(handleTicker);
    });
  }
  move();

  return {
    addBullet,
    bullets,
  };
}
</script>

<style></style>
