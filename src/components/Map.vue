<template>
  <div class="map-container main-bg-blue">
    <Search @showSelectedTravel="showSelectedTravel"/>
    <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
      <l-tile-layer :url="url"></l-tile-layer>
      <li v-for='item in markersData' v-bind:key='item.id'>
        <l-marker :lat-lng="[item.GPSLatitude, item.GPSLongitude]" :icon="item.icon" @click="toggleDisplayMarkerImage(item)">
        </l-marker>
      </li>
    </l-map>
  	<v-layout row justify-center class="dialog-container">
      <v-dialog v-model="dialog" hide-overlay persistent max-width="500px">
        <v-card >
          <img v-bind:src='apiUrl + pictureData.src' class="image"/>
          <v-card-title class="main-text-color chewy dialog-title">
            {{ pictureData.place }} / {{ pictureData.country }} <br/>
          </v-card-title>
          <h3 class="text-grey dialog-text">{{moment(pictureData.date).subtract(10, 'days').calendar()}}</h3>
            <v-spacer></v-spacer>
              <v-btn flat @click="dialog = false"><v-icon color="rgb(35, 197, 184)">close</v-icon></v-btn>
            <v-spacer></v-spacer>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import Search from './Search';
import { API_URL } from '../utils/utils.js'
import axios from "axios";
import moment from "moment"
import 'leaflet/dist/leaflet.css'


export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    Search
  },
  data() {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 2.5,
      center: [20, 10],
	  markersData: [],
	  apiUrl: API_URL,
      dialog: false,
      pictureData: {},
    };
  },
  beforeCreate() {
    axios.get( API_URL +'/all')
      .then((response) => {
          // eslint-disable-next-line 
        console.log(response.data)
        this.markersData = response.data
      })
  },
  methods: {
    moment,
    toggleDisplayMarkerImage(data) {
      this.pictureData = data
	  this.dialog = true
    },
    showSelectedTravel(gpsArray) {
        this.center = gpsArray
        // this.zoom = 5
    },
    renderDate(date) {
        return date.getYear()
    }
  }
}

</script>

<style scoped>
@import "~leaflet/dist/leaflet.css";

.v-dialog__content {
  justify-content: flex-end;
}

.remove-overlay {
  opacity: 0 !important;
}

.v-btn {
  min-width: 36px;
  margin: 10px
}

.v-card__title {
  justify-content: center;
  -webkit-box-align: center;
  padding: 10px 10px 0px 10px;
}

.dialog-title {
  font-size: 1.4em;
}

.dialog-text {
  font-weight: 400;
  font-size: 1em;
}

.description-container {
  padding: 10px 10px 0px 10px;
}

.v-card__text {
  width: 100%;
  max-height: 20vh;
  text-align:  center;
  overflow: hidden;
  overflow-y: auto;
  padding: 0px 15px 0px 15px;
}

.v-card__actions {
  padding: 0px;
}

.v-overlay--active {
  pointer-events: auto !important;
  -ms-touch-action: auto !important;
  touch-action: auto !important;
}

.map-container{
    margin-top: 48px;
  height: calc(100vh - 56px);
  width: 100%;
  position: fixed;
  z-index: 3;
  opacity: 1;
}

.image {
    width: 100%;
    height: auto;
    object-fit: cover;
    max-height: 400px;
}

.dialog-container {
  position: absolute;
  top: 0;
  z-index: 3000;
}

@media screen and (max-width: 960px) {
    .map-container{
        margin-top: 48px;
    }
}

@media screen and (max-width: 737px) {
  .v-dialog__content {
    width: 100% ! important;
    justify-content: center;
  }
}

</style>