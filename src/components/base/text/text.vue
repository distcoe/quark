<template>
  <div class="text" :style="{ position: position, width: width, height: height,background:background,top:top,left:left,zIndex:zIndex}">
    <p class="label" :style="{ fontSize: size, color: color, fontWeight: fontWeight }">
      {{ labelText }}
    </p>
  </div>
</template>

<script>
  import common from '../common';

  export default {
    extends: common,
    data() {
      return {
        labelText: this.options.labelText || '',
        fontWeight: this.options.fontWeight,
        size: this.options.size || '',
        color: this.options.color || '',
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
          attributeValue: '100px',
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
          attributeDisplayName: '背景颜色',
          attributeName: 'background',
          attributeValue: '',
        },
        {
          attributeDisplayName: '堆叠顺序',
          attributeName: 'zIndex',
          attributeValue: '1',
        },
        {
          attributeDisplayName: '显示文字',
          attributeName: 'labelText',
          attributeValue: '输入要显示的文字',
        },
        {
          attributeDisplayName: '文字大小',
          attributeName: 'size',
          attributeValue: '2',
        },
        {
          attributeDisplayName: '文字颜色',
          attributeName: 'color',
          attributeValue: '',
        }];
      },
      /** get all event config */
      getComponentEventConfig() {
        return [];
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
.label {
  vertical-align: middle;
}
</style>
