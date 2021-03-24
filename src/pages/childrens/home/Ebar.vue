<template>
    <!--图表渲染的容器: 一定要指定高度-->
  <div id="container"></div>
</template>

<script>
// 1-导入echarts
import * as echarts from "echarts";
export default {
  mounted() {
    // 1-获取容器对应的dom对象
    const dom = document.querySelector("#container");
    // 2-初始化
    const instance = echarts.init(dom);
    // 3-设置配置对象
    instance.setOption(this.barOptions);
  },
  data() {
    return {
      // 柱状图需要的配置对象
      barOptions: {
        //   图表标题
        title: {
          text: "柱状图"
        },
        // 鼠标悬浮的提示
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar", // 控制图表形状
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            }
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
#container {
  height: 400px;
}
</style>