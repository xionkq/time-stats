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
    <div class="stats-list">
       <div class="entry-item" v-for="i in 4" :class="{selected: i === currentSelectedItem}" @click="currentSelectedItem = i">
        {{i}}
       </div>
    </div>
</template>

<style scoped lang="scss">
.stats-list {
    width: 370px;
    height: 700px;
    flex-wrap: wrap;
    padding: 35px;

    .entry-item {
        width: 300px;
        height: 90px;
        border: 1px solid black;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-bottom: 35px;

        &.selected {
            background-color: rgb(68, 59, 132);
        }
    }
}
</style>