<template>
    <v-container fluid>
        <v-layout row wrap >
            <v-flex sm12 md3 class="edit-container">
                <div class="panel">
                    <div v-on:click="toggleDisplayCreateTravel()" class="summary">
                        <h3 class="titleName main-text-color">Create a new travel</h3>
                        <v-btn icon medium >
                            <v-icon v-if="!displayCreateTravel" medium purple>expand_more</v-icon>
                            <v-icon v-if="displayCreateTravel" medium purple>expand_less</v-icon>
                        </v-btn>
                    </div>
                    <div  v-if="displayCreateTravel" class="content">
                        <v-text-field label="New travel name" v-model="newTravelName" placeholder="Name of the new travel"></v-text-field>
                        <v-btn class="main-bg-blue text-white" small v-on:click="addtravel()"> + Add this travel</v-btn>
                    </div>
                </div>
                <div class="panel">
                    <div v-on:click="toggleDisplayAddPlace()" class="summary">
                        <h3 class="titleName main-text-color">Add a new place</h3>
                        <v-btn icon medium>
                            <v-icon v-if="!displayAddPlace" medium purple>expand_more</v-icon>
                            <v-icon v-if="displayAddPlace" medium purple>expand_less</v-icon>
                        </v-btn>
                    </div>
                    <div v-if="displayAddPlace" class="content">
                        <v-select
                            :items="travelNameList"
                            v-model="travelName"
                            label="Select a travel"
                            @change="getUpdatedMap()"
                        ></v-select>
                        <v-btn v-if="travelName !== ''" class="main-bg-blue text-white" @click="$refs.files.click()">Select a picture</v-btn >
                        <input type="file" id="files" ref="files" name="photos" v-show="false" multiple v-on:change="handleFilesUpload()"/>
                        <img id="image" class="image-preview"/>
                        <h4 v-if="travelName !== ''" class="primary--text">{{ gpsInfo }}</h4>
                        <div v-if="files.length > 0">
                            <v-btn class="main-bg-blue text-white" small v-on:click="getInfosFromMarker()">Valid the marker position</v-btn>
                        </div>
                        <div v-if="displayPlaceInfos">
                            <v-text-field label="place" v-model="place" placeholder="name of the place"></v-text-field>
                            <v-text-field label="country" v-model="country" placeholder="country"></v-text-field>
                            <v-text-field label="date" v-model="date" placeholder="date"></v-text-field>
                            <v-textarea label="description" v-model="description" placeholder="description"></v-textarea>
                            <v-btn class="main-bg-blue text-white" v-on:click="submitFiles()">Submit</v-btn>
                        </div>
                    </div>
                </div>
                <div class="panel">
                    <div v-on:click="toggleDisplayUpdateTravel()" class="summary">
                        <h3 class="titleName main-text-color">Update a travel</h3>
                        <v-btn icon medium >
                            <v-icon v-if="!displayUpdateTravel" medium purple>expand_more</v-icon>
                            <v-icon v-if="displayUpdateTravel" medium purple>expand_less</v-icon>
                        </v-btn>
                    </div>
                    <div  v-if="displayUpdateTravel" class="content">
                        <v-select
                            :items="travelNameList"
                            v-model="travelName"
                            label="Select a travel"
                        ></v-select>
                        <v-btn v-if="travelName !== ''" class="main-bg-blue text-white" v-on:click="getTravelToUpdate()">Select this travel</v-btn>
                        <v-btn v-if="travelName !== ''" class="main-bg-blue text-white" v-on:click="deleteTravel()">Delete this travel</v-btn>
                    </div>
                </div>
            </v-flex>
            <v-flex sm12 md9 class="map-container">
                <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center" ref="map">
                    <l-tile-layer :url="url"></l-tile-layer>
                        <l-marker :lat-lng.sync="markerPosition" :draggable=true ref="draggableMarker" v-on:dragend="setMapCenter()"></l-marker>
                        <li v-for='item in markersData' v-bind:key='item.id'>
                            <l-marker :lat-lng="[item.GPSLatitude, item.GPSLongitude]" :icon="item.icon" @click="toggleDisplayMarkerImage(item)">
                            </l-marker>
                        </li>
                </l-map>
                <v-layout row justify-center class="dialog-container">
                    <v-dialog v-model="dialog" max-width="500" hide-overlay persistent >
                        <v-card>
                        <img v-bind:src='apiUrl + pictureData.src' class="image"/>
                        <v-card-title class="main-text-color chewy dialog-title">
                            {{ pictureData.place }} / {{ pictureData.country }} <br/>
                        </v-card-title>
                        <h3 class="text-grey dialog-text"> {{ pictureData.date }}</h3>
                            <v-btn class="main-bg-blue text-white" small v-on:click="deletePlace(pictureData.id , pictureData.src)"> Delete this place</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn flat @click="dialog = false"><v-icon color="rgb(35, 197, 184)">close</v-icon></v-btn>
                            <v-spacer></v-spacer>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { API_URL } from '../utils/utils.js';
