<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat v-if="!showMobileHeader">
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
      <v-toolbar flat extended v-else>
        <v-toolbar-title>
          Recipes
        </v-toolbar-title>
        <template v-slot:extension>
          <v-text-field class="recipe-filter"
            hide-details
            append-icon="fa-search"
            single-line
            v-model="searchText"/>
        </template>
      </v-toolbar>
    </v-card-title>
    <v-card-text v-if="!isLoggedIn">
      You are not logged in. Please log in to see your recipes.
    </v-card-text>
    <v-card-text v-else-if="showEmptyPlaceholder && recipeCount === 0">
      You don't have any recipes yet. Click <router-link to="/recipes">here</router-link> to add one.
    </v-card-text>
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
import { Recipe } from '@/models/Recipe';

interface Data {
  searchText: string;
}

export default Vue.extend({
  name: 'RecipeList',
  components: {
    RecipeItem
  },
  props: {
    showEmptyPlaceholder: Boolean
  },
  data(): Data {
    return {
      searchText: ''
    };
  },
  computed: {
    showMobileHeader(): boolean {
      return this.$vuetify.breakpoint.smAndDown;
    },
    getFilteredList(): (filterText: string) => Recipe[] {
      return (filterText: string) => this.$store.getters['recipes/getFilteredList'](filterText);
    },
    filteredList(): Recipe[] {
      return this.getFilteredList(this.searchText);
    },
    isLoggedIn(): boolean {
      return this.$store.getters['identity/isLoggedIn'];
    },
    recipeCount(): number {
      return this.$store.getters['recipes/recipeCount'];
    }
  },
  methods: {
    handleRecipeSelected(recipeId: number) {
      this.$emit('recipe-list-click', recipeId);
    }
  }
});
</script>
