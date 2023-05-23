<script setup lang="ts">
import { TSSHeatMap, TSSButton } from '@/components';
import { Ref, computed, ref } from 'vue';
import { useFetch } from '@vueuse/core';
import { DateTime, Duration } from 'luxon';
import { uploadDateData, useStatsDateData } from '@/api/api';

interface Props {
    selectedProject: string
}

const props = withDefaults(defineProps<Props>(), {
    selectedProject: '',
})

// ----- time stats data -----
const { result } = useStatsDateData()

const heatMapData = computed(() => {
        if (!result.value) {
            return null
        }
        const map = new Map<string, Array<any>>()
        result.value.filter((item) => {
            return item.project_name === props.selectedProject
        }).map((item) => {
            const date = DateTime.fromSeconds(item.date).toFormat('y-MM-dd')
            const duration = item.duration
            const v = map.get(date)
            if (v) {
                map.set(date, [date, v[1] + duration])
            } else {
                map.set(date, [date, duration])
            }
        })
        return Array.from(map.values())
    })
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
    project_name: props.selectedProject,
    date: DateTime.now().toUnixInteger(),
    duration: timerEndTime.value - timerStartTime.value,
    message: `${DateTime.fromSeconds(timerStartTime.value).toFormat('HH:mm:ss')}~${DateTime.fromSeconds(timerEndTime.value).toFormat('HH:mm:ss')}`,
})


}
</script>

<template>
    <div class="entry-detail">
        <div class="stats-info">
            <span>{{ props.selectedProject }}</span>
            <span>{{ lastChangeDate }}</span>
        </div>
        <div class="duration-box">
            <div class="duration">{{ durationStr }}</div>
            <div class="operation">
                <TSSButton primary @click="clockIn">{{ buttonLabel }}</TSSButton>
                <TSSButton info @click="upload" :disable="isClocking">upload</TSSButton>
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