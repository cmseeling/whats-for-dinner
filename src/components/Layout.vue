<template>
  <v-app>
    <v-toolbar app dark color="gray" clipped-left>
      <v-toolbar-side-icon @click="visible = !visible"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">What's For Dinner?</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer app clipped v-model="visible">
      <AppNavList/>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppNavList from '@/components/AppNavList.vue';

interface Data {
  visible: boolean|null;
}

export default Vue.extend({
  name: 'Layout',
  components: {
    AppNavList
  },
  data(): Data {
    return {
      visible: null
    };
  }
});
</script>
