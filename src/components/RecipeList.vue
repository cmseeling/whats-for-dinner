<template>
  <v-card>
    <v-card-title>
      <v-toolbar>
        <v-toolbar-title>
          Recipes
        </v-toolbar-title>
        <v-spacer/>
        <v-text-field
          hide-details
          append-icon="fa-search"
          single-line
          v-model="searchText"/>
        </v-toolbar>
    </v-card-title>
    <v-card-text>
      <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Ingredients</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredList" :key="item.id">
                        <td>
                            <a href="#" @click="$emit('recipe-list-click', item.id)">{{item.name}}</a>
                        </td>
                        <td colspan="2">
                            <div class="ingredients-list">
                                <a class="btn btn-primary font-weight-bold" data-toggle="collapse" :href="`#ingredientsList-${item.id}`" role="button" aria-expanded="false" :aria-controls="`ingredientsList-${item.id}`">
                                    View Ingredients
                                </a>
                                <div class="collapse" :id="`ingredientsList-${item.id}`">
                                    <ul>
                                        <li v-for="(ingredient, index) in item.ingredients" :key="index">
                                            {{ingredient}}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import { Recipe } from '@/models/recipe';

const recipeModule = namespace('recipes');

@Component
export default class RecipeList extends Vue {
    public searchText: string = '';
    @recipeModule.Getter public getFilteredList!: (filterText: string) => Recipe[];

    public get filteredList() {
        console.log(this.searchText);
        return this.getFilteredList(this.searchText);
    }
}
</script>

<style scoped>
    .ingredients-list {
        text-align: left;
    }
</style>