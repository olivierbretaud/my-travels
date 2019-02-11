<template>
      <div class="search-container">
        <div class="search-card">
            <v-select
            :items="items"
            label="Search on travels"
            solo
              ></v-select>
        </div>
      </div>
</template>

<script>
export default {
  name: 'Search',
    data() {
    return {
      items: [
        { text: 'travel to South-america'},
        { text: 'Argentina', value: 'sm' },
        { text: 'Bolivia', value1: 'md' },
        { text: 'Chili', value: 'lg' },
      ]
    };
  },
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
.v-menu__content {
  top: 0px !important;
  left: 0px !important;
}
.v-input__slot {
  margin-bottom: 0px !important;
}

.search-card {
}
</style>

