<template>
  <div class="home">
    <MealSchedule v-on:meal-slot-click="handleMealSlotSelected" />
    <v-card>
      <v-tabs fixed-tabs>
        <v-tab>Recipe List</v-tab>
        <v-tab>Random Recipe</v-tab>
        <v-tab-item>
          <RecipeList v-on:recipe-list-click="handleRecipeSelected" :showEmptyPlaceholder="true"/>
        </v-tab-item>
        <v-tab-item>
          <RandomRecipe v-on:recipe-add-click="handleRecipeSelected"/>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RecipeList from '@/components/RecipeList.vue'; // @ is an alias to /src
import RandomRecipe from '@/components/RandomRecipe.vue';
import MealSchedule from '@/components/MealSchedule.vue';

interface Data {
  selectedMealSlotId: number|null;
}

export default Vue.extend({
  name: 'Home',
  components: {
    MealSchedule,
    RecipeList,
    RandomRecipe
  },
  data(): Data {
    return {
      selectedMealSlotId: null
    };
  },
  methods: {
    addRecipeToMealSlot({slotId, recipeId}: {slotId: number, recipeId: number}) {
      this.$store.commit('schedule/addRecipeToMealSlot', {slotId, recipeId});
    },
    handleRecipeSelected(recipeId: number) {
      if (this.selectedMealSlotId !== null) {
        this.addRecipeToMealSlot({slotId: this.selectedMealSlotId, recipeId});
      }
    },
    handleMealSlotSelected(id: number|null) {
      this.selectedMealSlotId = id;
    }
  }
});
</script>
