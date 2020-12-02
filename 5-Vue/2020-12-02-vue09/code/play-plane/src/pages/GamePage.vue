<template>
  <container>
    <Map></Map>
    <Plane :x="planeInfo.x" :y="planeInfo.y"></Plane>
    <EnemyPlane
      v-for="(enemyInfo, index) in enemyPlanes"
      :key="index"
      :x="enemyInfo.x"
      :y="enemyInfo.y"
    ></EnemyPlane>

    <Bullet
      v-for="(bullet, index) in bullets"
      :key="index"
      :x="bullet.x"
      :y="bullet.y"
    ></Bullet>
  </container>
</template>

<script>
import Map from "../components/Map";
import Plane, { usePlane } from "../components/Plane";
import EnemyPlane, { useEnemyPlane } from "../components/EnemyPlane";
import Bullet, { useBullets } from "../components/Bullet";
import { hitTestObject } from "../utils";
import { game } from "../game";
import { onMounted, onUnmounted } from "vue";
export default {
  components: {
    Map,
    Plane,
    EnemyPlane,
    Bullet,
  },
  setup(props, { emit }) {
    // 响应式数据
    // 飞机进行绑定
    const { bullets, addBullet } = useBullets();
    const { planeInfo } = usePlane({
      onAttack(position) {
        console.log(position);
        addBullet(position.x, position.y);
      },
    });
    const { enemyPlanes } = useEnemyPlane();

    function useFighting() {
      const fighting = () => {
        // 2个数据
        // 敌方飞机  我方飞机
        for (let index = 0; index < enemyPlanes.length; index++) {
          const enemyInfo = enemyPlanes[index];
          if (hitTestObject(enemyInfo, planeInfo)) {
            // 如果触发了这个条件
            console.log("hit");
            // game over
            // 跳转页面
            emit("change-page", "EndPage");
          }
        }

        // 敌方飞机和我方子弹
        enemyPlanes.forEach((enemy, enemyIndex) => {
          bullets.forEach((bullet, bulletIndex) => {
            if (hitTestObject(enemy, bullet)) {
              // 如果触发了这个条件
              // 互相销毁
              // 把数据给删除掉即可
              enemyPlanes.splice(enemyIndex, 1);
              bullets.splice(bulletIndex, 1);
            }
          });
        });
      };

      onMounted(() => {
        game.ticker.add(fighting);
      });

      onUnmounted(() => {
        game.ticker.remove(fighting);
      });
    }

    useFighting();

    // 敌方飞机的数据
    // {}
    // [{},{}]
    return {
      planeInfo,
      enemyPlanes,
      bullets,
    };
  },
};
</script>

<style></style>
