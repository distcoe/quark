<template>
  <div class="baseLineChart" :style="{ position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}">
    <echarts :option='option' :resizable='true' :theme='mydefaultheme'></echarts>
  </div>
</template>

<script>
import common from '../../common';

export default {
  name: 'baseLineChart',
  extends: common,
  data() {
    return {
      caption: this.options.caption || '',
      mydefaultheme: this.options.defaultheme || '',

      // 默认数据范例
      // [
      //   {
      //     "x": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      //     "y": [120, 132, 101, 134, 90, 230, 210],
      //     "legend" :"邮件营销"
      //   },
      //   {
      //     "x": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      //     "y": [220, 182, 191, 234, 290, 330, 310],
      //     "legend" :"联盟广告"
      //   }
      // ]
    };
  },
  computed: {
    option() {
      const options = {
        title: {
          text: this.caption || '默认',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: [],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [],
      };
      if (this.data && this.data.length > 0) {
        options.xAxis.data = this.data[0].x;
        this.data.forEach((item) => {
          options.legend.data.push(item.legend);
          const serie = {
            name: item.legend,
            type: 'line',
            stack: '总量',
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
        attributeValue: '[{"x":["周一","周二","周三","周四","周五","周六","周日"],"y":[120,132,101,134,90,230,210],"legend":"邮件营销"},{"x":["周一","周二","周三","周四","周五","周六","周日"],"y":[220,182,191,234,290,330,310],"legend":"联盟广告"}]',
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


