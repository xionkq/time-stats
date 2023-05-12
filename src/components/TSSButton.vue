<script setup lang="ts"></script>

<template>
    <div class="tss-button">
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
}
</style>