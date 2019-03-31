<template>
    <div class="recipes card">
        <div class="recipes-header card-header">
            <h2 class="card-title float-left">Recipes</h2>
            <div class="float-right">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="recipeSearchLabel">Search:</span>
                    </div>
                    <input id="recipeSearch" aria-describedby="recipeSearchLabel" v-model="searchText" class="form-control"/>
                </div>
            </div>
        </div>
        <div class="recipes-list card-body">
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
        </div>
    </div>
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
        return this.getFilteredList(this.searchText);
    }
}
</script>

<style scoped>
    .ingredients-list {
        text-align: left;
    }
</style>