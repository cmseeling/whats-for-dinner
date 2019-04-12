<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat>
        <v-toolbar-title>
          Schedule
        </v-toolbar-title>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-container fill-height hidden-sm-and-down>
        <DesktopLayout
          :slots="augmentedSlots"
          :activeSlot="activeSlot"
          :setActive="setActive"/>
      </v-container>
      <v-container fill-height hidden-md-and-up>
        <MobileLayout
          :slots="augmentedSlots"
          :activeSlot="activeSlot"
          :setActive="setActive"/>
      </v-container>
      <div class="align-right">
            <v-btn to="/grocerylist" color="success">Generate Grocery List<v-icon small right>fa fa-arrow-right</v-icon></v-btn>
        </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import map from 'lodash/map';
import DesktopLayout from '@/components/desktopScheduleLayout/DesktopLayout.vue';
import MobileLayout from '@/components/mobileScheduleLayout/MobileLayout.vue';
import { IMealSlot } from '@/state/interfaces/ScheduleState';
import { Recipe } from '@/models/recipe';

const scheduleModule = namespace('schedule');

@Component({
  components: {
    DesktopLayout,
    MobileLayout
  }
})
export default class RecipeList extends Vue {
  public activeSlot: number|null = null;
  @scheduleModule.State public mealSlots!: IMealSlot[];

  public get augmentedSlots() {
    return map(this.mealSlots, (slot: IMealSlot) => {
      return {
        ...slot,
        selected: slot.id === this.activeSlot
      };
    });
  }

  public setActive(mealId: number) {
    if (mealId === this.activeSlot) {
      this.activeSlot = null;
      this.$emit('meal-slot-click', null);
    } else {
      this.activeSlot = mealId;
      this.$emit('meal-slot-click', mealId);
    }
  }
}
</script>

<style>
  .schedule-block {
    height: 120px;
  }

  .schedule-day {
    height: 25px;
  }

  .slot-panel {
    width: 100%;
    padding-left: 10px;
    text-align: left;
  }

  .align-right {
    text-align: right;
    margin-right: 10px;
  }

  .meal-slot {
    width: 100%;
    height: 100%;
  }

  .schedule-block :hover{
    background-color: lightblue;
  }

  .selected {
    border: 2px solid green !important;
  }
</style>