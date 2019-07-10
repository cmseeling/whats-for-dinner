<template>
  <v-card-text class="text-xs-left">
    <ul>
      <v-container v-for="(ingredient, index) in ingredientsList" :key="index" tag="li" class="pa-0 ingredient-container" fill-height>
        <v-layout align-center>
          <v-flex shrink>
            <v-btn class="remove-ingredient-button" color="error" @click="removeIngredient(index)" flat icon>
              <v-icon small>fa fa-times</v-icon>
            </v-btn>
          </v-flex>
          <v-flex class="ingredient-name">
            {{ingredient}}
          </v-flex>
        </v-layout>
      </v-container>
      <v-container v-if="isAddingItem" tag="li" class="pa-0 add-ingredient-inputs" fill-height>
        <v-layout align-center>
          <v-flex>
            <v-text-field class="add-ingredient-input" v-model="newItem" autofocus/>
          </v-flex>
          <v-flex shrink>
            <v-btn class="add-ingredient-confirm" color="success" @click="addIngredient" small>Add</v-btn>
          </v-flex>
          <v-flex shrink>
            <v-btn class="add-ingredient-cancel" color="error" @click="toggleAddItem" small>Cancel</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <li v-if="!isAddingItem">
        <v-btn class="add-ingredient-button" color="success" @click.prevent="toggleAddItem" small>
          <v-icon small class="mr-2">fa fa-plus</v-icon>Add Item
        </v-btn>
      </li>
    </ul>
  </v-card-text>
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {
  ingredientsList: string[];
  isAddingItem: boolean;
  newItem: string;
}

export default Vue.extend({
  name: 'GroceryList',
  data(): Data {
    return {
      ingredientsList: [],
      isAddingItem: false,
      newItem: ''
    };
  },
  computed: {
    getAllUniqueRecipeIdsFromMealSlots(): number[] {
      return this.$store.getters['schedule/getAllUniqueRecipeIdsFromMealSlots'];
    },
    getIngredientsFromRecipeIds(): (recipeIds: number[]) => string[] {
      return (recipeIds: number[]) => this.$store.getters['recipes/getIngredientsFromRecipeIds'](recipeIds);
    }
  },
  mounted() {
    this.ingredientsList = this.getIngredientsFromRecipeIds(this.getAllUniqueRecipeIdsFromMealSlots);
  },
  methods: {
    removeIngredient(index: number) {
      this.ingredientsList.splice(index, 1);
    },
    addIngredient() {
      this.ingredientsList.push(this.newItem);
      this.newItem = '';
      this.isAddingItem = false;
    },
    toggleAddItem() {
      this.isAddingItem = !this.isAddingItem;
    }
  }
});
</script>

<style scoped>
  li {
    list-style-type: none;
  }

  .ingredient-name {
    padding-bottom: 2px;
  }
</style>
