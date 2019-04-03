<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="navbar-brand">What's For Dinner?</div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <router-link to="/" class="nav-link">Home</router-link>
                <router-link to="/recipes" class="nav-link">Recipes</router-link>
                <router-link to="/grocerylist" class="nav-link">Grocery List</router-link>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppNav extends Vue {
}
</script>
