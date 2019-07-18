<template>
  <v-card>
    <v-card-title class="pb-0">
      <v-toolbar flat dense>
        <v-layout row>
          <v-flex xs4 md2>
            <v-toolbar-title class="schedule-title text-xs-left">Meal Plan</v-toolbar-title>
          </v-flex>
          <v-flex xs4 md2 offset-xs1>
            <v-text-field class="schedule-name"
              v-model="scheduleName"
              :disabled="!editScheduleName" />
          </v-flex>
          <v-flex xs1 class="pt-1">
            <v-btn class="toggle-schedule-name-button" flat right @click="toggleScheduleNameEdit">
              <v-icon small>fa fa-edit</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-toolbar>
    </v-card-title>
    <v-card-text class="pt-0">
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
      <v-layout row wrap>
        <v-flex xs-12 md-6>
          <v-layout row>
            <v-flex xs-1 class="pt-4">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">fa fa-info-circle</v-icon>
                </template>
                <span>You can save up to 10 meal plans.</span>
              </v-tooltip>
            </v-flex>
            <v-flex>
              <v-select :items="mealPlans"
                item-text="name"
                item-value="id"
                v-model="selectedPlanId"
                @change="loadMealPlan"
                class="mealplan-select"/>
            </v-flex>
            <v-flex xs-2>
              <v-btn class="schedule-save-button" color="success" @click="saveMealPlan">Save</v-btn>
              <v-btn class="schedule-delete-button" color="error" :disabled="selectedPlanId === -1" @click.prevent="showModel = true">Delete</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-spacer></v-spacer>
        <v-btn to="/groceries" color="success">Generate Grocery List<v-icon small right>fa fa-arrow-right</v-icon></v-btn>
      </v-layout>
      <ConfirmDeleteDialog
        :isOpen="showModel"
        itemTypeText="plan"
        v-on:dialog:cancel="showModel = false"
        v-on:dialog:confirm="removePlan"/>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import map from 'lodash/map';
import DesktopLayout from '@/components/desktopScheduleLayout/DesktopLayout.vue';
import MobileLayout from '@/components/mobileScheduleLayout/MobileLayout.vue';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue';
import { MealPlan } from '@/models/MealPlan';
import { MealSlot } from '@/models/MealSlot';
import { AugmentedSlot } from '@/models/AugmentedSlot';
import { CreateEmptySchedule } from '@/state/interfaces/ScheduleState';

interface Data {
  activeSlot: number|null;
  scheduleName: string;
  editScheduleName: boolean;
  selectedPlanId: number|null;
  showModel: boolean;
}

export default Vue.extend({
  name: 'MealSchedule',
  components: {
    DesktopLayout,
    MobileLayout,
    ConfirmDeleteDialog
  },
  data(): Data {
    return {
      activeSlot: null,
      scheduleName: '',
      editScheduleName: false,
      selectedPlanId: -1,
      showModel: false
    };
  },
  mounted() {
    this.scheduleName = `Week of ${this.getSunday()}`;
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
    },
    mealPlans(): MealPlan[] {
      const placeholderPlan = {
        id: -1,
        created: new Date(),
        name: 'New plan...',
        slots: CreateEmptySchedule()
      };
      return [placeholderPlan, ...this.$store.getters['mealPlans/mealPlans']];
    },
    loadButtonDisabled(): boolean {
      return this.selectedPlanId ? this.selectedPlanId < 0 : true;
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
    },

    getSunday() {
      const today = new Date();
      const diff = today.getDate() - today.getDay();
      const sunday = new Date();
      sunday.setDate(diff);
      return sunday.toLocaleDateString();
    },

    toggleScheduleNameEdit() {
      this.editScheduleName = !this.editScheduleName;
    },

    loadMealPlan() {
      if (this.selectedPlanId === -1) {
        this.scheduleName = `Week of ${this.getSunday()}`;
        this.$store.dispatch('schedule/setSchedule', CreateEmptySchedule());
      } else {
        const plan = this.$store.getters['mealPlans/getMealPlanById'](this.selectedPlanId);
        this.scheduleName = plan.name;
        this.$store.dispatch('schedule/setSchedule', plan.slots);
      }
    },

    async saveMealPlan() {
      if (this.mealPlans.length >= 10) {
        this.$store.dispatch('app/setNewErrorMessage', 'You must delete a plan before you can create a new one!');
      } else {
        const plan: MealPlan = {
          id: this.selectedPlanId === -1 ? null : this.selectedPlanId,
          name: this.scheduleName,
          created: new Date(),
          slots: this.mealSlots
        };
        this.selectedPlanId = await this.$store.dispatch('mealPlans/saveMealPlan', plan);
      }
    },

    removePlan() {
      this.showModel = false;
      this.selectedPlanId = -1;
      this.$store.dispatch('mealPlans/deleteMealPlan', this.selectedPlanId);
    }
  }
});
</script>

<style scoped>
  .schedule-title {
    height: 100%;
    line-height: 60px;
  }
</style>
