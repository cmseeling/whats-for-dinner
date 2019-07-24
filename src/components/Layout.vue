<template>
  <v-app>
    <v-navigation-drawer app clipped v-model="visible">
      <AppNavList/>
    </v-navigation-drawer>
    <v-app-bar app dark color="gray" clipped-left dense>
      <v-app-bar-nav-icon @click="visible = !visible"></v-app-bar-nav-icon>
      <v-toolbar-title class="white-text">What's For Dinner?</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down" v-if="isLoggedIn">
        <v-btn class="wfd-user-name" disabled>{{userName}}</v-btn>
        <v-btn class="logout-button" text @click="triggerNetlifyIdentityAction('logout')">Log Out</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-md-and-down" v-else>
        <v-btn class="login-button" text @click="triggerNetlifyIdentityAction('login')">Log In</v-btn>
        <v-btn class="signup-button" text @click="triggerNetlifyIdentityAction('signup')">Sign Up</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-snackbar
      v-model="hasError"
      :bottom="true"
      :timeout="0">
      <span class="application-error-message">{{errorMessage}}</span>
      <v-btn color="pink" text @click="dismissErrorMessage">
        <v-icon small>fa fa-times</v-icon>
      </v-btn>
    </v-snackbar>
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
    },
    hasError(): boolean {
      return this.$store.getters['app/hasError'];
    },
    errorMessage(): string {
      return this.$store.getters['app/errorMessage'];
    }
  },
  data(): Data {
    return {
      visible: null
    };
  },
  methods: {
    setUser(user: User|null) {
      this.$store.dispatch('identity/updateUser', user);
    },
    triggerNetlifyIdentityAction(action: string) {
      CallNetlifyIdentityWidget(this, action);
    },
    dismissErrorMessage() {
      this.$store.dispatch('app/dismissErrorMessage');
    }
  }
});
</script>
