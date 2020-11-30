<template>
  <div>
    <div ref="div">
      <button @click="show = true">打开一个 modal</button>
    </div>

    <teleport to="body">
      <div v-show="show" class="modal">
        <Item></Item>
        <div>
          我是一个 teleport modal button
          <button @click="show = false">Close</button>
        </div>
      </div>
    </teleport>

    <teleport to="body">
      <div v-show="show" class="modal">two</div>
    </teleport>
  </div>
</template>

<script>
import { ref } from "vue";
import Item from "./Item.vue";
export default {
  components: {
    Item,
  },
  setup() {
    // teleport 允许使用多个
    // 添加 body -> 添加进去 而不是替换
    const show = ref(false);

    return {
      show,
    };
  },
};
</script>

<style lang="scss" scoped></style>
