<script setup lang="ts">
import { TSSHeatMap, TSSButton } from '@/components';
import { Ref, computed, ref } from 'vue';
import { useFetch } from '@vueuse/core';
import { DateTime } from 'luxon';
import { uploadDateData, useStatsDateData } from '@/api/api';

interface Props {
    selectedItem: number
}

const props = withDefaults(defineProps<Props>(), {
    selectedItem: 0,
})

// ----- time stats data -----
// const url = 'http://localhost:8000/timeData'
// const { isFetching, error, data: timeData } = useFetch(url).get().json()

// const timeStatsData = computed(() => {
//     if (timeData.value && timeData.value?.data) {
//         return timeData.value?.data as Array<any>
//     }
//     return null
// })

const { heatMapData: timeStatsData } = useStatsDateData()
// ----- time stats data end -----

// ----- clock in -----
const isClocking = ref(false)
const buttonLabel = computed(() => {
    return isClocking.value ? 'END' : 'START'
})

const now = ref(DateTime.now().toFormat('y-MM-dd HH-mm-ss'))
const timer: Ref<NodeJS.Timer | null> = ref(null)

function clockIn() {
    isClocking.value = !isClocking.value
    if (isClocking.value) {
        reset()
        timerStartTime.value = DateTime.now().toUnixInteger()
    timer.value = setInterval(() => {
        timerEndTime.value = DateTime.now().toUnixInteger()
    }, 1000)
    } else {
        if(timer.value) clearInterval(timer.value)
    }
}
// ----- clock in end -----

const lastChangeDate = ref('2022-01-07')
const timerStartTime = ref(0)
const timerEndTime = ref(0)

function reset() {
    timerStartTime.value = 0
    timerEndTime.value = 0
}

function upload() {
    uploadDateData({
    user_name: 'a',
    date: DateTime.now().toUnixInteger(),
    duration: timerEndTime.value - timerStartTime.value,
    message: `${timerStartTime.value}~${timerEndTime.value}`,
})
}
</script>

<template>
    <div class="entry-detail">
        <div class="stats-info">
            <TSSButton @click="clockIn">{{ buttonLabel }}</TSSButton>
            <TSSButton @click="upload" :disable="isClocking">upload</TSSButton>
            {{ props.selectedItem }}({{ lastChangeDate }})
        </div>
        <div class="timer-box">
            <div class="time">{{ DateTime.fromSeconds(timerStartTime).toFormat('HH:mm:ss') }}</div>
            ~
            <div class="time">{{ DateTime.fromSeconds(timerEndTime).toFormat('HH:mm:ss') }}</div>
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