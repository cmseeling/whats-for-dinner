<template>
  <v-card class="mobile-meal-slot" @click="setActive(mealSlot.id)">
    <v-card-title>
      {{meals[mealSlot.mealIndex]}}
    </v-card-title>
    <v-card-text>
      <ul>
        <v-container v-for="recipeId in mealSlot.recipeIds" :key="recipeId" tag="li" class="pa-0" fill-height>
          <v-layout align-center>
            <v-flex shrink>
              <v-btn color="error" @click="removeFromMealSlot(recipeId)" small icon><v-icon size="10px">fa fa-times</v-icon></v-btn>
            </v-flex>
            <v-flex>
              {{getRecipeName(recipeId)}}
            </v-flex>
          </v-layout>
        </v-container>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Recipe } from '@/models/recipe';
import { IMealSlot, mealList } from '@/state/interfaces/ScheduleState';

const recipeModule = namespace('recipes');
const scheduleModule = namespace('schedule');

@Component
export default class MobileSlot extends Vue {
  @Prop() public mealSlot!: IMealSlot;
  @Prop() public setActive!: (slotId: number) => void;
  public meals = mealList;

  @recipeModule.Getter public getRecipeById!: (id: string) => Recipe;
  @scheduleModule.Mutation public removeRecipeFromMealSlot!:
    ({slotId, recipeId}: {slotId: number, recipeId: number}) => void;

  public getRecipeName(recipeId: string) {
    return this.getRecipeById(recipeId).name;
  }

  public removeFromMealSlot(recipeId: number) {
    this.removeRecipeFromMealSlot({slotId: this.mealSlot.id, recipeId});
  }
}
</script>

<style scoped>
  li {
    list-style-type: none;
    text-align: left;
  }
</style>
