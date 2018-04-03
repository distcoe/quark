<template>
  <div>
  <v-map :zoom=13 :center="[41.792193, 123.439207]">
    <v-tilelayer :url="url"></v-tilelayer>
    <v-marker :lat-lng="[30.658671, 104.066574]"></v-marker>
  </v-map>
</div>
</template>

<script>
  export default {
    data() {
      return {
        url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
      };
    },
  };
</script>

<style scoped>

</style>
