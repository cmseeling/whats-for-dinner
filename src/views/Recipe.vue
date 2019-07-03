<template>
  <div class="recipe-edit">
    <RecipeForm/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RecipeForm from '@/components/RecipeForm.vue'; // @ is an alias to /src
// import { mapMutations } from 'vuex';

export default Vue.extend({
  name: 'RecipeEditor',
  components: {
    RecipeForm
  }
});
</script>
