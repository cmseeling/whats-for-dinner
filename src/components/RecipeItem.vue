<template>
  <v-container class="pa-2">
    <v-layout v-bind="layoutBinding">
      <v-flex md4>
        <div class="recipe-title">
          <v-btn class="recipe-title-button" flat color="primary" @click="$emit('recipe-click', recipe.id)">
            {{recipe.name}}
          </v-btn>
        </div>
      </v-flex>
      <v-flex md8>
        <v-expansion-panel>
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>
                Ingredients
              </div>
            </template>
            <v-card>
              <v-card-text>
                <ul>
                  <li class="recipe-ingredient-name" v-for="(ingredient, index) in recipe.ingredients" :key="index">
                    {{ingredient}}
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
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
  .recipe-title {
    text-align: left;
  }
</style>