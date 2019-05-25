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
        <td class="button-cell">
          <v-btn class="meal-button" @click="toggleRow(meal)">
            {{meal}}
            <v-icon right small v-if="!panelState[meal]">fa fa-chevron-down</v-icon>
            <v-icon right small v-else>fa fa-chevron-up</v-icon>
          </v-btn>
        </td>
        <td v-for="(day, dayIndex) in days" :key="dayIndex" class="slot-cell" width="13%">
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
import Vue from 'vue';
import groupBy from 'lodash/groupBy';
import { Dictionary } from 'lodash';
import DesktopSlot from './DesktopSlot.vue';
import DesktopDetails from './DesktopDetails.vue';
import { IMealSlot, dayList, mealList } from '@/state/interfaces/ScheduleState';

interface Data {
  days: string[];
  meals: string[];
  panelState: {[index: string]: boolean};
}

export default Vue.extend({
  name: 'DesktopLayout',
  components: {
    DesktopSlot
  },
  data(): Data {
    return {
      days: dayList,
      meals: mealList,
      panelState: {
        Breakfast: false,
        Lunch: false,
        Dinner: true
      }
    };
  },
  computed: {
    groupedSlots(): Dictionary<IMealSlot[]> {
      return groupBy(this.slots as IMealSlot[], 'dayIndex');
    }
  },
  props: {
    slots: Array,
    activeSlot: Number,
    setActive: Function
  },
  methods: {
    toggleRow(meal: string) {
      this.panelState[meal] = !this.panelState[meal];
    }
  }
});
</script>

<style scoped>
  .button-cell {
    width: 185px;
    vertical-align: top;
  }

  .meal-button {
    width: 170px;
  }

  .slot-cell {
    vertical-align: top;
  }

  table {
    width: 100%;
    height: 100%;
  }

  td {
    min-height: 50px;
  }
</style>
