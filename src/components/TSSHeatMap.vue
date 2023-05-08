<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import { useFetch } from '@vueuse/core'

let heatMap = ref(null)
let name = ref('热力图')

const url = 'http://localhost:5173/timeData'

const { isFetching, error, data: timeData } = useFetch(url)

function initChart(time: any) {
  if (!heatMap.value) {
    return
  }
  const myChart = echarts.init(heatMap.value)
  myChart.setOption({
    tooltip: {
      formatter: function (params: any) {
        return params.value[0] + ' : ' + params.value[1]
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: 5,
      inRange: {
        color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127', '#196127']
      }
    },
    calendar: {
      itemStyle: {
        color: '#ccc',
        borderWidth: 3,
        borderColor: '#fff'
      },
      cellSize: ['auto', 13],
      range: ['2022-5-17', '2023-2-17'],
      splitLine: true,
      dayLabel: {
        firstDay: 7,
        nameMap: 'ZH'
      },
      monthLabel: {
        nameMap: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'
        ]
      },
      yearLabel: {
        show: false
      },
      silent: {
        show: false
      }
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: time,
    }
  })
}

watch(isFetching, () => {
  if (timeData.value) {
    const d = JSON.parse(timeData.value.toString())    
    initChart(d.data)
  }
})
</script>

<template>
  <div class="box">
    <p>{{ name }}</p>
    <div ref="heatMap" class="about"></div>
  </div>
</template>


<style lang="scss" scoped>
.box {
  width: 37.6875rem;
  height: 11.5625rem;
  p {
    width: 281px;
    height: 19px;
    font-size: 14px;
    text-align: left;
    line-height: 20px;
    color: #777777;
    margin: 5px 0 10px 21px;
  }
}
.about {
  width: 37.6875rem;
  height: 11.5625rem;
}
</style>
