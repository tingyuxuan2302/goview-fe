<!--
 * @Description: Cesium基础配置
 * @Author: 笙痞77
 * @Date: 2023-07-24 14:46:46
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-07-27 10:38:15
-->
<template>
  <div id="cesiumContainer"></div>
</template>
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import config from './config'
import * as Cesium from "cesium";

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYWE5M2QzNy1hNGFjLTQ3YzItYmU0ZS05MDkyODc1MzVhNzAiLCJpZCI6MTE1MDQwLCJpYXQiOjE2Njg1OTA2NDh9.oW-_utGumUSPqYzlWGjhG8hbda-b4UxZdL0_2t4ASig";

//   const props = defineProps({
//   themeSetting: {
//     type: Object,
//     required: true
//   },
//   themeColor: {
//     type: Object,
//     required: true
//   },
//   chartConfig: {
//     type: Object as PropType<config>,
//     required: true
//   }
// })
onMounted(() => {
  init();
});

const init = async () => {
  const viewer = new Cesium.Viewer("cesiumContainer", {
    infoBox: false,
    timeline: false, // 是否显示时间线控件
    // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
    //   url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
    // }),
    // terrainProvider: new Cesium.CesiumTerrainProvider({
    //   url: "http://data.marsgis.cn/terrain",
    // }),
    // terrain: Cesium.Terrain.fromWorldTerrain({
    //   requestVertexNormals: true, //Needed to visualize slope
    // }),
  });
  // 不显示底图
  // viewer.imageryLayers.get(0).show = false;
  // viewer.scene.globe.show = false
  // 去除logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  // 显示帧率
  viewer.scene.debugShowFramesPerSecond = true;
  viewer.scene.globe.depthTestAgainstTerrain = true;


  // viewer.camera.setView({
  //   // 从以度为单位的经度和纬度值返回笛卡尔3位置。
  //   destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
  // })

  // // 外天空盒 
  // viewer.scene.skyBox = new Cesium.SkyBox({
  //   sources: {
  //     positiveX: '/images/Standard-Cube-Map/px1.png',
  //     negativeX: '/images/Standard-Cube-Map/nx1.png',
  //     positiveY: '/images/Standard-Cube-Map/pz.png',
  //     negativeY: '/images/Standard-Cube-Map/nz1.png',
  //     positiveZ: '/images/Standard-Cube-Map/py.png',
  //     negativeZ: '/images/Standard-Cube-Map/ny1.png'
  //   }
  // })

  // 调试使用
  window.viewer = viewer

  // 监听点击事件，拾取坐标
  // const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  // handler.setInputAction((e) => {
  //   const clickPosition = viewer.scene.camera.pickEllipsoid(e.position);
  //   const randiansPos = Cesium.Cartographic.fromCartesian(clickPosition);
  //   console.log(
  //     "经度：" +
  //     Cesium.Math.toDegrees(randiansPos.longitude) +
  //     ", 纬度：" +
  //     Cesium.Math.toDegrees(randiansPos.latitude)
  //   );
  // }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};
</script>
<style lang='scss' scoped>
#cesiumContainer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>