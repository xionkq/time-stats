<script setup lang="ts">
import { TSSHeatMap } from '@/components';
import { computed } from '@vue/reactivity';
import { useFetch } from '@vueuse/core'

interface Props {
    selectedItem: number
}

const props = withDefaults(defineProps<Props>(), {
    selectedItem: 0,
})

const url = 'http://localhost:5173/timeData'
const { isFetching, error, data: timeData } = useFetch(url).get().json()

const timeStatsData = computed(() => {
    if (timeData.value && timeData.value?.data) {
        return timeData.value?.data as Array<any>
    }
    return null
})
</script>

<template>
    <div class="entry-detail">
        {{ props.selectedItem }}
        <TSSHeatMap :time-stats-data="timeStatsData"/>
    </div>
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