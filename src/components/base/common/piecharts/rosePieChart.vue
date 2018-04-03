<template>
  <div class="rosePieChart" :style="{ position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}">
    <echarts :option='option' :resizable='true' :theme='mydefaultheme' @click="onClick"></echarts>
  </div>
</template>

<script>
  import common from '../../common';

  export default {
    name: 'rosePieChart',
    extends: common,
    data() {
      return {
        mydefaultheme: this.options.defaultheme || '',
        caption: this.options.caption || '',
        showLegend: this.options.showLegend || false,
        pieColors: this.options.pieColors || '',
      // 默认数据范例
      // [{
      //     "y":10,
      //     "legend":"rose1"
      // },{
      //     "y":5,
      //     "legend":"rose2"
      // },{
      //     "y":15,
      //     "legend":"rose3"
      // },{
      //     "y":25,
      //     "legend":"rose4"
      // },{
      //     "y":20,
      //     "legend":"rose5"
      // },{
      //     "y":30,
      //     "legend":"rose6"
      // },{
      //     "y":30,
      //     "legend":"rose7"
      // },{
      //     "y":40,
      //     "legend":"rose8"
      // }]
      };
    },
    computed: {
      option() {
        const options = {
          color: this.pieColors.split(','),
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            show: this.showLegend,
            data: [],
          },
          toolbox: {
            show: false,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: {
                show: true,
                type: ['pie', 'funnel'],
              },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          calculable: true,
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['25%', '55%'],
              center: ['50%', '50%'],
              roseType: 'area',
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
          attributeValue: '[{"y":10, "legend":"rose1"},{"y":5,"legend":"rose2"},{"y":15,"legend":"rose3"},{"y":25,"legend":"rose4"},{"y":20,"legend":"rose5"},{"y":30,"legend":"rose6"},{ "y":30,"legend":"rose7"},{"y":40,"legend":"rose8"}]',
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

<style>

</style>
