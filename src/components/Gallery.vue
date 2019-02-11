<template>
  <div>
    <gallery :images="images" :index="index" @close="index = null"></gallery>
      <div class="gallery-container main-bg-blue">
        <div class="image-container" v-for="(image, imageIndex) in images" :key="imageIndex">
        <img
          class="image"
          @click="index = imageIndex"
          v-bind:src="image"
        />
        </div>
      </div>
      <!-- <Map class="custom-map"/> -->
  </div>
</template>
 
<script>
  import axios from "axios";
  import VueGallery from 'vue-gallery';
  
  export default {
    data: function () {
      return {
        markersData: {},
        images: [],
        index: null
      };
    },
      beforeCreate() {
        axios.get('./helpers.json')
        .then((response) => {
          // console.log(response.data)
          this.markersData = response.data
          for (let item in response.data) {
            let itemSrc = response.data[item].src
            this.images.push(`${itemSrc}`);
          }
        })
      },
 
    components: {
      gallery: VueGallery,
    },
  }
</script> 
 
<style scoped>
.custom-map {
  width: 40%;
}

.gallery-container {
  margin-top:50px;
  overflow-y: scroll;
  overflow: hidden;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  right: 0;
}

.image-container {
  width: 25%;
  height: 210px;
  overflow: hidden;

}

.image {
  object-fit: cover;
  width: 100%;
  height: 210px;
  transition: width 0.5s, height 0.5s;
}
.image:hover {
  object-fit: cover;
  width: 110%;
  height: 225px;
}

@media screen and (max-width: 960px) {
  
  .gallery-container {
    margin-top: 48px;
  }

  .image-container {
    width: 50%;
  }

}

@media screen and (max-width: 737px) {

  .gallery-container {
    width: 100%;
  }

  .image-container {
    width: 100%;
  }

  .images {
    border: 2px solid #ebebeb;
    margin: 0px;
    width: 100%;
  }
}
</style> 