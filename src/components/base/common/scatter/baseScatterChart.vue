<template>
  <div class='baseScatterChart' :style='{ position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}'>
     <echarts :option='option' :resizable='true' :theme='mydefaultheme'></echarts>
  </div>
</template>

<script>
import echarts from 'echarts';
import common from '../../common';

export default {
  name: 'baseScatterChart',
  extends: common,
  data() {
    return {
      mydefaultheme: this.options.defaultheme || '',
    };
  },
  computed: {
    option() {
      const options = {
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
          {
            offset: 0,
            color: '#f7f8fa',
          },
          {
            offset: 1,
            color: '#cdd0d5',
          },
        ]),
        title: {
          text: '上海数慧系统技术有限公司',
        },
        legend: {
          right: 10,
          data: ['1990', '2015'],
        },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
          scale: true,
        },
        series: [
          {
            name: '1990',
            data: [],
            type: 'scatter',
            /* symbolSize(data) {
              return data[0];
            }, */
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(251, 118, 123)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(204, 46, 72)',
                  },
                ]),
              },
            },
          },
          {
            name: '2017',
            data: [],
            type: 'scatter',
            /* symbolSize(data) {
              return data[0];
            }, */
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(129, 227, 238)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(25, 183, 207)',
                  },
                ]),
              },
            },
          },
        ],
      };
      if (this.data && this.data.length > 0) {
        options.yAxis.data = [55, 60, 65, 70, 75, 80, 85].y;
        options.xAxis.data = this.data[0].x;
        this.data.forEach((item) => {
          options.legend.data.push(item.legend);
          const serie = {
            name: item.legend,
            type: 'scatter',
            data: item.y,
           // symbolSize: item.y,
            symbolSize(data) {
              return data[0] * 5;
            },
            label: {
              emphasis: {
                show: true,
                formatter(param) {
                  return param.l;
                },
                position: 'top',
              },
            },
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
      return [
        {
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
          attributeValue: '[{"x": ["10000","20000","30000","40000","50000","60000","70000"],"y": ["70","50.5","69","30","23","89","50"],"l": ["Australia","China","","Cuba","Finland","France","India"],"legend": "1990"},{"x": ["10000","20000","30000","40000","50000","60000","70000"],"y": ["10.8","81.7","60.9","30.7","71.7","21.7","91.7"],"l": ["Australia","China","","Cuba","Finland","France","India"],"legend": "2015"}]',
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
        },
      ];
    },
    /** get all event config */
    getComponentEventConfig() {
      return [
        {
          eventTarget: 'default',
          dataMethod: 'getDefaultData',
          eventType: [
            'click',
            'dblclick',
            'mousedown',
            'mousemove',
            'mouseup',
            'mouseover',
            'mouseout',
          ],
        },
      ];
    },
    /** data handler */
    getDefaultData() {
      return this.data;
    },
    /** data handler */

    /** get all actions */
    getComponentAction() {
      return [
        {
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


