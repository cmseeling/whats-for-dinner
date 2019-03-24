<template>
    <div class="recipe-form card">
        <div class="recipe-form-header card-header">
            <h2 class="card-title float-left">Recipe</h2>
        </div>
        <div class="recipe-form-list card-body text-left">
            <form>
                <div class="form-group">
                    <label for="recipeName">Name</label>
                    <input type="text" id="recipeName" v-model="recipe.name" class="form-control"/>
                </div>
                <div class="form-group">
                    <label>Ingredients</label>
                    <ul>
                        <li v-for="(item, index) in recipe.ingredients" :key="index">
                            {{item}}
                        </li>
                        <li v-if="isAddingIngredient">
                            <div class="input-group">
                                <input ref="addItemInput" id="addItemInput" v-model="newItem" class="form-control"/>
                                <div class="input-group-append">
                                    <button class="btn btn-success" @click="addIngredient">Add</button>
                                    <button class="btn btn-danger" @click="cancelAddIngredient">Cancel</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <button class="btn btn-primary" @click.prevent="addItem">Add Ingredient</button>
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="saveRecipe">Save</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import { Recipe } from '@/models/recipe';
import { mapGetters } from 'vuex';
import { Route } from 'vue-router';

@Component({
    computed: {
        ...mapGetters('recipes', ['getRecipeById'])
    }
})
export default class RecipeForm extends Vue {
    public recipe: Recipe = new Recipe();
    public isAddingIngredient: boolean = false;
    public newItem: string = '';
    private getRecipeById!: (id: number) => Recipe;

    @Watch('$route', { deep: true, immediate: true })
    public onRouteChanged(newRoute: Route, oldRoute: Route) {
        if (newRoute.params.id) {
            this.recipe = this.getRecipeById(Number(newRoute.params.id));
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
        this.recipe.ingredients.push(this.newItem);
        this.clearNewItem();
    }

    public cancelAddIngredient() {
        this.clearNewItem();
    }

    public saveRecipe() {
        console.log('saving recipe');
    }

    private clearNewItem() {
        this.newItem = '';
        this.isAddingIngredient = false;
    }
}
</script>
