<script setup lang="ts">
import {ref} from 'vue'
import EntryDetail from './template/EntryDetail.vue'
import PersonalProfile from './template/PersonalProfile.vue'
import StatsEntrys from './template/StatsEntrys.vue'

const selectedItem = ref(0)
</script>

<template>
  <div class="app-main">
    <PersonalProfile/>
    <div>
      <StatsEntrys v-model:selectedItem="selectedItem"/>
      <EntryDetail :selectedItem="selectedItem"/>
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
