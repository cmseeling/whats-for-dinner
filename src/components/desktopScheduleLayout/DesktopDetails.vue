<template>
  <v-layout>
    <v-flex>
      <v-container>
        <v-layout column>
          <div class="schedule-day"></div>
          <v-layout column align-center>
            <div class="slot-panel">
              <v-toolbar>
                <v-toolbar-title>
                  {{day}} {{meal}}
                </v-toolbar-title>
              </v-toolbar>
              <v-container v-for="recipeId in recipeIds" :key="recipeId" class="py-0" fill-height>
                <v-layout align-center>
                  <v-flex shrink>
                    <v-btn color="error" @click="removeFromMealSlot(recipeId)" small icon><v-icon size="10px">fa fa-times</v-icon></v-btn>
                  </v-flex>
                  <v-flex>
                    {{getRecipeName(recipeId)}}
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-layout>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import DayLabels from './DayLabels.vue';
import DesktopSlot from './DesktopSlot.vue';
import { IMealSlot } from '../../state/interfaces/ScheduleState';
import { Recipe } from '../../models/recipe';

const recipeModule = namespace('recipes');
const scheduleModule = namespace('schedule');

@Component
export default class DesktopDetails extends Vue {
  @Prop() public day!: string;
  @Prop() public meal!: string;
  @Prop() public activeSlot!: number;
  @Prop() public recipeIds!: number[];

  @recipeModule.Getter public getRecipeById!: (id: string) => Recipe;
  @scheduleModule.Mutation private removeRecipeFromMealSlot!:
    ({slotId, recipeId}: {slotId: number, recipeId: number}) => void;

  public getRecipeName(recipeId: string) {
    return this.getRecipeById(recipeId).name;
  }

  public removeFromMealSlot(recipeId: number) {
    this.removeRecipeFromMealSlot({slotId: this.activeSlot, recipeId});
  }
}
</script>
