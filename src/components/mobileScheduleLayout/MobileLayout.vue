<template>
  <v-layout column v-touch="{left: goToPrevDay, right: goToNextDay}">
    <v-flex>
      <v-toolbar>
        <v-btn color="primary" @click="goToPrevDay">
          <v-icon small>fa fa-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>
          {{days[activeDayIndex]}}
        </v-toolbar-title>
        <v-spacer />
        <v-btn color="primary" @click="goToNextDay">
          <v-icon small>fa fa-arrow-right</v-icon>
        </v-btn>
      </v-toolbar>
    </v-flex>
    <v-flex class="mobile-meal-slot">
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
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import groupBy from 'lodash/groupBy';
import { IMealSlot, dayList } from '@/state/interfaces/ScheduleState';
import MobileSlot from '@/components/mobileScheduleLayout/MobileSlot.vue';

@Component({
  components: {
    MobileSlot
  }
})
export default class MobileLayout extends Vue {
  @Prop() public slots!: IMealSlot[];
  @Prop() public activeSlot!: number;
  @Prop() public setActive!: (slotId: number) => void;
  public days = dayList;

  public activeDayIndex: number = 0;

  public get groupedSlots() {
    return groupBy(this.slots, 'dayIndex');
  }

  public goToNextDay() {
    this.activeDayIndex = (this.activeDayIndex + 1) % 7;
  }

  public goToPrevDay() {
    this.activeDayIndex = ((this.activeDayIndex - 1) + 7) % 7;
  }
}
</script>

<style scoped>
  .mobile-meal-slot :hover {
    background-color: lightblue;
  }
</style>
