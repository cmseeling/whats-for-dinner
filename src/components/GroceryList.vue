<template>
  <v-card-text class="text-left">
    <v-list dense>
      <v-list-item v-if="isAddingItem" class="add-ingredient-inputs">
        <v-list-item-content>
          <v-layout align-center row wrap>
            <v-flex>
              <v-text-field class="ml-5 add-ingredient-input" label="Ingredient Name" v-model="newItem" autofocus/>
            </v-flex>
            <v-flex shrink>
              <v-btn class="add-ingredient-confirm" color="success" @click="addIngredient" small>Add</v-btn>
              <v-btn class="add-ingredient-cancel" color="error" @click="toggleAddItem" small>Cancel</v-btn>
            </v-flex>
          </v-layout>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-else>
        <v-btn class="add-ingredient-button" color="success" @click.prevent="toggleAddItem" small>
          <v-icon small class="mr-2">fa fa-plus</v-icon>Add Item
        </v-btn>
      </v-list-item>
      <LineItem v-for="(ingredient, index) in ingredientsList" :key="index" :index="index" :text="ingredient" label="Ingredient Name"
        v-on:line-item:remove="removeIngredient"
        v-on:line-item:update="updateIngredient"/>
    </v-list>
  </v-card-text>
</template>

<script lang="ts">
import Vue from 'vue';
import LineItem from '@/components/LineItem.vue';

interface Data {
  ingredientsList: string[];
  isAddingItem: boolean;
  newItem: string;
}

export default Vue.extend({
  name: 'GroceryList',
  components: {
    LineItem
  },
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
    updateIngredient({text, index}: {text: string, index: number}) {
      this.ingredientsList[index] = text;
    },
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
  .ingredient-name {
    padding-bottom: 2px;
  }

  .v-btn {
    margin: 8px;
  }
</style>
