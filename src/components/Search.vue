<template>
      <div v-if="items.length > 0" class="search-container">
        <div class="search-card">
            <v-btn icon color="#FFFFF" medium v-on:click="getAllPlaceFromTravel()">
                <v-icon  medium >search</v-icon>
            </v-btn>
            <v-select
            :items="items"
            v-model="travelName"
            label="Search on travels"
            solo
              ></v-select>
        </div>
      </div>
</template>

<script>
import { API_URL } from '../utils/utils.js'
import axios from "axios";

export default {
  name: 'Search',
    data() {
    return {
      items: [],
      travelName: "",
      center: []
    };
  },
  beforeCreate() {
    axios.get( API_URL + '/travels-list')
    .then((res) => {
        this.items = res.data.map(item => {
            return item.travel_name
        })
    })
  },
  methods: {
      getAllPlaceFromTravel() {
        axios.get( API_URL + `/travel-center/`, { params:{ travel : this.travelName}})
        .then((res) => {
            console.log(res.data[0])
            this.$emit('showSelectedTravel', [res.data[0].GPSLatitude, res.data[0].GPSLongitude])
            // this.items = res.data.map(item => {
            //     return item.travel_name
            // })
        })
      },
  }
}

</script>

<style>
.search-container {
    position: absolute;
    width: 250px;
    top: 20px;
    right: 10px;
    display: flex;
    justify-content: center;
    z-index: 520;
}

.search-card {
    display: flex;
    justify-content: center
}

</style>

