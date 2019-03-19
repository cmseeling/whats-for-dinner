<template>
  <div class="home container-fluid">
    <MealSchedule />
    <RecipeList v-on:recipe-list-click="handleRecipeSelected"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RecipeList from '@/components/RecipeList.vue'; // @ is an alias to /src
import MealSchedule from '@/components/MealSchedule.vue';

@Component({
  components: {
    MealSchedule,
    RecipeList
  },
})
export default class Home extends Vue {
  public handleRecipeSelected(id: number) {
    console.log(id);
  }
}
</script>
