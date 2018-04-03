<template>
  <div>
    <div id="circleName" :style="{ position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}">
    </div>
  </div>
</template>
<script>
import echarts from 'echarts';
import 'echarts-liquidfill';
import common from '../../common';


export default {
  name: 'liquidFillChart',
  extends: common,
  data() {
    return {
      mydefaultheme: this.options.defaultheme || '',
      /** attributes about data */
      // 默认标题
      caption: this.options.caption || '',
      // Y轴标签
      yAxisLabel: this.options.yAxisLabel || '',
      // 是否显示图例
      isShowLegend: false,
      // 默认数据范例
      // [{"value": 0.6}]
      /** attributes about data */
    };
  },
  computed: {
    option() {
      const options = {
        title: {
          text: this.caption ? this.caption : '默认标题',
        },
        series: [{
          type: 'liquidFill',
          radius: '80%',
          outline: {
            borderDistance: 2,
            itemStyle: {
              borderWidth: 2,
              borderColor: '#AB4B00',
            },
          },
          itemStyle: {
            normal: {
              color: '#FF9802',
              borderWidth: '1',
            },
          },
          label: {
            normal: {
              textStyle: {
                color: '#EC7712',
                insideColor: '#EC7712',
                fontSize: 15,
              },
            },
          },
          backgroundStyle: {
            color: '#ffffff',
          },
          data: [],
        }],
      };
      if (this.data && this.data.length > 0) {
        this.data.forEach((item) => {
          const serie = item.value;
          options.series[0].data.push(serie);
        });
      }
      return options;
    },
  },
  watch: {
    options(newOptions) {
      // 属性设置联动
      Object.keys(newOptions).forEach((key) => {
        this[key] = newOptions[key];
      });
      const myChart = echarts.getInstanceByDom(this.$el.querySelector('#circleName'));
      myChart.resize();
    },
  },
  mounted() {
    if (this.refreshInterval > 0) {
      setInterval(this.getData, this.refreshInterval);
    } else {
      this.getData();
    }
    this.initCharts();
  },
  methods: {
    initCharts() {
      this.circleChart = echarts.init(this.$el.querySelector('#circleName'), this.mydefaultheme);
      this.circleChart.setOption(this.option);
    },
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
        attributeValue: '[{"value": 0.6}]',
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
