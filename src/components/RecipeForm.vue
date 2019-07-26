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
        <v-text-field class="recipe-name" label="Recipe Name" v-model="recipe.name" />
        <div class="text-left">
          <label class="font-weight-bold">Ingredients</label>
          <v-list>
            <LineItem v-for="(item, index) in recipe.ingredients" :key="index" :index="index" :text="item" label="Ingredient Name"
              v-on:line-item:remove="removeIngredient"
              v-on:line-item:update="updateIngredient"/>
            <v-list-item v-if="isAddingIngredient" class="add-ingredient-inputs">
              <v-list-item-content>
                <v-layout align-center row wrap>
                  <v-flex>
                    <v-text-field class="ml-5 add-ingredient-input" label="Ingredient Name" v-model="newIngredient" autofocus @keyup.enter="addIngredient"/>
                  </v-flex>
                  <v-flex shrink>
                    <v-btn class="add-ingredient-confirm" color="success" @click="addIngredient" small>Add</v-btn>
                    <v-btn class="add-ingredient-cancel" color="error" @click="cancelAddIngredient" small>Cancel</v-btn>
                  </v-flex>
                </v-layout>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="!isAddingIngredient">
              <v-btn class="add-ingredient-button" color="success" @click.prevent="addItem" small>
                <v-icon small class="mr-2">fa fa-plus</v-icon>Add Ingredient
              </v-btn>
            </v-list-item>
          </v-list>
          <br/>
          <hr/>
          <br/>
          <v-container>
            <v-layout row>
              <v-flex>
                <v-textarea label="Instructions" auto-grow v-model="recipe.instructions"/>
              </v-flex>
            </v-layout>
          </v-container>
          <br/>
          <hr/>
          <br/>
          <v-container class="pa-0">
            <v-layout row>
              <v-flex xs1>
                <v-btn block class="save-button action-button" color="primary" @click.prevent="saveRecipeForm" small>Save</v-btn>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs1 v-if="isNewRecipe">
                <v-btn block class="cancel-button action-button" color="error" @click.prevent="goBack">Cancel</v-btn>
              </v-flex>
              <v-flex xs1 v-else>
                <v-btn block class="delete-button action-button" color="error" @click.prevent="showModel = true">Delete</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-form>
      <ConfirmDeleteDialog
        :isOpen="showModel"
        itemTypeText="recipe"
        v-on:dialog:cancel="showModel = false"
        v-on:dialog:confirm="removeRecipe"/>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import { Recipe } from '@/models/Recipe';
import { Route } from 'vue-router';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue';
import LineItem from '@/components/LineItem.vue';

interface Data {
  recipe: Recipe;
  isNewRecipe: boolean;
  isAddingIngredient: boolean;
  newIngredient: string;
  showModel: boolean;
}

export default Vue.extend({
  name: 'RecipeForm',
  components: {
    ConfirmDeleteDialog,
    LineItem
  },
  data(): Data {
    return {
      recipe: new Recipe(),
      isNewRecipe: true,
      isAddingIngredient: false,
      newIngredient: '',
      showModel: false
    };
  },
  computed: {
    getRecipeById(): (id: number) => Recipe {
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
          const storedRecipe = this.getRecipeById(Number(newRoute.params.id));

          this.recipe = {
            id: storedRecipe.id,
            name: storedRecipe.name,
            ingredients: [...storedRecipe.ingredients],
            instructions: storedRecipe.instructions
          };
          this.isNewRecipe = false;
        }
      }
    }
  },
  methods: {
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
      this.$store.dispatch('recipes/saveRecipe', this.recipe);
      this.$router.push('/recipes');
    },
    removeRecipe() {
      this.showModel = false;
      if (this.recipe.id) {
        this.$store.dispatch('recipes/deleteRecipe', this.recipe.id);
      }
      this.$router.push('/recipes');
    },
    goBack() {
      this.$router.push('/recipes');
    },
    updateIngredient({text, index}: {text: string, index: number}) {
      this.recipe.ingredients[index] = text;
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
  .v-btn {
    margin: 8px;
  }
</style>
