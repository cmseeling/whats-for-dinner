<template>
  <div class="grocery-list">
    <v-card>
      <v-card-title>
        <v-toolbar flat color="#f5f5f5">
          <v-toolbar-title>
            Grocery List
          </v-toolbar-title>
        </v-toolbar>
      </v-card-title>
      <GroceryList />
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GroceryList from '@/components/GroceryList.vue';

export default Vue.extend({
  name: 'Groceries',
  components: {
    GroceryList
  }
});
</script>
