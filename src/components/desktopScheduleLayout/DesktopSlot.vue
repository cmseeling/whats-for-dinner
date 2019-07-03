<template>
  <div class="elevation-1 slot-container" @click="slotClicked">
    <v-slide-y-transition>
      <div v-show="!expanded" class="collapsed-display">
        {{mealSlot.recipeIds.length}}
      </div>
    </v-slide-y-transition>
    <v-slide-y-transition mode="out-in">
      <div v-show="expanded" :class="mealSlot.selected ? 'meal-slot selected' : 'meal-slot'" style="height: 100%">
        <div v-show="expanded" class="expanded-display">
          <div class="empty-slot" v-if="mealSlot.recipeIds.length === 0">None Selected</div>
          <ul class="pa-0 recipe-list" v-else>
            <v-container v-for="recipeId in mealSlot.recipeIds" :key="recipeId" tag="li" class="pa-0 mb-2 recipe-item" style="" fill-height>
              <v-layout align-center>
                <v-flex shrink>
                  <v-btn class="recipe-list-remove-button" color="error" @click="removeFromMealSlot(recipeId)" small icon><v-icon size="10px">fa fa-times</v-icon></v-btn>
                </v-flex>
                <v-flex class="recipe-list-name">
                  {{getRecipeName(recipeId)}}
                </v-flex>
              </v-layout>
            </v-container>
          </ul>
        </div>
      </div>
    </v-slide-y-transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IMealSlot } from '../../state/interfaces/ScheduleState';
import { IRecipe } from '../../models/recipe';

export default Vue.extend({
  name: 'DekstopSlot',
  computed: {
    getRecipeById(): (id: number) => IRecipe {
      return (id: number) => this.$store.getters['recipes/getRecipeById'](id);
    }
  },
  props: {
    mealSlot: Object,
    expanded: Boolean,
    setActive: Function
  },
  watch: {
    expanded(newValue: boolean, oldValue: boolean) {
      if (oldValue) {
        this.setActive(null);
      }
    }
  },
  methods: {
    removeRecipeFromMealSlot({slotId, recipeId}: {slotId: number, recipeId: number}) {
      this.$store.commit('schedule/removeRecipeFromMealSlot', {slotId, recipeId});
    },
    getRecipeName(recipeId: number) {
      return this.getRecipeById(recipeId).name;
    },
    removeFromMealSlot(recipeId: number) {
      this.removeRecipeFromMealSlot({slotId: this.mealSlot.id, recipeId});
    },
    slotClicked() {
      if (this.expanded) {
        this.setActive(this.mealSlot.id);
      }
    }
  }
});
</script>

<style scoped>
  .slot-container {
    min-height: 50px;
    height: 100%;
    font-size: x-small;
    font-weight: bold;
  }

  .collapsed-display {
    height: 100%;
  }

  .expanded-display {
    height: 100%;
  }

  .empty-slot {
    min-height: 50px;
    height: 100%;
  }

  .meal-slot {
    height: 100%;
  }

  .meal-slot :hover {
    background-color: lightblue;
  }

  .recipe-item {
    background-color: lightskyblue !important;
  }

  .selected {
    border: 2px solid lightseagreen;
  }

  li {
    list-style-type: none;
    text-align: left;
  }
</style>
