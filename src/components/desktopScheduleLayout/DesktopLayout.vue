<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="(day, index) in days" :key="index">{{day}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(meal, mealIndex) in meals" :key="mealIndex">
        <td style="width: 185px; vertical-align: top">
          <v-btn style="width: 170px;" @click="toggleRow(meal)">
            {{meal}}
            <v-icon right small v-if="!panelState[meal]">fa fa-chevron-down</v-icon>
            <v-icon right small v-else>fa fa-chevron-up</v-icon>
          </v-btn>
        </td>
        <td v-for="(day, dayIndex) in days" :key="dayIndex" style="vertical-align: top">
          <DesktopSlot
            :expanded="panelState[meal]"
            :mealSlot="groupedSlots[dayIndex][mealIndex]"
            :setActive="setActive" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import groupBy from 'lodash/groupBy';
import DesktopSlot from './DesktopSlot.vue';
import DesktopDetails from './DesktopDetails.vue';
import { IMealSlot, dayList, mealList } from '@/state/interfaces/ScheduleState';

@Component({
  components: {
    DesktopSlot
  }
})
export default class DesktopLayout extends Vue {
  @Prop() public slots!: IMealSlot[];
  @Prop() public activeSlot!: number;
  @Prop() public setActive!: (slotId: number) => void;
  public days = dayList;
  public meals = mealList;

  public panelState: {[index: string]: boolean} = {
    Breakfast: false,
    Lunch: false,
    Dinner: true
  };

  public get groupedSlots() {
    return groupBy(this.slots, 'dayIndex');
  }

  public toggleRow(meal: string) {
    this.panelState[meal] = !this.panelState[meal];
  }
}
</script>

<style scoped>
  table {
    width: 100%;
  }

  td {
    min-height: 50px;
  }
</style>
