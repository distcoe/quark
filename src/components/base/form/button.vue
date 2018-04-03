<template>
  <div class="distButton" :style="{position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}">
    <Button :type="type" :icon='icon'>{{name}}</Button>
  </div>
</template>

<script>
  import common from '../common';

  export default {
    extends: common,
    data() {
      return {
        name: this.options.name || '',
        type: this.options.type || 'primary',
        icon: this.options.icon || '',
      };
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
          attributeValue: '50px',
        },
        {
          attributeDisplayName: '高度',
          attributeName: 'height',
          attributeValue: '30px',
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
          attributeDisplayName: '按钮名称',
          attributeName: 'name',
          attributeValue: '确定',
        },
        {
          attributeDisplayName: '按钮类型',
          attributeName: 'type',
          attributeValue: 'primary',
        },
        {
          attributeDisplayName: '按钮图标',
          attributeName: 'icon',
          attributeValue: '',
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
      /** compoments action begin */
      getData() {

      },
      /** compoments action end */
    },
  };
</script>

<style scoped>
</style>
