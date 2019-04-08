<template>
  <div class="recipes-management">
    <v-btn color="success" @click="handleNewClicked"><v-icon small left>fa fa-plus</v-icon>Create New</v-btn>
    <RecipeList v-on:recipe-list-click="handleRecipeSelected"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RecipeList from '@/components/RecipeList.vue'; // @ is an alias to /src
// import { mapMutations } from 'vuex';

@Component({
  components: {
    RecipeList
  }
})
export default class Home extends Vue {
  public handleRecipeSelected(recipeId: number) {
    this.$router.push(`/recipes/item/${recipeId}`);
  }

  public handleNewClicked() {
    this.$router.push('/recipes/item');
  }
}
</script>

<style scoped>
  .recipes-management {
    text-align: left;
  }
</style>
