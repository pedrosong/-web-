<template>
    <div>
        <button @click="handleClick">
            <slot>default btn</slot>
        </button>
    </div>
</template>

<script>
export default {
    props:['disabled'],
    methods: {
        handleClick(){
            if(this.disabled) return;
            this.$emit('click');
            console.log('resolved')
        }
    }
}
</script>