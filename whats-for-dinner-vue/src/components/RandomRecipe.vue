<template>
    <div class="random-recipe card">
        <div class="random-recipe-header card-header">
            <h2 class="card-title float-left">Random Recipe</h2>
        </div>
        <div class="random-recipe-list card-body">
            <div class="container">
                <div class="row" v-if="recipe">
                    <div class="col-sm text-right">
                        <h4 class="card-title float-left font-weight-bold">{{recipe.name}}</h4>
                    </div>
                    <div class="col-sm"></div>
                    <div class="col-sm"></div>
                </div>
                <div class="row" v-if="recipe">
                    <div class="col-sm text-right font-weight-bold">Ingredients:</div>
                    <div class="col-sm">
                        <ul class="text-left">
                            <li v-for="(item, index) in recipe.ingredients" :key="index">
                                {{item}}
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm"></div>
                </div>
                <div class="row">
                    <div class="col-sm text-right">
                        <button class="btn btn-primary" @click="$emit('recipe-add-click', recipe.id)">Add</button>
                    </div>
                    <div class="col-sm text-left">
                        <button class="btn btn-warning" @click="nextRecipe">See next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import { Recipe } from '@/models/recipe';

const recipeModule = namespace('recipes');

// This is how to do it without vuex-class
// @Component({
//     computed: {
//         ...mapGetters('recipes', ['getRecipeByIndex', 'recipeCount'])
//     }
// })
@Component
export default class RandomRecipe extends Vue {
    public recipe: Recipe|null = null;
    @recipeModule.Getter private recipeCount!: number;
    @recipeModule.Getter private getRecipeByIndex!: (id: number) => Recipe;
    @recipeModule.Getter private isInitialized!: boolean;

    @Watch('isInitialized', { immediate: true })
    public onInitializedChanged(newVal: boolean, oldVal: boolean) {
        if (newVal) {
            this.nextRecipe();
        }
    }

    public nextRecipe() {
        const nextIndex = Math.floor(Math.random() * this.recipeCount);
        this.recipe = this.getRecipeByIndex(nextIndex);
    }
}
</script>

<style scoped>
    ul{
        padding: 0px;
    }

    li {
        list-style-type: none;
    }
</style>