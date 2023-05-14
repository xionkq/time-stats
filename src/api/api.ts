import { StatsDateData } from '@/type/type';
import { useFetch } from '@vueuse/core';
import { computed } from 'vue'

export function useStatsDateData() {
    const url = 'http://localhost:8000/timeData'
    const { isFetching, error, data } = useFetch(url).get().json()

    const result = computed(() => {
        if (data.value && data.value?.data) {
            return data.value?.data as Array<any>
        }
        return null
    })

    return {
        isFetching,
        error,
        result,
    }
}
// 
export function uploadDateData(date: StatsDateData) {
    const url = 'http://localhost:8000/date'
    const { data } = useFetch(url).post(date)
}