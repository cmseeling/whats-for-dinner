<template>
  <v-app>
    <v-toolbar app dark color="gray" clipped-left dense>
      <v-toolbar-side-icon @click="visible = !visible"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">What's For Dinner?</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-if="isLoggedIn">
        <v-btn disabled>{{userEmail}}</v-btn>
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
import netlifyIdentity from 'netlify-identity-widget';
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
    userEmail(): string {
      return this.$store.getters['identity/userEmail'];
    }
  },
  data(): Data {
    return {
      visible: null
    };
  },
  methods: {
    triggerNetlifyIdentityAction(action: string) {
      if (action === 'login' || action === 'signup') {
        netlifyIdentity.open(action);
        netlifyIdentity.on('login', (user) => {
          netlifyIdentity.close();
        });
      } else if (action === 'logout') {
        netlifyIdentity.logout();
        this.$router.push({name: 'home'});
      }
    }
  }
});
</script>
