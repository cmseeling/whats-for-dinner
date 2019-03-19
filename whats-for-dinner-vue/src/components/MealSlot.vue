<template>
  <div>
    <span v-if="recipeIds.length === 0">None selected</span>
    <table v-else>
        <tbody>
            <tr v-for="recipeId in recipeIds" :key="recipeId">
                <td>
                    <button type="button" class="close" aria-label="Close" @click="removeFromMealSlot(recipeId)">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </td>
                <td>{{getRecipeName(recipeId)}}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters, mapMutations } from 'vuex';
import { Recipe } from '@/models/recipe';

@Component({
    computed: {
        ...mapGetters('recipes', ['getRecipeById'])
    },
    methods: {
        ...mapMutations('schedule', ['removeRecipeFromMealSlot'])
    }
})
export default class MealSlot extends Vue {
    @Prop() private slotId!: number;
    @Prop() private recipeIds!: number[];
    private getRecipeById!: (id: string) => Recipe;
    private removeRecipeFromMealSlot!: ({slotId, recipeId}: {slotId: number, recipeId: number}) => void;

    public getRecipeName(recipeId: string) {
        return this.getRecipeById(recipeId).name;
    }

    public removeFromMealSlot(recipeId: number) {
        console.log(recipeId);
        this.removeRecipeFromMealSlot({slotId: this.slotId, recipeId});
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