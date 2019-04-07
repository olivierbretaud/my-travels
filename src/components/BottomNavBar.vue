<template>
 <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="main-bg-blue" class="bottom-bar">
    <!-- <router-link to="/edit" class="bottom-links">
      <v-btn color="white" flat value="recent">
        <span>Travel book</span>
        <v-icon>burst_mode</v-icon>
      </v-btn>
    </router-link> -->
    <router-link to="/gallery" class="bottom-links">
      <v-btn color="white" flat value="favorites">
        <span>Gallery</span>
        <v-icon>collections</v-icon>
      </v-btn>
    </router-link>
    <router-link to="/" class="bottom-links">
      <v-btn color="white" flat value="nearby">
        <span>Map</span>
        <v-icon>map</v-icon>
      </v-btn>
    </router-link>
  </v-bottom-nav>
</template>

<script>
export default {
  name: 'BottomNavBar',
  data () {
    return {
      bottomNav: 'recent',
    }
  }
}
</script>


<style scoped>
.bottom-bar {
  position: fixed !important;
  z-index: 500;
  height: 8vh;
}
.bottom-links {
  max-width: 200px;
  text-decoration: none;
}
</style>
