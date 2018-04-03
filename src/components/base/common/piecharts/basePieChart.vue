<template>
  <div class="basePieChart" :style="{ position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}">
    <echarts :option='option' :resizable='true' :theme='mydefaultheme'></echarts>
  </div>
</template>

<script>
import common from '../../common';

export default {
  name: 'basePieChart',
  extends: common,
  data() {
    return {
      mydefaultheme: this.options.defaultheme || '',
      /** attributes about data */
      // 默认标题
      caption: this.options.caption || '',

      color: this.options.color || '',
      // 是否显示图例
      isShowLegend: false,
      // 显示时间线
      showTimeline: this.options.showTimeline || false,
      // 当前显示数据
      currentDataSerie: this.options.currentDataSerie || '',
      // 默认显示数据
      // example data
      // [{
      //     "y":50,
      //     "legend":"南宁-曼芭"
      // },{
      //     "y":40,
      //     "legend":"桂林-曼芭"
      // },{
      //     "y":10,
      //     "legend":"北海-曼芭"
      // }]

      /** attributes about data */
    };
  },
  computed: {
    option() {
      const option = {};

      option.baseOption = {
        title: {
          text: this.caption,
          x: 'center',
        },
        timeline: {
          axisType: 'category',
          show: this.showTimeline,
          top: '10',
          currentIndex: 0,
          data: [],
        },
        color: this.color.split(','),
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          show: false,
          orient: 'vertical',
          left: 'left',
          data: [],
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      option.options = [];
      if (this.data && this.data.length > 0) {
        this.data.forEach((item) => {
          option.baseOption.timeline.data.push(item.serie);
          if (item.serie === this.currentDataSerie) {
            option.baseOption.timeline.currentIndex = option.baseOption.timeline.data.length - 1;
          }
          const data = {
            series: [{
              data: [],
            }],
          };
          item.data.forEach((serie) => {
            option.baseOption.legend.data.push(serie.legend);
            const pieBlock = {
              name: serie.legend,
              value: serie.y,
            };
            data.series[0].data.push(pieBlock);
          });
          option.options.push(data);
        });
      }
      return option;
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
        attributeValue: '',
      },
      {
        attributeDisplayName: '是否显示图例',
        attributeName: 'isShowLegend',
        attributeValue: 'false',
      },
      {
        attributeDisplayName: '颜色',
        attributeName: 'color',
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
        attributeValue: '[{"serie":2017,"data":[{"y":50,"legend":"南宁-曼芭"},{"y":40,"legend":"桂林-曼芭"},{"y":10,"legend":"北海-曼芭"}]}]',
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


