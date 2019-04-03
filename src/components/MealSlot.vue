<template>
  <div>
    <span class="no-item" v-if="recipeIds.length === 0">None selected</span>
    <table v-else class="table">
        <tbody>
            <tr v-for="recipeId in recipeIds" :key="recipeId">
                <td>
                    <button type="button" class="close" aria-label="Close" @click="removeFromMealSlot(recipeId)">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </td>
                <td class="text-left meal-slot-recipe-name">{{getRecipeName(recipeId)}}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Recipe } from '@/models/recipe';

const recipeModule = namespace('recipes');
const scheduleModule = namespace('schedule');

@Component
export default class MealSlot extends Vue {
    @Prop() private slotId!: number;
    @Prop() private recipeIds!: number[];
    @recipeModule.Getter private getRecipeById!: (id: string) => Recipe;
    @scheduleModule.Mutation private removeRecipeFromMealSlot!:
        ({slotId, recipeId}: {slotId: number, recipeId: number}) => void;

    public getRecipeName(recipeId: string) {
        return this.getRecipeById(recipeId).name;
    }

    public removeFromMealSlot(recipeId: number) {
        this.removeRecipeFromMealSlot({slotId: this.slotId, recipeId});
    }
}
</script>