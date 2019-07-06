<template>
  <v-app>
    <v-toolbar app dark color="gray" clipped-left dense>
      <v-toolbar-side-icon @click="visible = !visible"></v-toolbar-side-icon>
      <v-toolbar-title class="white-text">What's For Dinner?</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down" v-if="isLoggedIn">
        <v-btn class="wfd-user-name" disabled>{{userName}}</v-btn>
        <v-btn class="logout-button" flat @click="triggerNetlifyIdentityAction('logout')">Log Out</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-md-and-down" v-else>
        <v-btn class="login-button" flat @click="triggerNetlifyIdentityAction('login')">Log In</v-btn>
        <v-btn class="signup-button" flat @click="triggerNetlifyIdentityAction('signup')">Sign Up</v-btn>
      </v-toolbar-items>
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
import netlifyIdentity, { User } from 'netlify-identity-widget';
import AppNavList from '@/components/AppNavList.vue';
import { CallNetlifyIdentityWidget } from '@/utils/netlifyIdentityHelper';

interface Data {
  visible: boolean|null;
}

export default Vue.extend({
  name: 'Layout',
  components: {
    AppNavList
  },
  computed: {
    isLoggedIn(): boolean {
      return this.$store.getters['identity/isLoggedIn'];
    },
    userName(): string {
      return this.$store.getters['identity/userName'];
    }
  },
  data(): Data {
    return {
      visible: null
    };
  },
  methods: {
    setUser(user: User|null) {
      this.$store.commit('identity/setUser', user);
    },
    triggerNetlifyIdentityAction(action: string) {
      CallNetlifyIdentityWidget(this, action);
    }
  }
});
</script>
