<script setup lang="ts">
import {ref} from 'vue'
import StatsDetail from './template/StatsDetail.vue'
import PersonalProfile from './template/PersonalProfile.vue'
import StatsList from './template/StatsList.vue'

const selectedItem = ref(0)
</script>

<template>
  <div class="app-main">
    <div class="left">
      <PersonalProfile/>
      <StatsList v-model:selectedItem="selectedItem"></StatsList>
    </div>
    <div class="right">
      <StatsDetail :selectedItem="selectedItem"/>
    </div>
  </div>
</template>

<style scoped>
.app-main {
  width: 1200px;
  margin: 0 auto;
  display: flex;
}
</style>
