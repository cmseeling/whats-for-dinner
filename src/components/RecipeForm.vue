<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat>
        <v-toolbar-title class="form-header">
          {{headerText}}
        </v-toolbar-title>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field class="recipe-name" label="Name" v-model="recipe.name" />
        <div class="text-xs-left">
          <label class="font-weight-bold">Ingredients</label>
          <ul>
            <v-container v-for="(item, index) in recipe.ingredients" :key="index" tag="li" class="pa-0 recipe-ingredient-item" fill-height>
              <v-layout align-center>
                <v-flex shrink>
                  <v-btn class="remove-ingredient-button" color="error" @click="removeIngredient(index)" icon><v-icon small>fa fa-times</v-icon></v-btn>
                </v-flex>
                <v-flex>
                  {{item}}
                </v-flex>
              </v-layout>
            </v-container>
            <v-container v-if="isAddingIngredient" tag="li" class="pa-0 add-ingredient-inputs" fill-height>
              <v-layout align-center>
                <v-flex>
                  <v-text-field class="add-ingredient-input" v-model="newIngredient" autofocus/>
                </v-flex>
                <v-flex shrink>
                  <v-btn class="add-ingredient-confirm" color="success" @click="addIngredient">Add</v-btn>
                </v-flex>
                <v-flex shrink>
                  <v-btn class="add-ingredient-cancel" color="error" @click="cancelAddIngredient">Cancel</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
            <li v-if="!isAddingIngredient">
              <v-btn class="add-ingredient-button" color="success" @click.prevent="addItem"><v-icon small>fa fa-plus</v-icon>&nbsp;Add Ingredient</v-btn>
            </li>
          </ul>
          <br/>
          <hr/>
          <br/>
          <v-container class="pa-0">
            <v-layout column>
              <v-flex>
                <v-btn class="save-button" color="primary" @click.prevent="saveRecipeForm">Save</v-btn>
              </v-flex>
              <v-flex>
                <v-btn class="cancel-button" color="error" v-if="isNewRecipe" @click.prevent="goBack">Cancel</v-btn>
                <v-btn class="delete-button" color="error" v-else @click.prevent="removeRecipe">Delete</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import { IRecipe, ConstructRecipe } from '@/models/recipe';
import { Route } from 'vue-router';

interface Data {
  recipe: IRecipe;
  isNewRecipe: boolean;
  isAddingIngredient: boolean;
  newIngredient: string;
}

export default Vue.extend({
  name: 'RecipeForm',
  data(): Data {
    return {
      recipe: ConstructRecipe(),
      isNewRecipe: true,
      isAddingIngredient: false,
      newIngredient: ''
    };
  },
  computed: {
    getRecipeById(): (id: number) => IRecipe {
      return (id: number) => this.$store.getters['recipes/getRecipeById'](id);
    },
    headerText(): string {
      if (this.$route.params.id) {
        return 'Recipe - Edit';
      } else {
        return 'Recipe - New';
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler(newRoute: Route, oldRoute: Route) {
        if (newRoute.params.id) {
          this.recipe = this.getRecipeById(Number(newRoute.params.id));
          this.isNewRecipe = false;
        }
      }
    }
  },
  methods: {
    saveRecipe(recipe: IRecipe) {
      this.$store.dispatch('recipes/saveRecipe', recipe);
    },
    deleteRecipe(id: number) {
      this.$store.dispatch('recipes/deleteRecipe', id);
    },
    addItem() {
      this.isAddingIngredient = true;
    },
    addIngredient() {
      this.recipe.ingredients.push(this.newIngredient);
      this.clearNewIngredient();
    },
    cancelAddIngredient() {
      this.clearNewIngredient();
    },
    saveRecipeForm() {
      this.saveRecipe(this.recipe);
      this.$router.push('/recipes');
    },
    removeRecipe() {
      if (this.recipe.id) {
        this.deleteRecipe(this.recipe.id);
      }
      this.$router.push('/recipes');
    },
    goBack() {
      this.$router.push('/recipes');
    },
    removeIngredient(index: number) {
      this.recipe.ingredients.splice(index, 1);
    },
    clearNewIngredient() {
      this.newIngredient = '';
      this.isAddingIngredient = false;
    }
  }
});
</script>

<style scoped>
  li {
    list-style-type: none;
  }
</style>
