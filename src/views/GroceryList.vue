<template>
  <div class="grocery-list">
    <v-card>
      <v-card-title>
        <v-toolbar flat>
          <v-toolbar-title>
            Grocery List
          </v-toolbar-title>
        </v-toolbar>
      </v-card-title>
      <v-card-text class="text-xs-left">
        <ul>
          <v-container v-for="(ingredient, index) in ingredientsList" :key="index" tag="li" class="pa-0" fill-height>
            <v-layout align-center>
              <v-flex shrink>
                <v-btn color="error" @click="removeIngredient(index)" icon><v-icon small>fa fa-times</v-icon></v-btn>
              </v-flex>
              <v-flex>
                {{ingredient}}
              </v-flex>
            </v-layout>
          </v-container>
          <v-container v-if="isAddingItem" tag="li" class="pa-0" fill-height>
            <v-layout align-center>
              <v-flex>
                <v-text-field v-model="newItem" autofocus/>
              </v-flex>
              <v-flex shrink>
                <v-btn color="success" @click="addIngredient">Add</v-btn>
              </v-flex>
              <v-flex shrink>
                <v-btn color="error" @click="toggleAddItem">Cancel</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <li>
            <v-btn color="success" @click.prevent="toggleAddItem"><v-icon small>fa fa-plus</v-icon>&nbsp;Add Item</v-btn>
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const recipeModule = namespace('recipes');
const scheduleModule = namespace('schedule');

@Component
export default class GroceryList extends Vue {
  public ingredientsList: string[] = [];
  public isAddingItem: boolean = false;
  public newItem: string = '';
  @scheduleModule.Getter private getAllUniqueRecipeIdsFromMealSlots!: number[];
  @recipeModule.Getter private getIngredientsFromRecipeIds!: (recipeIds: number[]) => string[];

  public mounted() {
    this.ingredientsList = this.getIngredientsFromRecipeIds(this.getAllUniqueRecipeIdsFromMealSlots);
  }

  public removeIngredient(index: number) {
    this.ingredientsList.splice(index, 1);
  }

  public addIngredient() {
    this.ingredientsList.push(this.newItem);
    this.newItem = '';
    this.isAddingItem = false;
  }

  public toggleAddItem() {
    this.isAddingItem = !this.isAddingItem;
  }
}
</script>

<style scoped>
  li {
    list-style-type: none;
  }
</style>
