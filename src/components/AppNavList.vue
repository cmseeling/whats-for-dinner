<template>
  <v-list dense class="pt-0">
    <v-list-tile v-for="item in navItems" :key="item.title" :to="item.route">
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class AppNav extends Vue {
  public navItems = [
    { title: 'Home', icon: 'fa-home', route: '/' },
    { title: 'Recipes', icon: 'fa-file-alt', route: '/recipes' },
    { title: 'Grocery List', icon: 'fa-list', route: '/grocerylist' }
  ];
}
</script>
