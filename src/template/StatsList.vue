<script setup lang="ts">
import { getProjectList } from '@/api/api';
import { TSSButton } from '@/components'
import { computed } from '@vue/reactivity';
import { defineProps, defineEmits } from 'vue'

interface Props {
    selectedProject: string
}

const props = withDefaults(defineProps<Props>(), {
    selectedProject: '',
})

const emits = defineEmits(['update:selectedProject'])

const currentProject = computed({
    get() {
        return props.selectedProject
    },
    set(v: string) {
        emits('update:selectedProject', v)
    }
})

const { result: projectList } = getProjectList()
</script>

<template>
    <div class="stats-list">
       <div class="entry-item" v-for="item in projectList" :class="{selected: item.project_name === currentProject}" @click="currentProject = item.project_name">
        {{ item.project_name }}
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
        height: 70px;
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-bottom: 16px;
        font-size: 30px;
        line-height: 38px;
        padding: 16px;
        color: #D3CFC9;

        &.selected {
            color: #ffffff;
        }
    }
}
</style>