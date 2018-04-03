<template>
  <div class="cyclicPieChart" :style="{ position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}">
    <echarts :option='option' :resizable='true' :theme='mydefaultheme' ></echarts>
  </div>
</template>

<script>
import common from '../../common';

export default {
  name: 'areaPieChart',
  extends: common,
  data() {
    return {
      mydefaultheme: this.options.defaultheme || '',
      showLegend: this.options.showLegend || false,
      pieColors: this.options.pieColors || '',
    //   [{
    //       "y":10,
    //       "legend":"视频广告"
    //   },{
    //       "y":20,
    //       "legend":"百度"
    //   },{
    //       "y":30,
    //       "legend":"谷歌"
    //   },{
    //       "y":20,
    //       "legend":"必应"
    //   },{
    //       "y":20,
    //       "legend":"其他"
    //   }]
    };
  },
  computed: {
    option() {
      const options = {
        color: this.pieColors.split(','),
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          show: this.showLegend,
          top: 15,
          right: 15,
          data: [],
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [],
          },
        ],
      };
      if (this.data && this.data.length > 0) {
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
        attributeValue: '[{ "y":10, "legend":"视频广告" },{ "y":20, "legend":"百度" },{ "y":30, "legend":"谷歌" },{ "y":20, "legend":"必应" },{ "y":20, "legend":"其他" }]',
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


