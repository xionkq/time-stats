<script setup lang="ts">
import { UseNow } from '@vueuse/components'
</script>

<template>
    <div class="personal-profile">
        <UseNow v-slot="{ now, pause, resume }">
  Now: {{ now }}
  <button @click="pause()">Pause</button>
  <button @click="resume()">Resume</button>
</UseNow>
    </div>
</template>

<style scoped lang="scss">
.personal-profile {
    width: 370px;
    height: 200px;
    background-color: antiquewhite;
}
</style>
