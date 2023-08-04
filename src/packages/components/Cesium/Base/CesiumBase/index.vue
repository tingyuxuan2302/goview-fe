<!--
 * @Description: Cesium基础配置
 * @Author: 笙痞77
 * @Date: 2023-07-24 14:46:46
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-08-04 16:33:29
-->
<template>
  <div id="cesiumContainer"></div>
</template>
<script setup>
import * as Cesium from "cesium";
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { ref, onMounted, toRefs, watch } from 'vue';
import { LocationEnum } from "./config"
import { getImg } from '@/api/path'

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYWE5M2QzNy1hNGFjLTQ3YzItYmU0ZS05MDkyODc1MzVhNzAiLCJpZCI6MTE1MDQwLCJpYXQiOjE2Njg1OTA2NDh9.oW-_utGumUSPqYzlWGjhG8hbda-b4UxZdL0_2t4ASig";

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true
  }
})
let {
  center,
  locationMode,
  markImgUrl,
  markGeojsonData
} = toRefs(props.chartConfig.option.viewOptions)
onMounted(() => {
  init();
});
let viewer = null
const stopWatch = watch(
  () => props.chartConfig.option.viewOptions,
  options => {
    init(options)
  },
  {
    // immediate: true,
    deep: true
  }
)

const init = async (opts) => {
  if (opts) {
    // 当配置属性发生变化时触发当前分支
    const watchCenter = opts.center
    const {
      center: watch_center,
      locationMode: watch_locationMode,
      markImgUrl: watch_markImgUrl,
      markGeojsonData: watch_markGeojsonData,
    } = opts
    // 中心坐标
    const centerArr = watch_center?.split(",")
    if (centerArr?.length) {
      const arr = centerArr.map(Number)
      cameraLocation(watch_locationMode, arr)
    }
    if (watch_markGeojsonData) {
      renderMarks(watch_markGeojsonData.features, watch_markImgUrl)
    }
  } else {
    // 初始化
    viewer = new Cesium.Viewer("cesiumContainer", {
      infoBox: false,
      timeline: false, // 是否显示时间线控件
    });
    // 不显示底图
    // viewer.imageryLayers.get(0).show = false;
    // viewer.scene.globe.show = false
    // 去除logo
    viewer.cesiumWidget.creditContainer.style.display = "none";
    // 显示帧率
    viewer.scene.debugShowFramesPerSecond = true;
    viewer.scene.globe.depthTestAgainstTerrain = true;

    const centerArr = center.value?.split(",")
    if (centerArr?.length) {
      const arr = centerArr.map(Number)
      cameraLocation(locationMode.value, arr)
    }

    // 调试使用
    window.viewer = viewer

  }
};

const fly = (option) => {
  const lntlon = option.lntlon
  viewer.camera.flyTo({
    // 从以度为单位的经度和纬度值返回笛卡尔3位置。
    destination: Cesium.Cartesian3.fromDegrees(...lntlon, 40000),
    orientation: {
      // heading：默认方向为正北，正角度为向东旋转，即水平旋转，也叫偏航角。
      // pitch：默认角度为-90，即朝向地面，正角度在平面之上，负角度为平面下，即上下旋转，也叫俯仰角。
      // roll：默认旋转角度为0，左右旋转，正角度向右，负角度向左，也叫翻滚角
      heading: Cesium.Math.toRadians(0.0), // 正东，默认北
      pitch: Cesium.Math.toRadians(-90), // 向正下方看
      roll: 0.0, // 左右
    },
    duration: 3, // 飞行时间（s）
  })
}
const setView = (option) => {
  const lntlon = option.lntlon
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(...lntlon, 40000),
  })
}

const cameraLocation = (locationMode, lntlon) => {
  if (locationMode === LocationEnum.FLY) {
    fly({
      lntlon
    })
  } else if (locationMode === LocationEnum.SET_VIEW) {
    setView({ lntlon })
  }
}

const renderMarks = async (json, imgName) => {
  const imgRes = await getImg({
    fileName: imgName
  })
  let imgUrl = ""
  if (imgRes.data) {
    imgUrl = imgRes.data.imgUrl
  }
  if (json?.length) {
    formatJsonData(json, imgUrl)
  }
}
const formatJsonData = (features, img) => {

  const billboardsCollection = viewer.scene.primitives.add(
    new Cesium.BillboardCollection()
  );
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    const coordinates = feature.geometry.coordinates;
    const position = Cesium.Cartesian3.fromDegrees(
      coordinates[0],
      coordinates[1]
    );
    const name = feature.properties.name;
    // 带图片的点
    billboardsCollection.add({
      image: img,
      width: 32,
      height: 32,
      position,
    });
  }
}

const consolef = () => {
  console.log("-----测试点击----", "吊桶啦")
}

// 预览
// useChartDataFetch(props.chartConfig, useChartEditStore, () => {
//   stopWatch()
//   // dataHandle(newData)
// })
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