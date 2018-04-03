<template>
  <div class="radarChart" :style="{ position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}">
    <echarts :option='option' :resizable='true' :theme='mydefaultheme'></echarts>
  </div>
</template>

<script>
import common from '../../common';

export default {
  name: 'radarChart',
  extends: common,
  data() {
    return {
      caption: this.options.caption || '',
      mydefaultheme: this.options.defaultheme || '',

      // 默认数据范例
      // [
      //   {
      //     "indicator": ["html", "css", "javascript", "java", "php", "c", "c++","react"],
      //     "y": [4300, 10000, 28000, 35000, 20000, 19000, 19000, 19000],
      //     "legend" :"学校"
      //   },
      //   {
      //     "indicator": ["html", "css", "javascript", "java", "php", "c", "c++","react"],
      //     "y": [5000, 14000, 28000, 31000, 22000, 21000, 19000, 19000],
      //     "legend" :"学院"
      //   }
      // ]
    };
  },
  computed: {
    option() {
      const options = {
        title: {
          text: this.caption,
        },
        tooltip: {},
        legend: {
          data: [],
        },
        radar: {
          // shape: 'circle',
          indicator: [],
        },
        series: [{
          name: '',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [],
        }],
      };
      if (this.data && this.data.length > 0) {
        this.data[0].indicator.forEach((item) => {
          options.radar.indicator.push({ name: item });
        });
        this.data.forEach((item) => {
          options.legend.data.push(item.legend);
          const serie = {
            name: item.legend,
            value: item.y,
          };
          options.series[0].data.push(serie);
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
        attributeValue: '[{"indicator":["html","css","javascript","java","php","c","c++","react"],"y":[4300,10000,28000,35000,20000,19000,19000,19000],"legend":"学校"},{"indicator":["html","css","javascript","java","php","c","c++","react"],"y":[5000,14000,28000,31000,22000,21000,19000,19000],"legend":"学院"}]',
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


