<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat color="#f5f5f5">
        <v-toolbar-title>
          Random Recipe
        </v-toolbar-title>
      </v-toolbar>
    </v-card-title>
    <v-card-text class="random-recipe-body">
      <RecipeItem v-if="recipe"
        :recipe="recipe"
        v-on:recipe-click="handleRecipeSelected"/>
      <v-container>
        <v-layout>
          <v-flex sm6 class="text-right">
            <v-btn color="success add-random-button" @click="$emit('recipe-add-click', recipe.id)">Add</v-btn>
          </v-flex>
          <v-flex sm6 class="text-left">
            <v-btn color="warning" class="next-random-recipe" @click="nextRecipe">Next</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import RecipeItem from '@/components/RecipeItem.vue';
import { Recipe } from '@/models/Recipe.ts';

interface Data {
  recipe: Recipe|null;
}

export default Vue.extend({
  name: 'RandomRecipe',
  components: {
    RecipeItem
  },
  data(): Data {
    return {
      recipe: null
    };
  },
  computed: {
    recipeCount(): number {
      return this.$store.getters['recipes/recipeCount'];
    },
    getRecipeByIndex(): (id: number) => Recipe {
      return (id: number) => this.$store.getters['recipes/getRecipeByIndex'](id);
    },
    isInitialized(): boolean {
      return this.$store.getters['recipes/isInitialized'];
    }
  },
  watch: {
    isInitialized: {
      immediate: true,
      handler(newVal: boolean, oldVal: boolean) {
        if (newVal) {
          this.nextRecipe();
        }
      }
    }
  },
  methods: {
    handleRecipeSelected(recipeId: number) {
      this.$emit('recipe-add-click', recipeId);
    },
    nextRecipe() {
      const nextIndex = Math.floor(Math.random() * this.recipeCount);
      this.recipe = this.getRecipeByIndex(nextIndex);
    }
  }
});
</script>

<style scoped>
  .add-random-button {
    margin: 0px 8px;
  }

  .next-random-recipe {
    margin: 0px 8px;
  }
</style>