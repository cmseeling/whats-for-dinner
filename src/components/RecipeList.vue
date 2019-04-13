<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat>
        <v-toolbar-title>
          Recipes
        </v-toolbar-title>
        <v-spacer/>
        <v-text-field
          hide-details
          append-icon="fa-search"
          single-line
          v-model="searchText"/>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <RecipeItem
        v-for="recipe in filteredList"
        :key="recipe.id"
        :recipe="recipe"
        v-on:recipe-click="handleRecipeSelected"/>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import RecipeItem from '@/components/RecipeItem.vue';
import { Recipe } from '@/models/recipe';

const recipeModule = namespace('recipes');

@Component({
  components: {
    RecipeItem
  }
})
export default class RecipeList extends Vue {
  public searchText: string = '';
  @recipeModule.Getter public getFilteredList!: (filterText: string) => Recipe[];

  public get filteredList() {
    return this.getFilteredList(this.searchText);
  }

  public handleRecipeSelected(recipeId: number) {
    this.$emit('recipe-list-click', recipeId);
  }
}
</script>
