<template>
  <div id="app">
    <div id="full-screen">
      <Navbar />
      <BottomNavBar />
      <transition name="slide-fade">
       <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import BottomNavBar from './components/BottomNavBar.vue';

export default {
  name: 'app',
  components: {
    Navbar,
    BottomNavBar,
  }
}
</script>

<style>
#app {
  font-family: 'Krub', sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-y: auto;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--main-bg-color) !important;; 
}
/* #app:-webkit-full-screen  {
  width: 100%;
  height: 100%;
} */

:root {
  --main-bg-color: rgb(35, 197, 184);
  --grey: #888;
}

.main-bg-blue {
  background-color: var(--main-bg-color) !important;
}

.main-text-blue {
  color: var(--main-bg-color) !important;
}

.text-grey {
  color: var(--grey) !important;
  letter-spacing: 0.05em !important;
}

.chewy {
  font-family: 'Chewy', cursive !important;
}

.logo {
  font-size:  1.2em !important;
  letter-spacing: 0.1em !important;
  font-family: 'Chewy', cursive;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* ::-webkit-scrollbar {
  width: 0px; 
  background: transparent; 
} */

</style>
