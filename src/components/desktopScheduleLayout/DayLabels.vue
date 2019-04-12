<template>
  <v-layout>
    <v-flex>
      <v-container>
        <v-layout column align-center>
          <div class="schedule-day"></div>
          <div class="schedule-block">
            Breakfast
          </div>
          <div class="schedule-block">
            Lunch
          </div>
          <div class="schedule-block">
            Dinner
          </div>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DayLabels extends Vue {
}
</script>
