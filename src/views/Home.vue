<template>
  <div class="home">
    <!-- 指南针图标 -->
    <div class="compass">
      <img id="compass" src="../assets/image/指北针.png" />
    </div>
    <!-- 地图实例 -->
    <div class="base-map" id="base-map"></div>
    <!-- 地图切换 -->
    <div class="map-switch">
      <div class="switch-btn" @click="mapSwitch('white-map')">
        <img src="../assets/image/baidu.png" alt="白色">
        <div class="selected" v-if="whiteMapFlag">
          <img src="../assets/image/选中.png" alt="选中">
        </div>
      </div>
      <div class="switch-btn" @click="mapSwitch('dark-map')">
        <img src="../assets/image/green.png" alt="深色">
        <div class="selected" v-if="darkMapFlag">
          <img src="../assets/image/选中.png" alt="选中">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      // 是否选中白色地图
      whiteMapFlag: true,
      // 是否选中深色地图
      darkMapFlag: false,
    };
  },
  mounted() {
    this.mapInit();
  },
  methods: {
    // 初始化地图
    async mapInit() {
      let mapObj = await this.$store.dispatch("mapInit", {
        mapName: "base-map",
      });
    },
    // 地图切换
    mapSwitch(type) {
      switch (type) {
        case "white-map":
          this.whiteMapFlag = true;
          this.darkMapFlag = false;
          break;
        case "dark-map":
          this.darkMapFlag = true;
          this.whiteMapFlag = false;
          break;
        default:
          break;
      }
      this.$store.dispatch("mapSwitch", {
        layerId: type,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  .base-map {
    width: 100%;
    height: 100%;
  }
}
</style>
