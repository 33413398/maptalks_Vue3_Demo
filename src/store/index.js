import { createStore } from "vuex";
import "maptalks/dist/maptalks.css";
import * as maptalks from "maptalks";

export default createStore({
  state: {
    mapObj: null,
  },
  mutations: {},
  actions: {
    // 初始化地图
    async mapInit({ getters, commit, state }, { mapName }) {
      let map = new maptalks.Map(mapName, {
        // 地图初始中心点坐标
        center: [114.33795683551146, 30.585243318889884],
        // 地图初始默认层级
        zoom: 17,
        // 地图可滚动最小层级
        minZoom: 1,
        // 地图可滚动最大层级
        maxZoom: 19,
        // 地图投影属性
        spatialReference: {
          projection: "baidu",
        },
        // 地图投影组 设置多个可做地图切换功能
        // 注意：base-map  这里要与页面中dom地图容器id名相同
        baseLayer: new maptalks.GroupTileLayer("base-map", [
          // 百度白色底图
          new maptalks.TileLayer("white-map", {
            // 投影路径
            urlTemplate:
              "http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1",
            // 路径参数
            subdomains: [0, 1, 2],
            // 左下角
            attribution:
              '&copy; <a target="_blank" href="http://map.baidu.com">Baidu</a>',
          }),
          //百度深色底图
          new maptalks.TileLayer("dark-map", {
            urlTemplate:
              "http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20170620&scale=1&ak=8d6c8b8f3749aed6b1aff3aad6f40e37&styles=t%3Awater%7Ce%3Aall%7Cc%3A%23044161%2Ct%3Aland%7Ce%3Aall%7Cc%3A%23091934%2Ct%3Aboundary%7Ce%3Ag%7Cc%3A%23064f85%2Ct%3Arailway%7Ce%3Aall%7Cv%3Aoff%2Ct%3Ahighway%7Ce%3Ag%7Cc%3A%23004981%2Ct%3Ahighway%7Ce%3Ag.f%7Cc%3A%23005b96%7Cl%3A1%2Ct%3Ahighway%7Ce%3Al%7Cv%3Aon%2Ct%3Aarterial%7Ce%3Ag%7Cc%3A%23004981%7Cl%3A-39%2Ct%3Aarterial%7Ce%3Ag.f%7Cc%3A%2300508b%2Ct%3Agreen%7Ce%3Aall%7Cv%3Aoff%7Cc%3A%23056197%2Ct%3Asubway%7Ce%3Aall%7Cv%3Aoff%2Ct%3Amanmade%7Ce%3Aall%7Cv%3Aoff%2Ct%3Alocal%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aarterial%7Ce%3Al%7Cv%3Aon%2Ct%3Aboundary%7Ce%3Ag.f%7Cc%3A%23029fd4%2Ct%3Abuilding%7Ce%3Aall%7Cc%3A%231a5787%2Ct%3Apoi%7Ce%3Aall%7Cv%3Aoff%2Ct%3Aall%7Ce%3Al%7Cv%3Aoff",
            subdomains: [0, 1, 2],
            visible: false,
            attribution:
              '&copy; <a target="_blank" href="http://map.baidu.com">Baidu</a>',
          }),
        ]),
      });

      // 指北针 实现
      // 监听地图旋转，拿到度数
      map.on("rotate", function (param) {
        let angle = 0;
        if (param.from === 0) {
          angle = 0;
        }
        if (param.from < 0) {
          angle = -param.from;
        } else if (param.from <= 179.9999999999999 && param.from > 0) {
          angle = 360 - param.from;
        }
        // 获取元素 ———— 指北针图标的ID
        let ele = document.getElementById("compass");
        // 设置度数
        ele.style.transform = "rotate(" + angle + "deg)";
      });
      // 将地图实例存储到全局
      state.mapObj = map;
      // 返回地图实例
      return map;
    },
    // 地图切换
    async mapSwitch({ getters, commit, state, dispatch }, { layerId }) {
      if (!state.mapObj) {
        // 地图不存在
        dispatch("mapInit", {
          mapName: "base-map",
        });
      }
      // 地图存在
      const baseLayer = state.mapObj.getBaseLayer(); // 获取地图投影数组
      // 便利地图投影数组
      baseLayer.layers.forEach((layer) => {
        // 是否是该投影
        if (layer.getId() === layerId) {
          layer.show();
        } else {
          layer.hide();
        }
      });
    },
  },
  modules: {},
});
