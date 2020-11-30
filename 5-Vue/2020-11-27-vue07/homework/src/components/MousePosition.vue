<template>
  <div>当前坐标为是({{ x}},{{ y }})</div>
</template>

<script>
import {mouseMove} from "./UseMouseMove";

export default {
  setup() {
    const { x, y } = mouseMove();
    return { x, y };
  },
};
</script>

<style>
</style>