import axios from "axios";

export default {
  name: 'Edit',
    components: {
    LMap,
    LTileLayer,
    LMarker,
  },

  data() {
    return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 3,
        apiUrl: API_URL,
        center: [0, 0],
        markerPosition: { lat: 0, lng: 0 },
        travelNameList: [],
        markersData: [],
        dialog: false,
        pictureData: {},
        travelName: "",
        displayCreateTravel: false,
        displayUpdateTravel: false,
        displayAddPlace: false,
        displayPlaceInfos: false,
        newTravelName: "",
        displayGpsInfo: false,
        gpsInfo: "Select a picture to get the place marker",
        files: "",
        place:"",
        country: "",
        area: "Sud-lipez",
        date: Date.now(),
        GPSLatitudeRef : "",
        GPSLatitude: -20,
        GPSLongitudeRef : "",
        GPSLongitude: -66,
        altitude: 0,
        description: ""
    };
  },

    methods: {
        getInfosFromMarker() {
            this.displayPlaceInfos = true;
            this.GPSLatitude = this.markerPosition.lat
            this.GPSLongitude = this.markerPosition.lng
            axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.GPSLatitude}&lon=${this.GPSLongitude}`)
            .then((res) => {
                // console.log(res.data)
                this.setMapCenter()
                if (res.data.address.country) {
                    this.country = res.data.address.country
                }
                if (res.data.address.village ) {
                    if (res.data.address.village && res.data.address.viewpoint) {
                        this.place = res.data.address.viewpoint
                    }
                    else {
                        this.place = res.data.address.village
                    }
                }
                if (res.data.address.cliff) {
                        this.place = res.data.address.cliff
                }
                if (res.data.address.city) {
                    if (res.data.address.viewpoint) {
                        this.place = res.data.address.viewpoint 
                    }
                    if (res.data.address.bird_hide) {
                        this.place = res.data.address.bird_hide
                    }
                    if ( res.data.address.water) {
                        this.place = res.data.address.water
                    }
                    else {
                        this.place = res.data.address.city
                    }
                }
                if (res.data.address.hamlet) {
                    if (res.data.address.hamlet && res.data.address.viewpoint) {
                        this.place = res.data.address.viewpoint 
                    } else {
                        this.place = res.data.address.hamlet
                    }
                }
                if (res.data.address.attraction ) {
                    this.place = res.data.address.attraction
                } if (res.data.address.town) {
                    this.place = res.data.address.town
                }
            })
        },
        setMapCenter() {
            // let mapCenter = this.$refs.map.mapObject.getCenter()
            this.center = [ this.markerPosition.lat, this.markerPosition.lng ]
        },
        toggleDisplayCreateTravel() {
            this.displayCreateTravel = !this.displayCreateTravel
            this.displayAddPlace = false
        },
        toggleDisplayUpdateTravel() {
            this.getTravelList()
            this.displayUpdateTravel = !this.displayUpdateTravel
            this.displayAddPlace = false
            this.displayCreateTravel = false
        },
        toggleDisplayAddPlace() {
            this.displayAddPlace = !this.displayAddPlace
            this.displayCreateTravel = false
            this.displayUpdateTravel = false
            this.getTravelList()
        },
        addtravel() {
            axios.post( API_URL + '/create-travel', { travelName: this.newTravelName })
            this.toggleDisplayCreateTravel()
            this.newTravelName = ""
        },
        getTravelList() {
            axios.get( API_URL + '/travels-list')
            .then((res) => {
                this.travelNameList = res.data.map(item => {
                    return item.travel_name
                })
                this.travelName = this.travelNameList[0]
            })
        },
        getTravelToUpdate() {
            axios.get( API_URL + `/travel-center/`, { params:{ travel : this.travelName}})
            .then((res) => {
                if (res.data.length === 0 ) {
                    this.deleteTravel()
                    this.center = [0 , 0]

                } else {
                    this.center = [res.data[0].GPSLatitude, res.data[0].GPSLongitude]
                    this.markersData = res.data
                }
            })
        },
        toggleDisplayMarkerImage(data) {
            this.pictureData = data
            this.dialog = true
        },

        deletePlace(itemId, itemSrc) {
            axios.delete( API_URL + '/delete-place', { data : {id: itemId, src: itemSrc}}
            ).then(() => {
                this.getUpdatedMap()
            })
        },

        getUpdatedMap() {
            axios.get( API_URL + `/travel-center/`, { params:{ travel : this.travelName}})
            .then((res) => {
                this.markersData = res.data
                this.dialog = false
            })
        },

        deleteTravel() {
            axios.delete( API_URL + '/delete-travel', { data : { name: this.travelName }})
            .then((res) => {
                this.markersData.map( item => {
                    this.deletePlace(item.id, item.src)
                })
                this.getTravelList()
            })
        },

        submitFiles() {
            /*
            Initialize the form data
            */            
            let formData = new FormData();

            this.files = this.$refs.files.files;

            formData.append('markerLat' , this.markerPosition.lat );
            formData.append('markerLng' , this.markerPosition.lng);
            formData.append('place', this.place);
            formData.append('travel', this.travelName);
            formData.append('country', this.country);
            formData.append('area', this.area);
            formData.append('date', this.date);
            formData.append('altitude', this.altitude);
            formData.append('description', this.description);

            for( var i = 0; i < this.files.length; i++ ){
            let file = this.files[i];
                formData.append('photos', file);
            }
            /*
            Make the request to the POST /multiple-files URL
            */
            axios.post( API_URL + '/upload', formData
            ).then(function(res){
                this.getUpdatedMap()
            })
            .catch(function(){
            //     console.log(formData)
            //   console.log('FAILURE!!');
            });
            this.place = ""
            this.country = ""
            this.date = ""
            this.description = ""
            this.files = []
            this.getUpdatedMap()
            this.toggleDisplayAddPlace()
            this.displayPlaceInfos = false
        },

        ConvertDMSToDD(degrees, minutes, seconds, direction) {
            var dd = degrees + minutes/60 + seconds/(60*60);

            if (direction == "S" || direction == "W") {
                dd = dd * -1;
            } // Don't do anything for N or E
            return dd;
        },

        handleFilesUpload() {
            if (this.markersData !== []) {
                this.getUpdatedMap()
            }
            this.files = this.$refs.files.files;
            let reader = new FileReader();
                console.log("new image")
                reader.onload = function (e) {
                    document.getElementById("image").src = e.target.result;
                };

                reader.readAsDataURL(this.files[0]);
            if (this.files[0]) {
                let this_ = this
                EXIF.getData(this_.files[0], function() {
                const allMetaData =  EXIF.getAllTags(this)
                if (allMetaData.GPSLatitude === undefined || isNaN(allMetaData.GPSLatitude[0]) ) {
                    if (allMetaData.DateTime) {
                        this_.date = allMetaData.DateTime;
                    }
                    else if (allMetaData.DateTimeOriginal) {
                        this_.date = allMetaData.DateTimeOriginal
                    }
                    console.log("meta no gps" ,allMetaData )
                    this_.gpsInfo = "Drag the marker and publish your picture";
                } else {
                    this_.displayPlaceInfos = true,
                    this_.gpsInfo = "your picture is ready to upload"
                    this_.GPSLatitude = this_.ConvertDMSToDD(allMetaData.GPSLatitude[0], allMetaData.GPSLatitude[1], allMetaData.GPSLatitude[2], allMetaData.GPSLatitudeRef)
                    this_.GPSLongitude = this_.ConvertDMSToDD(allMetaData.GPSLongitude[0], allMetaData.GPSLongitude[1], allMetaData.GPSLongitude[2], allMetaData.GPSLongitudeRef)
                    this_.markerPosition = { lat: this_.GPSLatitude, lng: this_.GPSLongitude };
                    this_.center = [this_.GPSLatitude, this_.GPSLongitude ];
                    this_.date = allMetaData.DateTime;
                    axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${this_.GPSLatitude}&lon=${this_.GPSLongitude}`)
                        .then((res) => {
                            this_.setMapCenter() 
                            this_.zoom = 6;
                            this_.country = res.data.address.country
                            if (res.data.address.village ) {
                                if (res.data.address.village && res.data.address.viewpoint) {
                                    this_.place = res.data.address.viewpoint
                                }
                                else {
                                    this_.place = res.data.address.village
                                }
                            }
                            if (res.data.address.cliff) {
                                    this_.place = res.data.address.cliff
                            }
                            if (res.data.address.city) {
                                if (res.data.address.viewpoint) {
                                    this_.place = res.data.address.viewpoint 
                                }
                                if (res.data.address.bird_hide) {
                                    this_.place = res.data.address.bird_hide
                                }
                                if ( res.data.address.water) {
                                    this_.place = res.data.address.water
                                }
                                else {
                                    this_.place = res.data.address.city
                                }
                            }
                            if (res.data.address.hamlet) {
                                if (res.data.address.hamlet && res.data.address.viewpoint) {
                                    this_.place = res.data.address.viewpoint 
                                } else {
                                    this_.place = res.data.address.hamlet
                                }
                            }
                            if (res.data.address.attraction ) {
                                this_.place = res.data.address.attraction
                            } else if (res.data.address.road){
                                this_.place = res.data.address.road
                            }
                        })
                    }
                })


            } else {
                // eslint-disable-next-line 
                console.log(`it's not image`)
            }
        },
    }
}

