<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat>
        <v-toolbar-title>
          Random Recipe
        </v-toolbar-title>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <RecipeItem v-if="recipe"
        :recipe="recipe"
        v-on:recipe-click="handleRecipeSelected"/>
      <v-container>
        <v-layout>
          <v-flex sm6 class="text-xs-right">
            <v-btn color="success" @click="$emit('recipe-add-click', recipe.id)">Add</v-btn>
          </v-flex>
          <v-flex sm6 class="text-xs-left">
            <v-btn color="warning" @click="nextRecipe">Next</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import RecipeItem from '@/components/RecipeItem.vue';
import { Recipe } from '@/models/recipe';

const recipeModule = namespace('recipes');

@Component
({
  components: {
    RecipeItem
  }
})
export default class RandomRecipe extends Vue {
  public recipe: Recipe|null = null;
  @recipeModule.Getter private recipeCount!: number;
  @recipeModule.Getter private getRecipeByIndex!: (id: number) => Recipe;
  @recipeModule.Getter private isInitialized!: boolean;

  @Watch('isInitialized', { immediate: true })
  public onInitializedChanged(newVal: boolean, oldVal: boolean) {
    if (newVal) {
      this.nextRecipe();
    }
  }

  public handleRecipeSelected(recipeId: number) {
    this.$emit('recipe-add-click', recipeId);
  }

  public nextRecipe() {
    const nextIndex = Math.floor(Math.random() * this.recipeCount);
    this.recipe = this.getRecipeByIndex(nextIndex);
  }
}
</script>

<style scoped>
  ul{
    padding: 0px;
  }

  li {
    list-style-type: none;
  }
</style>