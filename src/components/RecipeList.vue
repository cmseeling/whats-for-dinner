<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat>
        <v-toolbar-title>
          Recipes
        </v-toolbar-title>
        <v-spacer/>
        <v-text-field class="recipe-filter"
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
import Vue from 'vue';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import RecipeItem from '@/components/RecipeItem.vue';
import { IRecipe } from '@/models/recipe';

interface Data {
  searchText: string;
}

export default Vue.extend({
  name: 'RecipeList',
  components: {
    RecipeItem
  },
  data(): Data {
    return {
      searchText: ''
    };
  },
  computed: {
    getFilteredList(): (filterText: string) => IRecipe[] {
      return (filterText: string) => this.$store.getters['recipes/getFilteredList'](filterText);
    },
    filteredList(): IRecipe[] {
      return this.getFilteredList(this.searchText);
    }
  },
  methods: {
    handleRecipeSelected(recipeId: number) {
      this.$emit('recipe-list-click', recipeId);
    }
  }
});
</script>
