<template>
    <div class="recipe-form card">
        <div class="recipe-form-header card-header">
            <h2 class="card-title float-left">Recipe</h2>
        </div>
        <div class="recipe-form-list card-body text-left">
            <form>
                <div class="form-group">
                    <label for="recipeName" class="font-weight-bold">Name</label>
                    <input type="text" id="recipeName" v-model="recipe.name" class="form-control"/>
                </div>
                <div class="form-group">
                    <label class="font-weight-bold">Ingredients</label>
                    <table class="ml-5 mb-1">
                        <tbody>
                            <tr v-for="(item, index) in recipe.ingredients" :key="index">
                                <td>
                                    <button type="button" class="close" aria-label="Close" @click="removeIngredient(index)">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </td>
                                <td>
                                    {{item}}
                                </td>
                            </tr>
                            <tr v-if="isAddingIngredient">
                                <td></td>
                                <td>
                                    <div class="input-group">
                                        <input ref="addItemInput" id="addItemInput" v-model="newIngredient" class="form-control"/>
                                        <div class="input-group-append">
                                            <button class="btn btn-success" @click="addIngredient">Add</button>
                                            <button class="btn btn-danger" @click="cancelAddIngredient">Cancel</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button class="btn btn-primary" @click.prevent="addItem">Add Ingredient</button>
                </div>
                <hr/>
                <div class="container-fluid">
                    <div class="row">
                        <button type="submit" class="btn btn-primary col-md-1" @click.prevent="saveRecipeForm">Save</button>
                    </div>
                    <div class="row">
                        <div class="col-md-1">&nbsp;</div>
                    </div>
                    <div class="row" v-if="isNewRecipe">
                        <button class="btn btn-danger col-md-1" @click.prevent="goBack">Cancel</button>
                    </div>
                    <div class="row" v-else>
                        <button class="btn btn-danger col-md-1" @click.prevent="removeRecipe">Delete</button>
                    </div>
                </div>
            </form>
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

    .ingredient-item {
        text-align: left;
    }
</style>
