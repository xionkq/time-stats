<script setup lang="ts">
import { computed, ref } from 'vue';
import { DateTime } from 'luxon';

const now = ref(DateTime.now())
const timer = setInterval(() => {
    now.value = DateTime.now()
}, 1000)

const hourTransformTurn = computed(() => {
    const hour = now.value.hour
    return hour / 60
})

const minuteTransformTurn = computed(() => {
    const minute = now.value.minute
    return minute / 60
})
</script>

<template>
    <div class="clock">
        <div class="clock-box">
            <div class="hour-hand" :style="{ transform: `rotate(${hourTransformTurn}turn)` }"></div>
            <div class="minute-hand" :style="{ transform: `rotate(${minuteTransformTurn}turn)` }"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.clock {
    width: 370px;
    height: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px 35px;

    .clock-box {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #D9D9D9;
        position: relative;

        .hour-hand {
            position: absolute;
            width: 4px;
            height: 30px;
            background-color: black;
            top: 20px;
            left: 48px;
            transform-origin: bottom;
            transform: rotate(0.25turn);
        }
        
        .minute-hand {
            position: absolute;
            width: 4px;
            height: 40px;
            background-color: black;
            top: 10px;
            left: 48px;
            transform-origin: bottom;
            
        }
    }
}
</style>
