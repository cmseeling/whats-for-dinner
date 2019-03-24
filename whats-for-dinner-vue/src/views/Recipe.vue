<template>
  <div class="recipe-edit container-fluid">
    <AppNav/>
    <RecipeForm/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RecipeForm from '@/components/RecipeForm.vue'; // @ is an alias to /src
import AppNav from '@/components/AppNav.vue';
// import { mapMutations } from 'vuex';

@Component({
  components: {
    AppNav,
    RecipeForm
  }
})
export default class Home extends Vue {
}
</script>
