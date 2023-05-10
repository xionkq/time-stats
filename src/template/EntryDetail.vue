<script setup lang="ts">
import { TSSHeatMap, TSSButton } from '@/components';
import { Ref, computed, ref } from 'vue';
import { useFetch } from '@vueuse/core';
import { DateTime } from "luxon";

interface Props {
    selectedItem: number
}

const props = withDefaults(defineProps<Props>(), {
    selectedItem: 0,
})

// ----- time stats data -----
const url = 'http://localhost:8000/timeData'
const { isFetching, error, data: timeData } = useFetch(url).get().json()

const timeStatsData = computed(() => {
    if (timeData.value && timeData.value?.data) {
        return timeData.value?.data as Array<any>
    }
    return null
})
// ----- time stats data end -----

// ----- clock in -----
const isClocking = ref(false)
const buttonLabel = computed(() => {
    return isClocking.value ? 'end' : 'start'
})

const now = ref(DateTime.now().toFormat('y-MM-dd HH-mm-ss'))
setInterval(() => {
    now.value = DateTime.now().toFormat('y-MM-dd HH-mm-ss')
}, 1000)

function clockIn() {
    isClocking.value = !isClocking.value
}
// ----- clock in end -----
</script>

<template>
    <div class="entry-detail">
        {{ props.selectedItem }}
        {{ now }}
        <TSSButton @click="clockIn">{{ buttonLabel }}</TSSButton>
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