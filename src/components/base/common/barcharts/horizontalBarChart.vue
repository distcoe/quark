<template>
  <div class="horizontalBarChart" :style="{ position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}">
    <echarts :option='option' :resizable='true' :theme='mydefaultheme' @click="onClick"></echarts>
  </div>
</template>
<script>
import common from '../../common';

export default {
  name: 'horizontalBarChart',
  extends: common,
  data() {
    return {
      mydefaultheme: this.options.defaultheme || '',
      caption: this.options.caption || '',
      // 显示y轴
      showYaxis: this.options.showYaxis || 'false',
      // 显示x轴
      showXaxis: this.options.showXaxis || false,
      // 显示图列
      showLegend: this.options.showLegend || false,
      // 柱状条颜色
      barColors: this.options.barColors || '',
      fontColor: this.options.fontColor || '',
      // 数据堆叠显示名称
      stackName: this.options.stackName,
      // y轴是否触发事件
      yAxisTriggerEvent: this.options.yAxisTriggerEvent || false,
    };
  },
  computed: {
    option() {
      const options = {
        color: this.barColors.split(','),
        title: {
          text: this.caption,
          subtext: '',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          show: this.showLegend,
          top: 15,
          data: [],
        },
        toolbox: {
          show: false,
        },
        grid: {
          // left: '-20%',
          // top: '0%',
          // bottom: '-10%',
          containLabel: true,
        },
        xAxis: {
          show: this.showXaxis,
          type: 'value',
          // boundaryGap: [0, 0.01],
        },
        yAxis: {
          show: this.showYaxis === 'true',
          type: 'category',
          triggerEvent: this.yAxisTriggerEvent,
          data: [],
        },
        series: [],
      };
      if (this.data && this.data.length > 0) {
        options.yAxis.data = this.data[0].x;
        this.data.forEach((item) => {
          options.legend.data.push(item.legend);
          const serie = {
            name: item.legend,
            type: 'bar',
            data: item.y,
          };
          if (this.stackName) {
            serie.stack = this.stackName;
          }
          options.series.push(serie);
        });
      }
      return options;
    },
  },
  methods: {
    /** get all attributes  所有可在页面设计器中设置的属性 */
    getAttributes() {
      return [{
        attributeDisplayName: '宽度',
        attributeName: 'width',
        attributeValue: '200px',
      },
      {
        attributeDisplayName: '高度',
        attributeName: 'height',
        attributeValue: '150px',
      },
      {
        attributeDisplayName: 'TOP',
        attributeName: 'top',
        attributeValue: '0',
      },
      {
        attributeDisplayName: 'LEFT',
        attributeName: 'left',
        attributeValue: '0',
      },
      {
        attributeDisplayName: '堆叠顺序',
        attributeName: 'zIndex',
        attributeValue: '1',
      },
      {
        attributeDisplayName: '标题',
        attributeName: 'caption',
        attributeValue: '默认标题',
      },
      {
        attributeDisplayName: '显示Y轴',
        attributeName: 'showYaxis',
        attributeValue: 'false',
      },
      {
        attributeDisplayName: '柱状条颜色',
        attributeName: 'barColors',
        attributeValue: 'red',
      },
      {
        attributeDisplayName: '颜色',
        attributeName: 'fontColor',
        attributeValue: 'white',
      },
      {
        attributeDisplayName: '绑定数据类型',
        attributeName: 'dataType',
        attributeValue: '0',
      },
      {
        attributeDisplayName: '数据更新周期',
        attributeName: 'refreshInterval',
        attributeValue: '0',
      },
      {
        attributeDisplayName: '静态数据',
        attributeName: 'staticData',
        attributeValue: ' ',
      },
      {
        attributeDisplayName: '数据API地址',
        attributeName: 'dataUrl',
        attributeValue: ' ',
      },
      {
        attributeDisplayName: '默认静态数据',
        attributeName: 'defaultData',
        attributeValue: '[{"x":["北京","长沙","天津","太原","石家庄","广州","重庆"],"y":[160, 170, 240, 264, 300, 520, 610],"legend":"2011"}]',
      },
      {
        attributeDisplayName: '数据转换格式',
        attributeName: 'defaultDataBind',
        attributeValue: ' ',
      },
      {
        attributeDisplayName: '默认主题',
        attributeName: 'defaultheme',
        attributeValue: 'shine',
      }];
    },
    /** get all event config */
    getComponentEventConfig() {
      return [{
        eventTarget: 'default',
        dataMethod: 'getDefaultData',
        eventType: ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseup', 'mouseover', 'mouseout'],
      }];
    },
    /** data handler */
    getDefaultData() {
      return this.data;
    },
    /** data handler */
    /** get all actions */
    getComponentAction() {
      return [{
        action: 'getData',
        parameter: '',
      },
      ];
    },
    /** compoments action begin */
    onClick(event) {
      this.$emit('selected', event.data);
    },
    /** compoments action end */
  },
};
</script>
<style scoped>

</style>
