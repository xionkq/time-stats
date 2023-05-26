<script setup lang="ts">
import { ref } from "vue";
import StatsDetail from "./template/StatsDetail.vue";
import Clock from "./template/Clock.vue";
import StatsList from "./template/StatsList.vue";

const selectedProject = ref("");
</script>

<template>
  <div class="app-main">
    <div class="left">
      <Clock />
      <StatsList v-model:selectedProject="selectedProject"></StatsList>
    </div>
    <div class="right">
      <StatsDetail :selectedProject="selectedProject" />
    </div>
  </div>
</template>

<style scoped>
.app-main {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  border: 1px solid #525259;
}
</style>
