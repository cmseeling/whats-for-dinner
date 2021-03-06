<template>
  <div class="elevation-1 slot-container" @click="slotClicked">
    <v-slide-y-transition>
      <div v-show="!expanded" class="collapsed-display">
        {{mealSlot.recipeIds.length}}
      </div>
    </v-slide-y-transition>
    <v-slide-y-transition mode="out-in">
      <div v-show="expanded" :class="mealSlot.selected ? 'meal-slot selected' : 'meal-slot'">
        <div v-show="expanded" class="expanded-display">
          <div class="empty-slot" v-if="mealSlot.recipeIds.length === 0">None Selected</div>
          <v-list class="pa-0 recipe-list" dense v-else>
            <v-list-item v-for="(recipeId, index) in mealSlot.recipeIds" :key="recipeId" fill-height
                  :class="(index % 2 === 0) ? 'pa-0 recipe-item' : 'pa-0 recipe-item-striped'">
              <v-list-item-icon class="ma-0">
                <v-btn class="recipe-list-remove-button" color="error" @click="removeFromMealSlot(recipeId)" small text icon>
                  <v-icon size="14">fa fa-times</v-icon>
                </v-btn>
              </v-list-item-icon>
              <v-list-item-content class="pa-0">
                <div class="recipe-list-name text-left">
                  <router-link :to="{path: `recipes/item/${recipeId}`}">{{getRecipeName(recipeId)}}</router-link>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-slide-y-transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Recipe } from '@/models/Recipe';

export default Vue.extend({
  name: 'DekstopSlot',
  computed: {
    getRecipeById(): (id: number) => Recipe {
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
    border: 2px solid white;
  }

  .meal-slot :hover {
    background-color: gray;
  }

  .recipe-list {
    min-height: 50px;
    background-color: lightskyblue;
  }

  .recipe-list:hover, .recipe-list:hover div {
    background-color: gray;
  }

  .recipe-item {
    background-color: lightskyblue;
  }

  .recipe-item-striped {
    background-color: lightblue;
  }

  .recipe-list-name {
    padding-bottom: 2px;
  }

  .recipe-list-name a {
    text-decoration: none;
  }

  .selected {
    border: 2px solid lightseagreen;
  }
</style>
