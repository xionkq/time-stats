<script setup lang="ts">
interface Props {
    disable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    disable: false,
})
</script>

<template>
    <div class="tss-button" :class="{disable: props.disable}">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.tss-button {
    width: 100px;
    height: 60px;
    border-radius: 16px;
    background-color: rgb(113, 180, 106);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background-color: rgb(53, 150, 56);
    }

    &.disable {
        pointer-events:none;
        opacity:0.5
    }
}
</style>