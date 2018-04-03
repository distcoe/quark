<template>
  <div class='cooldashboard' :style='{ position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}'>
    <echarts :option="option" :resizable='true' :theme='mydefaultheme'></echarts>
  </div>
</template>

<script>
import common from '../../common';

export default {
  name: 'cooldashboard',
  extends: common,
  data() {
    return {
      mydefaultheme: this.options.defaultheme || '',
    };
  },
  computed: {
    option() {
      const options = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%',
        },
        toolbox: {
          show: true,
          feature: {
            restore: {
              show: true,
            },
            saveAsImage: {},
          },
        },
        series: [
          {
            type: 'gauge',
            min: 0,
            max: 100,
            detail: {
              formatter: '{value}%',
              fontSize: 12,
              show: true,
              color: 'rgb(251, 118, 123)',
            },
            axisTick: {
              show: true,
              splitNumber: 5,
              length: 8,
              lineStyle: {
                color: '#eee',
                width: 1,
                type: 'solid',
              },
            },
            spitNumber: 5,
            axisLine: {
              lineStyle: {
                width: 30,
              },
            },
            splitLine: {
              length: 30,
            },
            pointer: {
              length: '90%',
              width: 8,
            },
            title: {
              color: 'rgba(46, 90, 98, 988)',
              fontSize: 12,
            },
            axisLabel: {
              show: true,
              color: 'rgb(129, 227, 238)',
              distance: 5,
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: 12,
            },
            data: [],
          },
        ],
      };
      if (this.data && this.data.length > 0) {
        this.data.forEach((item) => {
          const serie = {
            value: item.y,
            name: item.name,
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
          attributeValue: '[{"y": "80","name":"CPU占用率"}]',
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


