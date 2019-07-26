<template>
  <div class="recipes-management">
    <v-btn class="new-recipe-button" color="success" @click="handleNewClicked"><v-icon small left>fa fa-plus</v-icon>Create New</v-btn>
    <RecipeList v-on:recipe-list-click="handleRecipeSelected"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RecipeList from '@/components/RecipeList.vue'; // @ is an alias to /src
// import { mapMutations } from 'vuex';

export default Vue.extend({
  name: 'RecipeListPage',
  components: {
    RecipeList
  },
  methods: {
    handleRecipeSelected(recipeId: number) {
      this.$router.push(`/recipes/item/${recipeId}`);
    },
    handleNewClicked() {
      this.$router.push('/recipes/item');
    }
  }
});
</script>

<style scoped>
  .recipes-management {
    text-align: left;
  }

  .new-recipe-button {
    margin: 8px 0px;
  }
</style>
