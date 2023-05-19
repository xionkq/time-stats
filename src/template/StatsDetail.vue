<script setup lang="ts">
import { TSSHeatMap, TSSButton } from '@/components';
import { Ref, computed, ref } from 'vue';
import { useFetch } from '@vueuse/core';
import { DateTime, Duration } from 'luxon';
import { uploadDateData, useStatsDateData } from '@/api/api';

interface Props {
    selectedItem: number
}

const props = withDefaults(defineProps<Props>(), {
    selectedItem: 0,
})

// ----- time stats data -----
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
        timerEndTime.value = DateTime.now().toUnixInteger()
    timer.value = setInterval(() => {
        timerEndTime.value = DateTime.now().toUnixInteger()
    }, 1000)
    } else {
        if(timer.value) clearInterval(timer.value)
    }
}
// ----- clock in end -----

function formatDuration(n: number) {
    return n < 10 ? `0${n}` : `${n}`
}

const lastChangeDate = ref('2022-01-07')
const timerStartTime = ref(0)
const timerEndTime = ref(0)

const durationStr = computed(() => {
    const second = timerEndTime.value - timerStartTime.value
    const dur = Duration.fromObject({ seconds: second })
    return `${formatDuration(dur.hours)}:${formatDuration(dur.minutes)}:${formatDuration(dur.seconds)}`
})

function reset() {
    timerStartTime.value = 0
    timerEndTime.value = 0
}

function upload() {
    uploadDateData({
    user_name: 'a',
    project_id: props.selectedItem,
    date: DateTime.now().toUnixInteger(),
    duration: timerEndTime.value - timerStartTime.value,
    message: `${DateTime.fromSeconds(timerStartTime.value).toFormat('HH:mm:ss')}~${DateTime.fromSeconds(timerEndTime.value).toFormat('HH:mm:ss')}`,
})


}
</script>

<template>
    <div class="entry-detail">
        <div class="stats-info">
            <span>{{ props.selectedItem }}</span>
            <span>{{ lastChangeDate }}</span>
        </div>
        <div class="duration-box">
            <div class="duration">{{ durationStr }}</div>
            <div class="operation">
                <TSSButton @click="clockIn">{{ buttonLabel }}</TSSButton>
                <TSSButton @click="upload" :disable="isClocking">upload</TSSButton>
            </div>
        </div>
        <!-- <div class="timer-box">
            <div class="time">{{ DateTime.fromSeconds(timerStartTime).toFormat('HH:mm:ss') }}</div>
            ~
            <div class="time">{{ DateTime.fromSeconds(timerEndTime).toFormat('HH:mm:ss') }}</div>
        </div> -->
        <!-- <TSSHeatMap :time-stats-data="timeStatsData"/> -->
    </div>
</template>

<style scoped lang="scss">
.entry-detail {
    width: 830px;
    height: 900px;
    padding: 35px;
    color: #D3CFC9;

    .stats-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 30px;
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

    .duration-box {
        margin-top: 100px;

        .duration {
            text-align: center;
            font-size: 50px;
            line-height: 60px;
            font-family: Oxanium;
        }

        .operation {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 40px;
            

            .tss-button {
                margin-right: 16px;
                font-size: 20px;

                &:last-of-type {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>