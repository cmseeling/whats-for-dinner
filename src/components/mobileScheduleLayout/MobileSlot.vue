<template>
  <v-card :class="mealSlot.selected ? 'mobile-slot selected' : 'mobile-slot'" @click="setActive(mealSlot.id)">
    <v-card-title class="mobile-slot-title">
      {{meals[mealSlot.mealIndex]}}
    </v-card-title>
    <v-card-text>
      <v-list dense class="pa-0 recipe-list">
        <v-list-item v-for="recipeId in mealSlot.recipeIds" :key="recipeId" class="pa-0" fill-height>
          <v-list-item-icon class="ma-0">
            <v-btn color="error" class="recipe-list-remove-button" @click.stop="removeFromMealSlot(recipeId)" small text icon>
              <v-icon size="14">fa fa-times</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content class="pa-0">
            <div class="recipe-list-name text-left">
              <router-link :to="{path: `recipes/item/${recipeId}`}">{{getRecipeName(recipeId)}}</router-link>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Recipe } from '@/models/Recipe';
import { mealList } from '@/state/interfaces/ScheduleState';

interface Data {
  meals: string[];
}

export default Vue.extend({
  name: 'MobileSlot',
  data(): Data {
    return {
      meals: mealList
    };
  },
  computed: {
    getRecipeById(): (id: number) => Recipe {
      return (id: number) => this.$store.getters['recipes/getRecipeById'](id);
    }
  },
  props: {
    mealSlot: Object,
    setActive: Function
  },
  methods: {
    removeRecipeFromMealSlot({slotId, recipeId}: {slotId: number, recipeId: number}) {
      this.$store.commit('schedule/removeRecipeFromMealSlot', {slotId, recipeId});
    },
    getRecipeName(recipeId: number) {
      return this.getRecipeById(recipeId).name;
    },
    removeFromMealSlot(recipeId: number) {
      this.removeRecipeFromMealSlot({slotId: this.mealSlot.id, recipeId});
    },
  }
});
</script>

<style scoped>
  .selected, .selected .recipe-list {
    background-color: lightblue !important;
  }
</style>
