<script setup lang="ts">
import { TSSHeatMap, TSSButton } from '@/components';
import { Ref, computed, ref } from 'vue';
import { useFetch } from '@vueuse/core';
import { DateTime } from 'luxon';

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
    return isClocking.value ? 'END' : 'START'
})

const now = ref(DateTime.now().toFormat('y-MM-dd HH-mm-ss'))
setInterval(() => {
    now.value = DateTime.now().toFormat('y-MM-dd HH-mm-ss')
}, 1000)

function clockIn() {
    isClocking.value = !isClocking.value
}
// ----- clock in end -----

const lastChangeDate = ref('2022-01-07')
const timerStartTime = ref('00:00:00')
const timerEndTime = ref('00:00:00')
</script>

<template>
    <div class="entry-detail">
        <div class="stats-info">
            <TSSButton @click="clockIn">{{ buttonLabel }}</TSSButton>
            {{ props.selectedItem }}({{ lastChangeDate }})
        </div>
        <div class="timer-box">
            <div class="time">{{ timerStartTime }}</div>
            ~
            <div class="time">{{ timerEndTime }}</div>
        </div>
        <TSSHeatMap :time-stats-data="timeStatsData"/>
    </div>
</template>

<style scoped lang="scss">
.entry-detail {
    width: 830px;
    height: 900px;
    padding: 35px;
    background-color: aquamarine;

    .stats-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 50px;
        width: 700px;
        margin: 0 auto;

        .tss-button {
            width: 170px;
            height: 100px;
            font-size: 40px;
        }
    }

    .timer-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 650px;
        margin: 40px auto 70px;
        font-size: 40px;

        .time {
            width: 280px;
            height: 80px;
            background-color: #D9D9D9;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>