<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <div class="row">
      <div class="col-sm">
        <div class="form-check">
          <input
            v-model="radio"
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios1"
            value="mitake"
            checked
          />
          <label class="form-check-label" for="exampleRadios1"> 御岳 </label>
        </div>
      </div>
      <div class="col-sm">
        <div class="form-check">
          <input
            v-model="radio"
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios2"
            value="oga"
          />
          <label class="form-check-label" for="exampleRadios2"> 男鹿 </label>
        </div>
      </div>
      <div class="col-sm">
        <div class="form-check">
          <input
            v-model="radio"
            class="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios3"
            value="yaen"
          />
          <label class="form-check-label" for="exampleRadios3"> 野猿谷 </label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <div class="form-group">
          <label for="minLat">最小緯度</label>
          <input
            v-model="minLat"
            type="number"
            class="form-control"
            id="minLat"
            aria-describedby="emailHelp"
            placeholder="最小緯度"
          />
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label for="maxLat">最小緯度</label>

          <input
            v-model="maxLat"
            type="number"
            class="form-control"
            id="maxLat"
            aria-describedby="emailHelp"
            placeholder="最大緯度"
          />
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label for="minLng">最小経度</label>
          <input
            v-model="minLng"
            type="number"
            class="form-control"
            id="minLng"
            aria-describedby="emailHelp"
            placeholder="最小経度"
          />
        </div>
      </div>
      <div class="col-sm">
        <div class="form-group">
          <label for="maxLng">最大経度</label>
          <input
            v-model="maxLng"
            type="number"
            class="form-control"
            id="maxLng"
            aria-describedby="emailHelp"
            placeholder="最大経度"
          />
        </div>
      </div>
    </div>
    <button class="mb-2 mr-2 btn btn-primary" @click="loadMap">Download</button>
    <button class="mb-2 mr-2 btn btn-primary" @click="clearMap">Clear</button>
    <button class="mb-2 mr-2 btn btn-primary" @click="removeMap">Remove</button>
    <button class="mb-2 mr-2 btn btn-success" @click="addImageType">
      load
    </button>

    <p>{{ message }}</p>
    <div class="progress">
      <div
        class="progress-bar"
        role="progressbar"
        :style="current"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <div id="map" ref="map" style="height: 500px; width: 100%"></div>
    <!-- <GmapMap
      :center="{ lat: 35.66606091, lng: 139.41392096 }"
      :zoom="16"
      map-type-id="satellite"
      style="width: 100%; height: 500px"
      @click="mapClick"
    ></GmapMap> -->
  </div>
</template>

<script>
import Weiwudi from "weiwudi";
const scriptjs = require("scriptjs");

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      status: "-",
      message: "-",
      current: "",
      weiMap: null,
      map: null,
      radio: "mitake",
      minLat: 35.7984073609935,
      maxLat: 35.80873898225876,
      minLng: 139.1706436352481,
      maxLng: 139.1916484833182,
    };
  },
  created() {
    scriptjs(
      "https://maps.googleapis.com/maps/api/js?key=" +
        process.env.VUE_APP_MAPS_API_KEY +
        "&libraries=geometry&region=JP&language=ja",
      "loadGoogleMap"
    );
    scriptjs.ready("loadGoogleMap", this.createMap);
  },
  watch: {
    radio(value) {
      console.log(value);
      switch (value) {
        case "mitake":
          this.minLat = 35.7984073609935;
          this.maxLat = 35.80873898225876;
          this.minLng = 139.1706436352481;
          this.maxLng = 139.1916484833182;
          break;
        case "oga":
          this.minLat = 39.85673037525876;
          this.maxLat = 39.86499908835131;
          this.minLng = 139.76958756570582;
          this.maxLng = 139.7812832773331;
          break;
        case "yaen":
          this.minLat = 35.78301304754374;
          this.maxLat = 35.796313836616164;
          this.minLng = 138.57158646655625;
          this.maxLng = 138.58453538436397;
          break;
        default:
          break;
      }
      this.createMap();
    },
  },
  mounted() {},
  methods: {
    async createMap() {
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        //中心座標
        center: { lat: this.calcCenter(this.minLat, this.maxLat), lng: this.calcCenter(this.minLng, this.maxLng) },
        //zoom
        zoom: 14,
        //スクロール設定
        gestureHandling: this.gestureHandling, //スクロール設定
        //マップタイプ(地図、航空写真) コントロール
        mapTypeControl: true,
        //全画面表示コントロール
        fullscreenControl: false,
        //ストリートビュー コントロール
        streetViewControl: false,
        //ズーム コントロール
        zoomControl: true,
      });
    },
    calcCenter(a, b) {
      return ((a + b) / 2)
    },
    addImageType() {
      const self = this;
      const offlineMapType = new window.google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
          var url = self.weiMap.url
            .replace("{x}", coord.x)
            .replace("{y}", coord.y)
            .replace("{z}", zoom);
          return url;
        },
        tileSize: new window.google.maps.Size(256, 256),
        maxZoom: 18,
        minZoom: 14,
        name: "offline_map",
      });
      this.map.overlayMapTypes.insertAt(0, offlineMapType);
    },
    async loadMap() {
      await Weiwudi.registerSW("sw.js", { scope: "./" });
      let url = "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}";
      //let url = "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png"

      // WMTS map case
      this.weiMap = await Weiwudi.registerMap("wmts_map", {
        type: "wmts",
        minLat: this.minLat,
        maxLat: this.maxLat,
        minLng: this.minLng,
        maxLng: this.maxLng,
        minZoom: 14,
        maxZoom: 18,
        url: url,
      });

      // If map API access to map tile by using above url template,
      // Tile images are automatically cached in indexedDB.

      // Fetch all tiles
      this.weiMap.addEventListener("proceed", (e) => {
        let detail = e.detail;
        this.current = `width: ${detail.percent}%`;
        this.message = detail.message;
        // Write some codes for handling event of proceeding to fetch tiles
        console.log(e);
      });
      this.weiMap.addEventListener("finish", (e) => {
        this.message = e.detail.type;
        // Write some codes for handling event of finishing to fetch tiles
        console.log(e);
      });
      this.weiMap.addEventListener("stop", (e) => {
        // Write some codes for handling event of stopping to fetch tiles by some errors
        console.log(e);
      });
      // Start fetching
      await this.weiMap.fetchAll();
    },
    async mapClick(e) {
      try {
        console.log(e);
        //$event.latLngにクリック地点が入っている
      } catch (err) {
        console.log(err);
      }
    },
    async clearMap() {
      // Clean all cached tile images
      await this.weiMap.clean();
    },
    async removeMap() {
      // Remove registered map setting
      await this.weiMap.remove();
    },
  },
};
</script>
