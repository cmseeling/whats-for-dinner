<template>
  <div class="elevation-1" style="min-height: 50px;" @click="slotClicked">
    <v-expand-transition v-if="!expanded">
      <div v-show="!expanded" style="height: 100%">
        {{mealSlot.recipeIds.length}}
      </div>
    </v-expand-transition>
    <v-expand-transition v-else>
      <div :class="mealSlot.selected ? 'meal-slot selected' : 'meal-slot'" style="height: 100%">
        <div v-show="expanded" style="height: 100%">
          <div style="height: 50px;" v-if="mealSlot.recipeIds.length === 0">None Selected</div>
          <ul class="pa-0" v-else>
            <v-container v-for="recipeId in mealSlot.recipeIds" :key="recipeId" tag="li" class="pa-0 mb-2" style="border-bottom: 1px solid" fill-height>
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
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { IMealSlot } from '../../state/interfaces/ScheduleState';
import { Recipe } from '../../models/recipe';

const recipeModule = namespace('recipes');
const scheduleModule = namespace('schedule');

@Component
export default class DekstopSlot extends Vue {
  @Prop() public mealSlot!: IMealSlot;
  @Prop() public expanded!: boolean;
  @Prop() public setActive!: (slotId: number) => void;

  @recipeModule.Getter public getRecipeById!: (id: string) => Recipe;
  @scheduleModule.Mutation public removeRecipeFromMealSlot!:
    ({slotId, recipeId}: {slotId: number, recipeId: number}) => void;

  public getRecipeName(recipeId: string) {
    return this.getRecipeById(recipeId).name;
  }

  public removeFromMealSlot(recipeId: number) {
    this.removeRecipeFromMealSlot({slotId: this.mealSlot.id, recipeId});
  }

  public slotClicked() {
    if(this.expanded) {
      this.setActive(this.mealSlot.id);
    }
  }
}
</script>

<style scoped>
  .meal-slot {
    height: 100%;
  }

  .meal-slot :hover {
    background-color: lightblue;
  }

  .selected {
    border: 2px solid green;
  }

  li {
    list-style-type: none;
    text-align: left;
  }
</style>
