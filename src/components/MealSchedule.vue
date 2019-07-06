<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat>
        <v-toolbar-title class="schedule-title">
          Schedule
        </v-toolbar-title>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-container fill-height hidden-sm-and-down>
        <DesktopLayout
          :slots="augmentedSlots"
          :setActive="setActive"/>
      </v-container>
      <v-container fill-height hidden-md-and-up>
        <MobileLayout
          :slots="augmentedSlots"
          :setActive="setActive"/>
      </v-container>
      <div class="align-right">
            <v-btn to="/groceries" color="success">Generate Grocery List<v-icon small right>fa fa-arrow-right</v-icon></v-btn>
        </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import map from 'lodash/map';
import DesktopLayout from '@/components/desktopScheduleLayout/DesktopLayout.vue';
import MobileLayout from '@/components/mobileScheduleLayout/MobileLayout.vue';
import { MealSlot } from '@/models/MealSlot';
import { AugmentedSlot } from '@/models/AugmentedSlot';

interface Data {
  activeSlot: number|null;
}

export default Vue.extend({
  name: 'RecipeList',
  components: {
    DesktopLayout,
    MobileLayout
  },
  data(): Data {
    return {
      activeSlot: null
    };
  },
  computed: {
    mealSlots(): MealSlot[] {
      return this.$store.state.schedule.mealSlots;
    },
    augmentedSlots(): AugmentedSlot[] {
      return map(this.mealSlots, (slot: MealSlot) => {
        return {
          ...slot,
          selected: slot.id === this.activeSlot
        };
      });
    }
  },
  methods: {
    setActive(slotId: number) {
      if (slotId === this.activeSlot) {
        this.activeSlot = null;
        this.$emit('meal-slot-click', null);
      } else {
        this.activeSlot = slotId;
        this.$emit('meal-slot-click', slotId);
      }
    }
  }
});
</script>
