<script setup lang="ts">
import { TSSButton } from '@/components'
import { computed } from '@vue/reactivity';
import { defineProps, defineEmits } from 'vue'

interface Props {
    selectedItem: number
}

const props = withDefaults(defineProps<Props>(), {
    selectedItem: 0,
})

const emits = defineEmits(['update:selectedItem'])

const currentSelectedItem = computed({
    get() {
        return props.selectedItem
    },
    set(v: Number) {
        emits('update:selectedItem', v)
    }
})
</script>

<template>
    <div class="stats-entrys">
       <div class="entry-item" v-for="i in 4" :class="{selected: i === currentSelectedItem}" @click="currentSelectedItem = i">
        {{i}}
       </div>
    </div>
</template>

<style scoped lang="scss">
.stats-entrys {
    width: 900px;
    height: 400px;
    background-color: wheat;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;

    .entry-item {
        width: 400px;
        height: 150px;
        border: 1px solid black;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &.selected {
            background-color: rgb(68, 59, 132);
        }
    }
}
</style>