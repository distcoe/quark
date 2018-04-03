<template>
  <div class="frame" :style="{ width: width, height: height,background:background,top:top,left:left,zIndex:zIndex,border:border}">

  </div>
</template>

<script>
import common from '../common';

export default {
  name: 'frame',
  extends: common,
  data() {
    return {};
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
          attributeDisplayName: '边框',
          attributeName: 'border',
          attributeValue: 'solid 1px',
        },
        {
          attributeDisplayName: '堆叠顺序',
          attributeName: 'zIndex',
          attributeValue: '1',
        },
      ];
    },
    /** get all event config */
    getComponentEventConfig() {
      return [];
    },
    /** data handler */
    getDefaultData() {
      return this.data;
    },
    /** data handler */
    /** get all actions */
    getComponentAction() {
      return [
      ];
    },
    /** compoments action begin */
    getData() {

    },
    /** compoments action end */
  },
};
</script>

<style scoped>
.frame {
  position: absolute;
}
</style>
