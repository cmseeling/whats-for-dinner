<template>
  <div class="home">
    <MealSchedule v-on:meal-slot-click="handleMealSlotSelected" />
    <v-card>
      <v-tabs fixed-tabs>
        <v-tab>Recipe List</v-tab>
        <v-tab>Random Recipe</v-tab>
        <v-tab-item>
          <RecipeList v-on:recipe-list-click="handleRecipeSelected"/>
        </v-tab-item>
        <v-tab-item>
          <RandomRecipe v-on:recipe-add-click="handleRecipeSelected"/>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import RecipeList from '@/components/RecipeList.vue'; // @ is an alias to /src
import RandomRecipe from '@/components/RandomRecipe.vue';
import MealSchedule from '@/components/MealSchedule.vue';

const scheduleModule = namespace('schedule');

@Component({
  components: {
    MealSchedule,
    RecipeList,
    RandomRecipe
  }
})
export default class Home extends Vue {
  public selectedMealSlotId: number|null = null;
  @scheduleModule.Mutation private addRecipeToMealSlot!:
    ({slotId, recipeId}: {slotId: number, recipeId: number}) => void;

  public handleRecipeSelected(recipeId: number) {
    if (this.selectedMealSlotId !== null) {
      this.addRecipeToMealSlot({slotId: this.selectedMealSlotId, recipeId});
    }
  }

  public handleMealSlotSelected(id: number|null) {
    this.selectedMealSlotId = id;
  }
}
</script>
