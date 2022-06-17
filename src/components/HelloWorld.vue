<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="loadMap">Primary</button>
    <GmapMap
      :center="{ lat: 35.66606091, lng: 139.41392096 }"
      :zoom="16"
      map-type-id="satellite"
      style="width: 100%; height: 500px"
      @click="mapClick"
    ></GmapMap>
  </div>
</template>

<script>
import Weiwudi from "weiwudi";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted() {

  },
  methods: {
    async loadMap() {
      await Weiwudi.registerSW("sw.js", { scope: "./" });

      // WMTS map case
      const map2 = await Weiwudi.registerMap("wmts_map", {
        type: "wmts",
        minLat: 35.0,
        maxLat: 35.1,
        minLng: 135.0,
        maxLng: 135.1,
        minZoom: 17,
        maxZoom: 18,
        url: "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
      });
      // Get url template of cached map
      const map2_url = map2.url;
      console.log(map2_url);

      // If map API access to map tile by using above url template,
      // Tile images are automatically cached in indexedDB.

      // Fetch all tiles
      map2.addEventListener("proceed", (e) => {
        // Write some codes for handling event of proceeding to fetch tiles
        console.log(e);
      });
      map2.addEventListener("finish", (e) => {
        // Write some codes for handling event of finishing to fetch tiles
        console.log(e);
      });
      map2.addEventListener("stop", (e) => {
        // Write some codes for handling event of stopping to fetch tiles by some errors
        console.log(e);
      });
      // Start fetching
      await map2.fetchAll();

      // Clean all cached tile images
      await map2.clean();

      // Remove registered map setting
      await map2.remove();
    },
    async mapClick(e) {
      try {
        console.log(e);
        //$event.latLngにクリック地点が入っている
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
