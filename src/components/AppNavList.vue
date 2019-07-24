<template>
  <v-list dense class="text-left">
    <v-list-item v-for="item in navItems" :key="item.title" :to="item.route">
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <div >
      <v-divider/>
      <div v-if="isLoggedIn" >
        <v-list-item @click="triggerNetlifyIdentityAction('logout')">
          <v-list-item-action>
            <v-icon>fa-user</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div v-else>
        <v-list-item @click="triggerNetlifyIdentityAction('login')">
          <v-list-item-action>
            <v-icon>fa-user</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Log In</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
        { title: 'Grocery List', icon: 'fa-list', route: '/groceries' },
        { title: 'About', icon: 'fa-question-circle', route: '/about' }
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
