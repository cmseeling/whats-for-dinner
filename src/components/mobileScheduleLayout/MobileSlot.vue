<template>
  <v-card :class="mealSlot.selected ? 'mobile-slot selected' : 'mobile-slot'" @click="setActive(mealSlot.id)">
    <v-card-title class="mobile-slot-title">
      {{meals[mealSlot.mealIndex]}}
    </v-card-title>
    <v-card-text>
      <ul>
        <v-container v-for="recipeId in mealSlot.recipeIds" :key="recipeId" tag="li" class="pa-0" fill-height>
          <v-layout align-center>
            <v-flex shrink>
              <v-btn color="error" class="recipe-list-remove-button" @click="removeFromMealSlot(recipeId)" small icon><v-icon size="10px">fa fa-times</v-icon></v-btn>
            </v-flex>
            <v-flex class="recipe-list-name">
              {{getRecipeName(recipeId)}}
            </v-flex>
          </v-layout>
        </v-container>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { IRecipe } from '@/models/recipe';
import { IMealSlot, mealList } from '@/state/interfaces/ScheduleState';

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
    getRecipeById(): (id: number) => IRecipe {
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
  li {
    list-style-type: none;
    text-align: left;
  }

  .selected {
    background-color: lightblue !important;
  }
</style>
