<template>
    <div class="tableauView"  :style="{ position: position, width:width,height:height,top:top,left:left,zIndex:zIndex}">
      <div id="vizContainer"></div>
       <!-- <iframe :src="tableauUrl" frameborder="0" class="tableauFrame"></iframe> -->
    </div>
</template>
<script>
import common from '../../common';

export default{
  name: 'tableauView',
  extends: common,
  data() {
    return {
      // tableau组件url地址
      tableauUrl: this.options.tableauUrl || '',
      viz: null,
    };
  },
  watch: {
    options(newOptions) {
      // 属性设置联动
      Object.keys(newOptions).forEach((key) => {
        this[key] = newOptions[key];
      });
      // tableau组件resize更新
      this.viz.setFrameSize(parseInt(this.width, 10), parseInt(this.height, 10));
    },
    tableauUrl() {
      this.loadTableauViz(this.tableauUrl, this.options);
    },
    viz() {
      this.$emit('loadedViz', this.viz);
    },
  },
  mounted() {
    if (this.refreshInterval && this.refreshInterval > 0) {
      setInterval(this.getData, this.refreshInterval);
    } else {
      this.getData();
    }
    if (this.tableauUrl) {
      this.loadTableauViz();
    }
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
        attributeDisplayName: 'Tableau视图地址',
        attributeName: 'tableauUrl',
        attributeValue: ' ',
      }];
    },
    // 加载tableau组件
    loadTableauViz() {
      const containerDiv = this.$el.querySelector('#vizContainer');
      const defaulOptions = {
        hideTabs: true,
        hideToolbar: true,
      };
      if (this.viz) {
        this.viz.dispose();
      }
      // eslint-disable-next-line
      this.viz = new tableau.Viz(containerDiv, this.tableauUrl, defaulOptions);
    },
    getComponentEventConfig() {
      return [{
        eventTarget: 'default',
        eventType: ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseup', 'mouseover', 'mouseout'],
      }];
    },
    getComponentAction() {
      return [{
        action: 'getData',
      },
      {
        action: 'testBaseBarChart',
      },
      ];
    },
    /** compoments action begin */
    /** compoments action begin */
  },
};
</script>
<style scoped>

.tableauFrame{
    width:98%!important;
    height:98%!important;
}
#vizContainer{
    width:98%!important;
    height:98%!important;
}
</style>
