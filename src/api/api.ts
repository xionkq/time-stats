import { ProjectData, StatsDateData } from '@/type/type';
import { useFetch } from '@vueuse/core';
import { computed } from 'vue'
import { DateTime } from 'luxon'

export function useStatsDateData() {
    const url = 'http://localhost:8000/date/a'
    const { isFetching, error, data } = useFetch(url).get().json()

    const result = computed(() => {
        return data.value?.data as StatsDateData[] || []
    })

    return {
        isFetching,
        error,
        result,
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