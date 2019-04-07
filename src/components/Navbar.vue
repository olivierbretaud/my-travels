<template>
    <v-toolbar class="main-bg-blue navbar" fixed>
        <v-toolbar-title class="white--text logo">
            <h1>My travels</h1>
        </v-toolbar-title>  
        <v-spacer></v-spacer>
        <router-link to="/edit">
            <v-btn icon medium dark>
                <v-icon medium dark>account_circle</v-icon>
            </v-btn>
        </router-link>
    <!-- <v-btn icon medium dark>
      <v-icon v-on:click="openFullscreen()" medium dark>open_in_new</v-icon>
    </v-btn> -->
    </v-toolbar>
</template>

<script>

export default {
  name: 'Navbar',
}
</script>

<style scoped>
.navbar {
  z-index: 500;
}
</style>
