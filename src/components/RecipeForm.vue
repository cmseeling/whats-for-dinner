<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat>
        <v-toolbar-title>
          Recipe
        </v-toolbar-title>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="Name" v-model="recipe.name" />
        <div class="text-xs-left">
          <label class="font-weight-bold">Ingredients</label>
          <ul>
            <v-container v-for="(item, index) in recipe.ingredients" :key="index" tag="li" class="pa-0" fill-height>
              <v-layout align-center>
                <v-flex shrink>
                  <v-btn color="error" @click="removeIngredient(index)" icon><v-icon small>fa fa-times</v-icon></v-btn>
                </v-flex>
                <v-flex>
                  {{item}}
                </v-flex>
              </v-layout>
            </v-container>
           <v-container v-if="isAddingIngredient" tag="li" class="pa-0" fill-height>
              <v-layout align-center>
                <v-flex>
                  <v-text-field v-model="newIngredient" autofocus/>
                </v-flex>
                <v-flex shrink>
                  <v-btn color="success" @click="addIngredient">Add</v-btn>
                </v-flex>
                <v-flex shrink>
                  <v-btn color="error" @click="cancelAddIngredient">Cancel</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
            <li>
              <v-btn color="success" @click.prevent="addItem"><v-icon small>fa fa-plus</v-icon>&nbsp;Add Ingredient</v-btn>
            </li>
          </ul>
          <br/>
          <hr/>
          <br/>
          <v-container class="pa-0">
            <v-layout column>
              <v-flex>
                <v-btn color="primary" @click.prevent="saveRecipeForm">Save</v-btn>
              </v-flex>
              <v-flex>
                <v-btn color="error" v-if="isNewRecipe" @click.prevent="goBack">Cancel</v-btn>
                <v-btn color="error" v-else @click.prevent="removeRecipe">Delete</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import { Recipe } from '@/models/recipe';
import { Route } from 'vue-router';

const recipeModule = namespace('recipes');

@Component
export default class RecipeForm extends Vue {
  public recipe: Recipe = new Recipe();
  public isNewRecipe: boolean = true;
  public isAddingIngredient: boolean = false;
  public newIngredient: string = '';
  @recipeModule.Getter private getRecipeById!: (id: number) => Recipe;
  @recipeModule.Action private saveRecipe!: (recipe: Recipe) => Promise<void>;
  @recipeModule.Action private deleteRecipe!: (id: number) => Promise<void>;

  @Watch('$route', { deep: true, immediate: true })
  public onRouteChanged(newRoute: Route, oldRoute: Route) {
    if (newRoute.params.id) {
      this.recipe = this.getRecipeById(Number(newRoute.params.id));
      this.isNewRecipe = false;
    }
  }

  public addItem() {
    this.isAddingIngredient = true;
    this.$nextTick(() => {
      const input: any = this.$refs.addItemInput;
      input.focus();
    });
  }

  public addIngredient() {
    this.recipe.ingredients.push(this.newIngredient);
    this.clearNewIngredient();
  }

  public cancelAddIngredient() {
    this.clearNewIngredient();
  }

  public saveRecipeForm() {
    this.saveRecipe(this.recipe);
    this.$router.push('/recipes');
  }

  public removeRecipe() {
    if (this.recipe.id) {
      this.deleteRecipe(this.recipe.id);
    }
    this.$router.push('/recipes');
  }

  public goBack() {
    this.$router.push('/recipes');
  }

  public removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }

  private clearNewIngredient() {
    this.newIngredient = '';
    this.isAddingIngredient = false;
  }
}
</script>

<style scoped>
  li {
    list-style-type: none;
  }
</style>
