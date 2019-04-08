<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';

@Component({
  components: {
    Layout,
  }
})
export default class Home extends Vue {
  public showMenu: boolean|null = null;

  public handleMenuClicked() {
    if (this.showMenu) {
      this.showMenu = false;
    } else {
      this.showMenu = true;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
