<template>
  <div class="meal-slot">
    <span class="no-item" v-if="recipeIds.length === 0">None selected</span>
    <ul v-else>
      <v-container v-for="recipeId in recipeIds" :key="recipeId" tag="li" class="pa-0" fill-height>
        <v-layout align-center>
          <v-flex shrink>
            <v-icon size="10px" @click="removeFromMealSlot(recipeId)">fa fa-times</v-icon>
          </v-flex>
          <v-flex>
            {{getRecipeName(recipeId)}}
          </v-flex>
        </v-layout>
      </v-container>
    </ul>
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

<style scoped>
  .meal-slot {
    width: 100%;
    height: 100%;
  }

  .meal-slot :hover{
    background-color: lightblue;
  }

  li {
    list-style-type: none;
  }
</style>
