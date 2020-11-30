import {
    reactive,
    onMounted,
    onUnmounted,
    toRefs
} from 'vue';

export function mouseMove() {
    const position = reactive({
        x: 0,
        y: 0,
    })

    const handleMouseMove = (e) => {
        // console.log(e)
        position.x = e.pageX;
        position.y = e.pageY;
    }

    onMounted(() => {
        window.addEventListener("mousemove", handleMouseMove)
    })

    onUnmounted(() => {
        window.removeEventListener("mousemove", handleMouseMove)
    })

    return toRefs(position);

}