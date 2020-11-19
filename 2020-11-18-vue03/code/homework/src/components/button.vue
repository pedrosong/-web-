<template>
  <div>
    {{disbable}}
    <button
      data-test="clickBtn"
      @click="handleClick"
    >
      <slot>default btn</slot>
    </button>
  </div>
</template>

<script>
export default {
  props: ['disbable'],
  methods: {
    handleClick() {
      console.log(this.disbable)
      if (this.disbable) return;
      this.$emit('click-event');
    }
  }
}
</script>