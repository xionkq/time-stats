<script setup lang="ts">
interface Props {
    disable?: boolean
    default?:boolean
    primary?:boolean
    info?:boolean
}

const props = withDefaults(defineProps<Props>(), {
    disable: false,
    default: true,
    primary: false,
    info: false,
})
</script>

<template>
    <div class="tss-button" :class="{disable: props.disable, default: props.default, primary: props.primary, info: props.info}">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.tss-button {
    width: 95px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.disable {
        pointer-events:none;
        opacity:0.5
    }

    &.default {
        background-color: rgb(113, 180, 106);

        &:hover {
            background-color: rgb(53, 150, 56);
        }
    }

    &.primary {
        background-color: #0073B1;

        &:hover {
            background-color: #2182b6;
        }
    }

    &.info {
        background-color: #3B8B5A;

        &:hover {
            background-color: #588e6c;
        }
    }
}
</style>