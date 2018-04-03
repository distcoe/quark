<template>
  <div class="fileList"
  :style="{
      position: position,
      width: width,
      height: height,
      background:background,
      top:top,
      left:left,
      zIndex:zIndex}">
    <div class="singleFile" v-for="(file, index) in fileList" :key="index">
      <fileCard :fileUrl="file.fileUrl" :thumbnailUrl="file.thumbnailUrl"
      :title="file.title" :date="file.date"></fileCard>
    </div>
  </div>
</template>
<script>
import fileCard from '../form/fileCard';
import common from '../common';

export default {
  name: 'fileList',
  props: ['options', 'parentWidth', 'parentHeight', 'designerWindowWidth', 'designerWindowHeight'],
  extends: common,
  data() {
    return {
    };
  },
  computed: {
    fileList() {
      return this.data;
    },
  },
  watch: {
    options(newOptions) {
      // 属性设置联动
      Object.keys(newOptions).forEach((key) => {
        this[key] = newOptions[key];
      });
    },
    parentWidth: {
      handler() {
        this.width = `${Math.round((Number(this.width.slice(0, -2) / this.designerWindowWidth)) * Number(this.parentWidth))}px`;
        this.height = `${Math.round((Number(this.height.slice(0, -2) / this.designerWindowHeight)) * Number(this.parentHeight))}px`;
      },
      deep: true,
    },
  },
  methods: {
    /** get all attributes  所有可在页面设计器中设置的属性 */
    getAttributes() {
      return [{
        attributeDisplayName: '宽度',
        attributeName: 'width',
        attributeValue: '400px',
      },
      {
        attributeDisplayName: '高度',
        attributeName: 'height',
        attributeValue: '400px',
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
        attributeValue: '["../../../static/ArcGIS.pdf", "../../../static/ArcGIS1.pdf", "../../../static/ArcGIS2.pdf", "../../../static/ArcGIS3.pdf", "../../../static/ArcGIS4.pdf"]',
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
      return '';
    },

    /** get all actions */
    getComponentAction() {
      return [
      ];
    },
  },
  components: {
    fileCard,
  },
};
</script>
<style>

</style>

<style scoped>
  .fileList{
    margin-top: 40px;
    overflow-y: scroll;
  }
  .singleFile {
    float: left;
    cursor: pointer;
    margin: 0 35px 58px 35px;
  }
</style>


