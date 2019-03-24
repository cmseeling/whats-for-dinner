<template>
  <div class="home container-fluid">
    <AppNav/>
    <MealSchedule v-on:meal-slot-click="handleMealSlotSelected" />
    <div class="card">
      <div class="card-body">
        <ul class="nav nav-tabs" id="recipeTabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="recipeList-tab" data-toggle="tab" href="#recipeList" role="tab" aria-controls="recipeList" aria-selected="true">Recipe List</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="randomRecipe-tab" data-toggle="tab" href="#randomRecipe" role="tab" aria-controls="randomRecipe" aria-selected="false">Random Recipe</a>
          </li>
        </ul>
        <div class="tab-content" id="recipeTabsContent">
          <div class="tab-pane fade show active" id="recipeList" role="tabpanel" aria-labelledby="recipeList-tab">
            <RecipeList v-on:recipe-list-click="handleRecipeSelected"/>
          </div>
          <div class="tab-pane fade" id="randomRecipe" role="tabpanel" aria-labelledby="randomRecipe-tab">
            <RandomRecipe v-on:recipe-add-click="handleRecipeSelected"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RecipeList from '@/components/RecipeList.vue'; // @ is an alias to /src
import RandomRecipe from '@/components/RandomRecipe.vue';
import MealSchedule from '@/components/MealSchedule.vue';
import AppNav from '@/components/AppNav.vue';
import { mapMutations } from 'vuex';

@Component({
  components: {
    MealSchedule,
    RecipeList,
    RandomRecipe,
    AppNav
  },
  methods: {
    ...mapMutations('schedule', ['addRecipeToMealSlot'])
  }
})
export default class Home extends Vue {
  public selectedMealSlotId: number|null = null;
  private addRecipeToMealSlot!: ({slotId, recipeId}: {slotId: number, recipeId: number}) => void;

  public handleRecipeSelected(recipeId: number) {
    console.log(recipeId);
    if (this.selectedMealSlotId !== null) {
      this.addRecipeToMealSlot({slotId: this.selectedMealSlotId, recipeId});
    }
  }

  public handleMealSlotSelected(id: number|null) {
    this.selectedMealSlotId = id;
  }
}
</script>
