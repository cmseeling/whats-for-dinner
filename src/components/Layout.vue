<template>
  <v-app>
    <v-toolbar app dark color="gray" clipped-left dense>
      <v-toolbar-side-icon @click="visible = !visible"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">What's For Dinner?</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-if="isLoggedIn">
        <v-btn disabled>{{userName}}</v-btn>
        <v-btn flat @click="triggerNetlifyIdentityAction('logout')">Log Out</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down" v-else>
        <v-btn flat @click="triggerNetlifyIdentityAction('login')">Log In</v-btn>
        <v-btn flat @click="triggerNetlifyIdentityAction('signup')">Sign Up</v-btn>
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

netlifyIdentity.init();

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
      if (action === 'login' || action === 'signup') {
        netlifyIdentity.open(action);
        netlifyIdentity.on('login', (user) => {
          this.setUser(user);
          netlifyIdentity.close();
        });
      } else if (action === 'logout') {
        this.setUser(null);
        netlifyIdentity.logout();
        this.$router.push({name: 'home'});
      }
    }
  }
});
</script>
