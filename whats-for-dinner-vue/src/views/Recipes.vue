<template>
  <div class="recipes-management container-fluid">
    <AppNav/>
    <router-link to="/recipes/item" class="btn btn-primary">Create New</router-link>
    <RecipeList v-on:recipe-list-click="handleRecipeSelected"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RecipeList from '@/components/RecipeList.vue'; // @ is an alias to /src
import AppNav from '@/components/AppNav.vue';
// import { mapMutations } from 'vuex';

@Component({
  components: {
    AppNav,
    RecipeList
  }
})
export default class Home extends Vue {
  public handleRecipeSelected(recipeId: number) {
    this.$router.push(`/recipes/item/${recipeId}`);
  }
}
</script>
