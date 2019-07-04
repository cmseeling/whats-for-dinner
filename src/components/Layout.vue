<template>
  <v-app>
    <v-toolbar app dark color="gray" clipped-left>
      <v-toolbar-side-icon @click="visible = !visible"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">What's For Dinner?</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Log In</v-btn>
        <v-btn flat>Sign Up</v-btn>
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
