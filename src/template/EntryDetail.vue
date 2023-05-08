<script setup lang="ts">
interface Props {
    selectedItem: number
}

const props = withDefaults(defineProps<Props>(), {
    selectedItem: 0,
})
</script>

<template>
    <div class="entry-detail">{{ props.selectedItem }}</div>
</template>

<style scoped lang="scss">
.entry-detail {
    width: 900px;
    height: 600px;
    background-color: aquamarine;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
}
</style>