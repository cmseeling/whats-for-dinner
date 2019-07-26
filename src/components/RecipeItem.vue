<template>
  <v-container class="pa-2">
    <v-layout v-bind="layoutBinding">
      <v-flex md4>
        <div class="recipe-title text-left">
          <v-btn class="recipe-title-button" text color="primary" @click="$emit('recipe-click', recipe.id)">
            {{recipe.name}}
          </v-btn>
        </div>
      </v-flex>
      <v-flex md8>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header ripple>
              Ingredients
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ul>
                <li class="recipe-ingredient-name text-left" v-for="(ingredient, index) in recipe.ingredients" :key="index">
                  {{ingredient}}
                </li>
              </ul>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';

export default Vue.extend({
  name: 'RecipeItem',
  props: {
    recipe: Object
  },
  computed: {
    layoutBinding() {
      const binding = {
        column: true
      };
      if (this.$vuetify.breakpoint.mdAndUp) {
        binding.column = false;
      }
      return binding;
    }
  }
});
</script>

<style scoped>
  .recipe-title-button {
    text-transform: none;
  }
</style>