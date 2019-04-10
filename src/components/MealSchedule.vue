<template>
  <v-card>
    <v-card-title>
      <v-toolbar flat>
        <v-toolbar-title>
          Schedule
        </v-toolbar-title>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <v-container fill-height hidden-sm-and-down>
        <v-layout>
          <v-flex md1>
            <v-layout>
              <v-flex>
                <v-container>
                  <v-layout column align-center>
                    <div class="schedule-day"></div>
                    <div class="schedule-block">
                      Breakfast
                    </div>
                    <div class="schedule-block">
                      Lunch
                    </div>
                    <div class="schedule-block">
                      Dinner
                    </div>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex md1 v-for="(day, index) in days" :key="index">
            <v-layout column>
              <v-flex class="schedule-day">
                {{day}}
              </v-flex>
              <div class="schedule-block elevation-1" v-for="slot in groupedSlots[index]" :key="slot.id" @click="setActive(slot.id)">
                <v-container :class="slot.selected ? 'meal-slot selected' : 'meal-slot'">
                  <v-layout align-center>
                    <v-flex>
                      <span class="no-item" v-if="slot.recipeIds.length === 0">None selected</span>
                      <span class="slot-count" v-else>{{slot.recipeIds.length}} recipes</span>
                    </v-flex>
                  </v-layout>
                </v-container>
                <!-- <DesktopSlotDialog :slotId="slot.id" :recipeIds="slot.recipeIds" :class="slot.selected ? 'selected' : ''"/> -->
              </div>
            </v-layout>
          </v-flex>
          <v-flex md4>
            <v-layout>
              <v-flex>
                <v-container>
                  <v-layout column>
                    <div class="schedule-day"></div>
                    <v-layout column align-center>
                      <div v-if="activeSlot" class="slot-panel">
                        <v-toolbar>
                          <v-toolbar-title>
                            {{days[mealSlots[activeSlot].dayIndex]}} {{meals[mealSlots[activeSlot].mealIndex]}}
                          </v-toolbar-title>
                        </v-toolbar>
                        <v-container v-for="recipeId in mealSlots[activeSlot].recipeIds" :key="recipeId" class="py-0" fill-height>
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
          </v-flex>
        </v-layout>
      </v-container>
      <v-container fill-height hidden-md-and-up>
        mobile view
      </v-container>
      <div class="align-right">
            <v-btn to="/grocerylist" color="success">Generate Grocery List<v-icon small right>fa fa-arrow-right</v-icon></v-btn>
        </div>
    </v-card-text>
  </v-card>
    <!-- <div class="schedule card">
        <div class="schedule-header card-header">
            <h2 class="card-title float-left">Schedule</h2>
        </div>
        <div class="schedule-table card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Su</th>
                        <th scope="col">M</th>
                        <th scope="col">Tu</th>
                        <th scope="col">W</th>
                        <th scope="col">Th</th>
                        <th scope="col">F</th>
                        <th scope="col">Sa</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Breakfast</th>
                        <td v-for="slot in groupedSlots['Breakfast']" :key="slot.id" @click="setActive(slot.id)" class="meal-slot">
                            <MealSlot :slotId="slot.id" :recipeIds="slot.recipeIds" :class="slot.selected ? 'selected' : ''" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Lunch</th>
                        <td v-for="slot in groupedSlots['Lunch']" :key="slot.id" @click="setActive(slot.id)" class="meal-slot">
                            <MealSlot :slotId="slot.id" :recipeIds="slot.recipeIds" :class="slot.selected ? 'selected' : ''" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Dinner</th>
                        <td v-for="slot in groupedSlots['Dinner']" :key="slot.id" @click="setActive(slot.id)" class="meal-slot">
                            <MealSlot :slotId="slot.id" :recipeIds="slot.recipeIds" :class="slot.selected ? 'selected' : ''" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="align-right">
            <v-btn to="/grocerylist" color="success">Generate Grocery List<v-icon small right>fa fa-arrow-right</v-icon></v-btn>
        </div>
    </div> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import toLower from 'lodash/toLower';
import { IMealSlot, dayList, mealList } from '@/state/interfaces/ScheduleState';
import MealSlot from './MealSlot.vue';
import { Recipe } from '@/models/recipe';

const recipeModule = namespace('recipes');
const scheduleModule = namespace('schedule');

@Component({
  components: {
    MealSlot
  }
})
export default class RecipeList extends Vue {
  public activeSlot: number|null = null;
  @recipeModule.Getter public getRecipeById!: (id: string) => Recipe;
  @scheduleModule.State public mealSlots!: IMealSlot[];
  public days = dayList;
  public meals = mealList;

  public getRecipeName(recipeId: string) {
    return this.getRecipeById(recipeId).name;
  }

  public get augmentedSlots() {
    return map(this.mealSlots, (slot: IMealSlot) => {
      return {
        ...slot,
        selected: slot.id === this.activeSlot
      };
    });
  }

  public get groupedSlots() {
    return groupBy(this.augmentedSlots, 'dayIndex');
  }

  public setActive(mealId: number) {
    if (mealId === this.activeSlot) {
      this.activeSlot = null;
      this.$emit('meal-slot-click', null);
    } else {
      this.activeSlot = mealId;
      this.$emit('meal-slot-click', mealId);
    }
  }
}
</script>

<style scoped>
  .schedule-block {
    /* width: 120px; */
    height: 120px;
  }

  .schedule-day {
    height: 25px;
    /* width: 120px; */
  }

  .slot-panel {
    width: 100%;
    padding-left: 10px;
    text-align: left;
  }

  .align-right {
    text-align: right;
    margin-right: 10px;
  }

  .meal-slot {
    width: 100%;
    height: 100%;
  }

  .schedule-block :hover{
    background-color: lightblue;
  }

  .selected {
    border: 2px solid green !important;
  }
</style>