import { ProjectData, StatsDateData } from '@/type/type';
import { useFetch } from '@vueuse/core';
import { computed } from 'vue'
import { DateTime } from 'luxon'

export function useStatsDateData() {
    const url = 'http://localhost:8000/date/a'
    const { isFetching, error, data } = useFetch(url).get().json()

    const result = computed(() => {
        if (data.value && data.value?.data) {
            return data.value?.data as Array<StatsDateData>
        }
        return null
    })

    const heatMapData = computed(() => {
        if (!result.value) {
            return null
        }
        const map = new Map<string, Array<any>>()
        result.value.map((item) => {
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

    return {
        isFetching,
        error,
        result,
        heatMapData,
    }
}

export function uploadDateData(date: StatsDateData) {
    const url = 'http://localhost:8000/date'
    const { data } = useFetch(url).post(date)
}

export function getProjectList() {
    const url = 'http://localhost:8000/project/a'
    const { isFetching, error, data } = useFetch(url).get().json()

    const result = computed(() => {
        return data.value?.data as ProjectData[] || []
    })

    return {
        result
    }
}