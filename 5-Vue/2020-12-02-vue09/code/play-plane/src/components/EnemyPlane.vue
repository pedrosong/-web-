<template>
  <container>
    <sprite :texture="EnemyImg"> </sprite>
  </container>
</template>

<script>
import EnemyImg from "../assets/enemy.png";
import { game } from "../game";
import { onMounted, onUnmounted, reactive } from "vue";

export default {
  setup() {
    return {
      EnemyImg,
    };
  },
};

export function useEnemyPlane() {
  const enemyPlanes = reactive([
    {
      x: 50,
      y: 100,
      width: 308,
      height: 207,
    },
    {
      x: 150,
      y: 120,
      width: 308,
      height: 207,
    },
  ]);

  // 飞机移动逻辑
  // eslint-disable-next-line no-unused-vars
  function move() {
    // 移动的逻辑
    const speed = 3;
    const handleTicker = () => {
      enemyPlanes.forEach((enemy, index) => {
        enemy.y += speed;

        // 做判断
        // 优化点，超出屏幕的时候 删除飞机
        if (enemy.y > 1100) {
          enemyPlanes.splice(index, 1);
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

  // move();

  return {
    enemyPlanes,
  };
}
</script>

<style></style>
