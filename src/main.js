import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import App from './App.vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/dist/vuetify.min.css';
import { L } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import Gallery from './components/Gallery.vue';
import Map from './components/Map.vue';
import TimeLine from './components/TimeLine.vue'


// this part resolve an issue where the markers would not appear
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('../public/assets/map-marker-x2.png'),
  iconUrl: require('../public/assets/map-marker.png'),
  // iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  iconfont: 'md'
});

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Map },
  { path: '/gallery', component: Gallery },
  { path: '/timeLine', component: TimeLine }
]

const router = new VueRouter({
  routes 
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
