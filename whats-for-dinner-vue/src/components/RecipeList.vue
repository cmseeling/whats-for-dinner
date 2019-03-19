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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredList" :key="item.id">
                        <td>
                            <a href="#" @click="$emit('recipe-list-click', item.id)">{{item.name}}</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import { Recipe } from '@/models/recipe';
import { mapGetters } from 'vuex';

@Component({
    computed: {
        ...mapGetters('recipes', ['getFilteredList'])
    }
})
export default class RecipeList extends Vue {
    public searchText: string = '';
    public getFilteredList!: (filterText: string) => Recipe[];

    public get filteredList() {
        return this.getFilteredList(this.searchText);
    }

//   public recipes = [
//       {
//           id: 1,
//           name: 'Green Eggs and Ham'
//       },
//       {
//           id: 2,
//           name: 'Peanut Butter Jelly Time'
//       }
//   ];

    // public get filteredList() {
    //     if (this.searchText === '') {
    //         return (this as any).recipes;
    //     } else {
    //         return filter((this as any).recipes, (recipe) => {
    //             return includes(toLower(recipe.name), toLower(this.searchText));
    //         });
    //     }
    // }
}
</script>