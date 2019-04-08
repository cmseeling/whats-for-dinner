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
import { Component, Vue } from 'vue-property-decorator';
import AppNavList from '@/components/AppNavList.vue';

@Component({
  components: {
    AppNavList,
  }
})
export default class Layout extends Vue {
  public visible: boolean|null = null;
}
</script>
