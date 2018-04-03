<template>
  <div class="areaLineChart" :style="{ position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}">
    <echarts :option='option' :resizable='true' :theme='mydefaultheme'></echarts>
  </div>
</template>

<script>
import common from '../../common';

export default {
  name: 'areaLineChart',
  extends: common,
  data() {
    return {
      caption: this.options.caption || '',
      mydefaultheme: this.options.defaultheme || '',

      // 默认数据范例
      // [
      //   {
      //     "x": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      //     "y": [96.3, 96.4, 97.5, 95.6, 98.1, 94.8, 89.6, 94.1, 80.1, 52.4, 75.8, 94.7],
      //     "legend": "南宁-曼芭"
      //   },
      //   {
      //     "x": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      //     "y": [97.3, 99.2, 99.3, 100.0, 99.6, 90.6, 80.0, 91.5, 69.8, 67.5, 90.4, 84.9],
      //     "legend": "桂林-曼芭"
      //   }
      // ]
    };
  },
  computed: {
    option() {
      const options = {
        title: {
          text: this.caption || '默认',
          left: '6%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B',
            },
          },
        },
        legend: {
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: [],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B',
            },
          },
          data: [],
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#57617B',
            },
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14,
            },
          },
          splitLine: {
            lineStyle: {
              color: '#57617B',
            },
          },
        }],
        series: [],
      };
      if (this.data && this.data.length > 0) {
        options.yAxis.data = this.data[0].x;
        this.data.forEach((item) => {
          options.legend.data.push(item.legend);
          const serie = {
            name: item.legend,
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)',
              },
            },
            data: item.y,
          };
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
        attributeValue: '[{"x":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"y":[96.3,96.4,97.5,95.6,98.1,94.8,89.6,94.1,80.1,52.4,75.8,94.7],"legend":"南宁-曼芭"},{"x":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"y":[97.3,99.2,99.3,100.0,99.6,90.6,80.0,91.5,69.8,67.5,90.4,84.9],"legend":"桂林-曼芭"}]',
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

    /** compoments action end */
  },
};
</script>
<style scoped>

</style>


