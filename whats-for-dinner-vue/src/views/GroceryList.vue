<template>
  <div class="grocery-list">
      <div class="grocery-list card">
          <div class="grocery-list-header card-header">
            <h2 class="card-title float-left">Grocery List</h2>
        </div>
        <div class="grocery-list-table card-body">
            <table class="table">
                <tbody>
                    <tr v-for="(ingredient, index) in ingredientsList" :key="index">
                        <td>
                            <button type="button" class="close" aria-label="Close" @click="removeIngredient(index)">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </td>
                        <td colspan="4" class="text-left">
                            {{ingredient}}
                        </td>
                    </tr>
                    <tr v-if="isAddingItem">
                        <td class="text-right">
                            <button type="button" class="btn btn-danger" @click="toggleAddItem">Cancel</button>
                        </td>
                        <td>
                            <div class="input-group">
                                <input id="addItemInput" v-model="newItem" class="form-control"/>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" @click="addIngredient">Add</button>
                                </div>
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr v-else>
                        <td colspan="5">
                            <button type="button" class="btn btn-primary" @click="toggleAddItem">Add Item</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
    computed: {
        ...mapGetters('schedule', ['getAllUniqueRecipeIds']),
        ...mapGetters('recipes', ['getIngredientsFromRecipeIds'])
    }
})
export default class GroceryList extends Vue {
    public ingredientsList: string[] = [];
    public isAddingItem: boolean = false;
    public newItem: string = '';
    private getAllUniqueRecipeIds!: number[];
    private getIngredientsFromRecipeIds!: (recipeIds: number[]) => string[];

    public mounted() {
        this.ingredientsList = this.getIngredientsFromRecipeIds(this.getAllUniqueRecipeIds);
    }

    public removeIngredient(index: number) {
        this.ingredientsList.splice(index, 1);
    }

    public addIngredient() {
        this.ingredientsList.push(this.newItem);
        this.newItem = '';
        this.isAddingItem = false;
    }

    public toggleAddItem() {
        this.isAddingItem = !this.isAddingItem;
    }
}
</script>
