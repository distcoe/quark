<template>
  <div class="headerBar" :style="{height: height,background:background,top:top,left:left,zIndex:zIndex}">
    <div class="logoImg">
      <img v-bind:src="logoSrc">
    </div>
    <div class="productName">
      {{ productName }}
    </div>
  </div>
</template>
<script>
export default {
  props: ['options', 'parentWidth', 'parentHeight'],
  data() {
    return {
      // 宽度
      width: this.options.width,
      // 高度
      height: this.options.height,
      // 背景颜色
      background: this.options.background,
      // 产品标题名称
      productName: this.options.productName,
      // 更换logo图片
      logoSrc: '../../../../static/icon/logo.png',
      // 距离容器顶部的距离
      top: this.options.top,
      // 距离容器左部的距离
      left: this.options.left,
      // 组件堆叠顺序
      zIndex: this.options.zIndex,
    };
  },
  watch: {
    options(newOptions) {
      // 属性设置联动
      Object.keys(newOptions).forEach((key) => {
        this[key] = newOptions[key];
      });
    },
    // parentWidth:{
    //   handler:function(){
    //     this.initWidth =
    //       Math.round((Number(this.initWidth.slice(0,-2)/725)) * Number(this.parentWidth))+'px';
    //     this.initHeight =
    //       Math.round((Number(this.initHeight.slice(0,-2)/498)) * Number(this.parentHeight))+'px';
    //   },
    //   deep: true
    // }
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
        attributeValue: '50px',
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
        attributeDisplayName: '背景颜色',
        attributeName: 'background',
        attributeValue: 'rgba(0,0,0,0.5)',
      },
      {
        attributeDisplayName: '标题名称',
        attributeName: 'productName',
        attributeValue: '应用标题',
      }];
    },
  },
};
</script>
<style scoped>
.headerBar {
  position: absolute;
  width: 100%!important;
}

.logoImg {
  width: 50px;
  height: 50px;
  line-height: 70px;
  text-align: center;
  float: left;
  cursor: pointer;
}

.logoImg img {
  width: 70%;
  height: 70%;
}

.productName {
  width: 350px;
  height: 100%;
  line-height: 55px;
  font-size: 18px;
  font-weight: bold!important;
  float: left;
  color: #ffffff;
  text-align: center;
  /*animation:change 10s linear 0s infinite;*/
}

.currentPage {
  width: 120px;
  height: 100%;
  line-height: 55px;
  float: right;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  /*background:rgba(51,51,51,0.8) ;*/
  /*background-image: url("../../static/title.png");*/
  /*background-size: 100% 100%;*/
  background: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  /*opacity: 0.4;*/
}
</style>
