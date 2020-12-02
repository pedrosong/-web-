<template>
  <container>
    <sprite :texture="planeImg"> </sprite>
  </container>
</template>

<script>
import planeImg from "../assets/plane.png";
import { reactive, onMounted, onUnmounted } from "vue";

export default {
  setup() {
    return {
      planeImg,
    };
  },
};

// use -> composition api
export function usePlane({ onAttack }) {
  const planeInfo = reactive({
    x: 200,
    y: 400,
    width: 258,
    height: 364,
  });

  // 键盘移动
  function move() {
    const speed = 10;
    const handleMove = (e) => {
      switch (e.code) {
        case "ArrowUp":
          // 小键盘的上
          planeInfo.y -= speed;
          break;
        case "ArrowDown":
          planeInfo.y += speed;
          break;
        case "ArrowLeft":
          planeInfo.x -= speed;
          break;
        case "ArrowRight":
          planeInfo.x += speed;
          break;
      }
    };

    onMounted(() => {
      window.addEventListener("keyup", handleMove);
    });

    onUnmounted(() => {
      window.removeEventListener("keyup", handleMove);
    });
  }

  const attack = () => {
    const handleAttack = (e) => {
      // 空格键
      if (e.code === "Space") {
        // todo attck
        //??????
        // 是不是只要给子弹数据添加值，就可以显示对应的子弹了
        // 触发回调
        if (onAttack) {
          onAttack({
            x: planeInfo.x + 100,
            y: planeInfo.y,
          });
        }
      }
    };

    onMounted(() => {
      window.addEventListener("keyup", handleAttack);
    });

    onUnmounted(() => {
      window.removeEventListener("keyup", handleAttack);
    });
  };

  move();
  attack();

  return {
    planeInfo,
  };
}
</script>

<style></style>
