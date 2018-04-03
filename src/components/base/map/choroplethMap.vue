<template>
  <div class="choroplethMap" :style="{ width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}">
    <echarts :option="option" :resizable="true" @click="onClick" :notMerge='true'></echarts>
  </div>
</template>

<script>
import common from '../common';

export default {
  name: 'choroplethMap',
  extends: common,
  data() {
    return {
      titleText: this.options.titleText,
      titleSubtext: this.options.titleSubtext,
      titleLeft: this.options.titleLeft,
      showTimeline: this.options.showTimeline || false,
      visualmapOrient: this.options.visualmapOrient,

      // 默认静态数据
      // [
      //     {
      //         "name": "默认名称",
      //         "mapType": "chaina",
      //         "data": [
      //             {
      //                 "name": "四川",
      //                 "value": 20057.34
      //             },
      //             {
      //                 "name": "上海",
      //                 "value": 15477.48
      //             },
      //             {
      //                 "name": "贵州",
      //                 "value": 31686.1
      //             }
      //         ]
      //     }
      // ]

    };
  },
  computed: {
    option() {
      const option = {
        timeline: {
          axisType: 'category',
          show: this.showTimeline,
          data: [],
        },
        baseOption: {
          title: {
            text: this.titleText,
            subtext: this.titleSubtext,
            left: this.titleLeft,
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}:{c}',
          },
          toolbox: {
            show: false,
          },
          // visualMap: {
          //   min: 800,
          //   max: 50000,
          //   text: ['High', 'Low'],
          //   realtime: false,
          //   calculable: true,
          //   bottom: 50,
          //   textStyle: {
          //     color: '#00eaff',
          //   },
          //   inRange: {
          //     color: ['lightskyblue', 'yellow', 'orangered'],
          //   },
          // },
          visualMap: {
            type: 'piecewise',  // 分段型
            orient: this.options.visualmapOrient,
            splitNumber: 6,
            pieces: [{
              min: 120,
              label: '120（万人）以上',
              color: '#E15956',
            }, {
              min: 60,
              max: 120,
              label: '60-120',
              color: '#FB808E',
            }, {
              min: 60,
              max: 90,
              label: '60-90',
              color: '#E7A872',
            }, {
              min: 30,
              max: 60,
              label: '30-60',
              color: '#95C5C2',
            }, {
              min: 0,
              max: 30,
              label: '0-30（万人）',
              color: '#BFE2CF',
            }],
            left: 'center',
            top: 'bottom',
            textStyle: {
              color: '#000',
            },
            // min: 0,
            // max: 60000,
            // text:['High','Low'],
            // realtime: true,
            // calculable: true,
            // color: ['red','orange','lightgreen']
          },
          series: [{
            type: 'map',
            roam: true,
            map: 'beijing',
          }],
        },
        options: [],
      };
      if (this.data && this.data.length > 0) {
        const mapData = this.data[0];
        option.timeline.data = mapData.timeline;
        option.baseOption.series[0].map = mapData.mapType;
        mapData.data.forEach((item) => {
          const series = {
            series: {
              data: item,
            },
          };
          option.options.push(series);
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
        attributeName: 'titleText',
        attributeValue: '默认标题',
      },
      {
        attributeDisplayName: '标题位置',
        attributeName: 'titleLeft',
        attributeValue: 'center',
      },
      {
        attributeDisplayName: '副标题',
        attributeName: 'titleSubtext',
        attributeValue: '副标题',
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
        attributeValue: '[{"name":"默认名称","mapType":"china","data":[{"name":"四川","value":20057.34},{"name":"上海","value":15477.48},{"name":"贵州","value":31686.1}]}]',
      },
      {
        attributeDisplayName: '数据转换格式',
        attributeName: 'defaultDataBind',
        attributeValue: ' ',
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
.choroplethMap {
  position: absolute;
}
</style>
