<template>
  <v-layout>
    <v-flex md1>
      <DayLabels/>
    </v-flex>
    <v-flex md1 v-for="(day, index) in days" :key="index">
      <DesktopSlot :day="day" :slots="groupedSlots[index]" :setActive="setActive"/>
    </v-flex>
    <v-flex md4>
      <DesktopDetails v-if="activeSlot"
        :day="days[slots[activeSlot].dayIndex]"
        :meal="meals[slots[activeSlot].mealIndex]"
        :activeSlot="activeSlot"
        :recipeIds="slots[activeSlot].recipeIds"/>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import groupBy from 'lodash/groupBy';
import DayLabels from './DayLabels.vue';
import DesktopSlot from './DesktopSlot.vue';
import DesktopDetails from './DesktopDetails.vue';
import { IMealSlot, dayList, mealList } from '@/state/interfaces/ScheduleState';

@Component({
  components: {
    DayLabels,
    DesktopSlot,
    DesktopDetails
  }
})
export default class DesktopLayout extends Vue {
  @Prop() public slots!: IMealSlot[];
  @Prop() public activeSlot!: number;
  @Prop() public setActive!: (slotId: number) => void;
  public days = dayList;
  public meals = mealList;

  public get groupedSlots() {
    return groupBy(this.slots, 'dayIndex');
  }
}
</script>
