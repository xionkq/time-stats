<script setup lang="ts">
import EntryDetail from './components/EntryDetail.vue'
import PersonalProfile from './components/PersonalProfile.vue'
import StatsEntrys from './components/StatsEntrys.vue'
</script>

<template>
  <div class="app-main">
    <PersonalProfile/>
    <div>
      <StatsEntrys/>
      <EntryDetail/>
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
