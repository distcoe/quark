<template>
  <div class="areaBarChart" :style="{ position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}">
    <echarts v-if="xAxisTriggerEvent === true" :option='option' :resizable='true' :notMerge='true' @click="xAxisClick"></echarts>
    <echarts v-else :option='option' :resizable='true' :theme='mydefaultheme' :notMerge='true'></echarts>
  </div>
</template>

<script>
import common from '../../common';

export default {
  name: 'areaBarChart',
  extends: common,
  data() {
    return {
      mydefaultheme: this.options.defaultheme || '',
      caption: this.options.caption || '',
      barColor: this.options.barColor || '',
      showDataView: this.options.showDataView || '',
      showSaveAsImage: this.options.showSaveAsImage || '',
      showMagicType: this.options.showMagicType || '',
      showRestore: this.options.showRestore || '',
      showLegend: this.options.showLegend || 'true',
      // 显示y轴标记线
      isShowMarkLine: this.options.isShowMarkLine || 'false',
      // markline数据
      markLines: [],
      // x轴是否触发事件
      xAxisTriggerEvent: this.options.xAxisTriggerEvent || false,
      // 默认数据范例
      // [
      //   {
      //     "x": ["2017/06", "2017/07", "2017/08", "2017/09", "2017/10", "2017/11", "2017/12"],
      //     "y": [120, 132, 101, 134, 90, 230, 210],
      //     "legend" :"检修一班"
      //   },
      //   {
      //     "x": ["2017/06", "2017/07", "2017/08", "2017/09", "2017/10", "2017/11", "2017/12"],
      //     "y": [320, 302, 301, 334, 390, 330, 320],
      //     "legend" :"检修二班"
      //   }
      // ]
    };
  },
  beforeMount() {

  },
  computed: {
    option() {
      const options = {
        color: this.barColor && this.barColor.length > 0 ? this.barColor.split(',') : [],
        title: {
          text: this.caption,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',       // 默认为直线，可选为：'line' | 'shadow'
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
          right: '8%',
          bottom: '3%',
          containLabel: true,
        },
        yAxis: {
          type: 'value',
        },
        xAxis: {
          type: 'category',
          name: '',
          data: [],
          triggerEvent: this.xAxisTriggerEvent,
          axisPointer: {
            type: 'shadow',
          },
        },
        series: [],
      };
      if (this.data && this.data.length > 0) {
        options.yAxis.data = this.data[0].y;
        options.xAxis.data = this.data[0].x;
        this.data.forEach((item) => {
          options.legend.data.push(item.legend);
          const serie = {
            name: item.legend,
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight',
              },
            },
            data: item.y,
          };
          options.series.push(serie);
        });
      }
      if (this.markLines.length >= 0) {
        this.markLines.forEach((lineData) => {
          const line = {
            name: lineData.label,
            type: 'line',
            lineStyle: {
              normal: {
                color: '#005CB0',
              },
            },
            markPoint: {
              symbol: '',
              symbolOffset: [0, -10],
              label: {
                normal: {
                  show: true,
                  formatter(params) {
                    return `${params.name}`;
                  },
                  textStyle: {
                    color: '#005CB0',
                    fontFamily: 'sans-serif',
                    fontSize: 14,
                    fontWeight: 'bold',
                  },
                },
              },
              itemStyle: {
                normal: {
                  color: 'transparent',
                },
              },
              data: [{
                name: lineData.label,
                xAxis: JSON.parse(lineData.value).length - 1,
                yAxis: JSON.parse(lineData.value)[JSON.parse(lineData.value).length - 1],
              }],
            },
            data: JSON.parse(lineData.value),
          };
          options.series.push(line);
        });
      }
      return options;
    },
  },
  methods: {
    // 添加对标线
    addMarkLine(linesData) {
      this.markLines = linesData;
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
        attributeDisplayName: '柱状条颜色',
        attributeName: 'barColor',
        attributeValue: 'red,green,blue,yellow',
      },
      {
        attributeDisplayName: '显示图例',
        attributeName: 'showLegend',
        attributeValue: 'true',
      },
      {
        attributeDisplayName: '数据视图按钮',
        attributeName: 'showDataView',
        attributeValue: 'false',
      },
      {
        attributeDisplayName: '图表下载按钮',
        attributeName: 'showSaveAsImage',
        attributeValue: 'false',
      },
      {
        attributeDisplayName: '图表切换按钮',
        attributeName: 'showMagicType',
        attributeValue: 'false',
      },
      {
        attributeDisplayName: '图表重置按钮',
        attributeName: 'showRestore',
        attributeValue: 'false',
      },
      {
        attributeDisplayName: '显示标记线',
        attributeName: 'isShowMarkLine',
        attributeValue: 'false',
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
        attributeValue: '[{"x":["2017/06","2017/07","2017/08","2017/09","2017/10","2017/11","2017/12"],"y":[120,132,101,134,90,230,210],"legend":"检修一班"},{"x":["2017/06","2017/07","2017/08","2017/09","2017/10","2017/11","2017/12"],"y":[320,302,301,334,390,330,320],"legend":"检修二班"}]',
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
        eventType: ['click', 'xAxisClick', 'dblclick', 'mousedown', 'mousemove', 'mouseup', 'mouseover', 'mouseout'],
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
    xAxisClick(data) {
      if (data.componentType === 'xAxis') {
        this.$emit('xAxisClick', data);
      }
    },
    /** compoments action end */
  },
};
</script>
<style scoped>
</style>


