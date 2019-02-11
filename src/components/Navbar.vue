<template>
  <v-toolbar class="main-bg-blue navbar" fixed>
    <v-toolbar-title class="white--text logo"><h1>My travels</h1></v-toolbar-title>  
    <v-spacer></v-spacer> 
    <v-btn icon medium dark>
      <v-icon medium dark>account_circle</v-icon>
    </v-btn>
    <!-- <v-btn icon medium dark>
      <v-icon v-on:click="openFullscreen()" medium dark>open_in_new</v-icon>
    </v-btn> -->
    <v-toolbar-side-icon medium dark>
    </v-toolbar-side-icon> 
  </v-toolbar>
</template>

<script>

export default {
  name: 'Navbar',
  methods: {
    // openFullscreen() {
    //   let elem = document.getElementById("app");
    //   if (elem.requestFullscreen) {
    //     elem.requestFullscreen();
    //   } else if (elem.mozRequestFullScreen) { /* Firefox */
    //     elem.mozRequestFullScreen();
    //   } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    //     elem.webkitRequestFullscreen();
    //   } else if (elem.msRequestFullscreen) { /* IE/Edge */
    //     elem.msRequestFullscreen();
    //   }
    // }
  }
}
</script>

<style scoped>
.navbar {
  z-index: 500;
}
</style>