</script>

<style scoped>

.container {
    overflow-y: scroll;
    overflow:hidden;
    min-height: 100%;
    margin-top: 60px;
    padding: 0px;
}

.edit-container {
    background-color: white;
    width: 100%;
    z-index: 300;
    min-height: 100%;
    overflow-y: scroll;
    overflow:hidden;
}

.v-dialog__content {
  width: 100%;
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
  font-size: 1.8em;
}

.dialog-text {
  font-weight: 400;
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

.image {
  object-fit: cover;
  width: 100%;
  height: 210px;
}

.dialog-container {
  position: absolute;
  top: 0;
  z-index: 3000;
}

@media screen and (max-width: 960px) {

}

@media screen and (max-width: 737px) {
  .v-dialog__content {
    width: 100%;
    justify-content: center;
  }
}

.map-container{
    width: 100%;
    height: 100vh;
    z-index: 3;
    opacity: 1;
}

.panel {
    background:#fff;
    font-size:16px;
    border-bottom:1px solid #e0e0e0;
    box-shadow:0 0 2px rgba(0,0,0,0.12),0 2px 4px rgba(0,0,0,0.24);
}

.content{
    padding:0px 24px 24px 24px;
}

.image-preview {
    width: 100%
}

.summary{
    outline:none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    padding-right: 10px;
    color:#212121;
    position: relative;
    font-size: 15px;
}
</style>
