<template>
  <div class="recipe-edit">
    <RecipeForm/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RecipeForm from '@/components/RecipeForm.vue'; // @ is an alias to /src
// import { mapMutations } from 'vuex';

@Component({
  components: {
    RecipeForm
  }
})
export default class Home extends Vue {
}
</script>
