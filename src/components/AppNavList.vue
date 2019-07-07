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
    <div class="hidden-lg-and-up">
      <hr/>
      <div v-if="isLoggedIn" >
        <v-list-tile @click="triggerNetlifyIdentityAction('logout')">
          <v-list-tile-action>
            <v-icon>fa-user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Log Out
          </v-list-tile-content>
        </v-list-tile>
      </div>
      <div v-else>
        <v-list-tile @click="triggerNetlifyIdentityAction('login')">
          <v-list-tile-action>
            <v-icon>fa-user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Log In
          </v-list-tile-content>
        </v-list-tile>
      </div>
    </div>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';
import netlifyIdentity, { User } from 'netlify-identity-widget';
import { CallNetlifyIdentityWidget } from '@/utils/netlifyIdentityHelper';

export default Vue.extend({
  name: 'AppNav',
  computed: {
    isLoggedIn(): boolean {
      return this.$store.getters['identity/isLoggedIn'];
    },
    userName(): string {
      return this.$store.getters['identity/userName'];
    }
  },
  data() {
    return {
      navItems: [
        { title: 'Home', icon: 'fa-home', route: '/' },
        { title: 'Recipes', icon: 'fa-file-alt', route: '/recipes' },
        { title: 'Grocery List', icon: 'fa-list', route: '/groceries' }
      ]
    };
  },
  methods: {
    setUser(user: User|null) {
      this.$store.dispatch('identity/updateUser', user);
    },
    triggerNetlifyIdentityAction(action: string) {
      CallNetlifyIdentityWidget(this, action);
    }
  }
});
</script>
