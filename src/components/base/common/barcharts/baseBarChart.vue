<template>
  <div class="baseBarChart" :style="{ position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}">
    <echarts :option='option' :resizable="true" :theme='mydefaultheme'></echarts>
  </div>
</template>

<script>
import common from '../../common';

export default {
  name: 'baseBarChart',
  extends: common,
  data() {
    return {
      mydefaultheme: this.options.defaultheme || '',
      /** attributes about style */

      /** attributes about style */

      /** attributes about data */
      // 默认标题
      caption: this.options.caption || '',
      // 是否显示图列
      showLegend: this.options.showLegend || '',
      // Y轴标签
      yAxisLabel: this.options.yAxisLabel || '',
      // 是否显示图例
      isShowLegend: false,
      // toolbox选项
      showDataView: this.options.showDataView || 'false',
      showSaveAsImage: this.options.showSaveAsImage || 'false',
      showMagicType: this.options.showMagicType || 'false',
      showRestore: this.options.showRestore || 'false',

      // 柱状条颜色
      color: this.options.color || '',

      // 显示y轴标记线
      isShowMarkLine: this.options.isShowMarkLine,
      // 默认显示数据
      // example data
      // [{
      //   "x": ["新虹桥", "中山公园", "虹桥", "镇宁路", "天山古北"],
      //   "y": [20, 12, 31, 34, 31],
      //   "legend": "包租费",
      // }, {
      //   "x": ["新虹桥", "中山公园", "虹桥", "镇宁路", "天山古北"],
      //   "y": [10, 20, 5, 9, 3],
      //   "legend": "装修费",
      // }]

      /** attributes about data */
    };
  },
  computed: {
    option() {
      const options = {
        title: {
          text: this.caption,
        },
        color: this.color.split(','),
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        toolbox: {
          feature: {
            dataView: {
              show: this.showDataView !== 'false',
              readOnly: false,
            },
            saveAsImage: {
              show: this.showSaveAsImage !== 'false',
            },
            magicType: {
              show: this.showMagicType !== 'false',
              type: ['line', 'bar'],
            },
            restore: {
              show: this.showRestore !== 'false',
            },
          },
        },
        legend: {
          data: [],
          show: this.showLegend === 'true',
          align: 'right',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [{
          type: 'category',
          data: [],
        }],
        yAxis: [{
          type: 'value',
          name: this.yAxisLabel,
          axisLabel: {
            formatter: '{value}',
          },
        }],
        series: [],
      };
      if (this.data && this.data.length > 0) {
        options.xAxis[0].data = this.data[0].x;
        this.data.forEach((item) => {
          options.legend.data.push(item.legend);
          const serie = {
            name: item.legend,
            type: 'bar',
            data: item.y,
          };
          options.series.push(serie);
        });
      }
      return options;
    },
  },
  mounted() {
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
        attributeDisplayName: '显示图列',
        attributeName: 'showLegend',
        attributeValue: 'true',
      },
      {
        attributeDisplayName: 'Y轴标签',
        attributeName: 'yAxisLabel',
        attributeValue: '',
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
        attributeValue: '[{"x":["新虹桥","中山公园","虹桥","镇宁路","天山古北"],"y":[20,12,31,34,31],"legend":"包租费"},{"x":["新虹桥","中山公园","虹桥","镇宁路","天山古北"],"y":[10,20,5,9,3],"legend":"装修费"}]',
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
  },
};

</script>
<style scoped>

</style>


