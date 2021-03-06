<template>
  <v-layout column v-touch="{left: goToNextDay, right: goToPrevDay}">
    <v-flex>
      <v-toolbar dense>
        <v-layout row>
          <v-flex xs2>
            <v-btn color="primary" class="prev-button" @click="goToPrevDay" small text icon>
              <v-icon small>fa fa-arrow-left</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs8>
            <v-toolbar-title class="mobile-day-label">
              {{days[activeDayIndex]}}
            </v-toolbar-title>
          </v-flex>
          <v-flex xs2>
            <v-btn color="primary" class="next-button" @click="goToNextDay" small text icon>
              <v-icon small>fa fa-arrow-right</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-toolbar>
    </v-flex>
    <div class="mobile-meal-slot">
      <v-flex>
        <MobileSlot
          :mealSlot="groupedSlots[activeDayIndex][0]"
          :setActive="setActive"/>
      </v-flex>
      <v-flex>
        <MobileSlot
          :mealSlot="groupedSlots[activeDayIndex][1]"
          :setActive="setActive"/>
      </v-flex>
      <v-flex>
        <MobileSlot
          :mealSlot="groupedSlots[activeDayIndex][2]"
          :setActive="setActive"/>
      </v-flex>
    </div>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import groupBy from 'lodash/groupBy';
import { Dictionary } from 'lodash';
import { dayList } from '@/state/interfaces/ScheduleState';
import { MealSlot } from '@/models/MealSlot';
import MobileSlot from '@/components/mobileScheduleLayout/MobileSlot.vue';

interface Data {
  days: string[];
  activeDayIndex: number;
}

export default Vue.extend({
  name: 'MobileLayout',
  components: {
    MobileSlot
  },
  data(): Data {
    return {
      days: dayList,
      activeDayIndex: 0
    };
  },
  computed: {
    groupedSlots(): Dictionary<MealSlot[]> {
      return groupBy(this.slots as MealSlot[], 'dayIndex');
    }
  },
  props: {
    slots: Array,
    setActive: Function
  },
  methods: {
    goToNextDay() {
      this.activeDayIndex = (this.activeDayIndex + 1) % 7;
    },
    goToPrevDay() {
      this.activeDayIndex = ((this.activeDayIndex - 1) + 7) % 7;
    }
  }
});
</script>

<style scoped>
  .mobile-meal-slot :hover {
    background-color: lightblue;
  }
</style>
