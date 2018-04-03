<template>
  <div :style="{ position: position, width: width,background:background,top:top,left:left,zIndex:zIndex}">
    <swiper :options="swiperOption">
      <swiper-slide
        v-for="swiperItem in swiperItems"
        :key="swiperItem">
        <div class="swiper-item" v-bind:class="{selected: dataTime === swiperItem}" @click="chooseDataTime(swiperItem)">{{swiperItem}}</div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <hr style="width:90%;height:1px;border:none;border-top:2px solid #DCE1E4;margin:-16px auto"/>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import common from '../common';

export default {
  name: 'timeline',
  extends: common,
  props: ['currentTime'],
  data() {
    return {
      dataTime: this.currentTime,
      swiperOption: {
        grabCursor: true,
        slidesPerView: 6,
        slidesPerGroup: 3,
        spaceBetween: 14,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
      },
    };
  },
  computed: {
    swiperItems() {
      return this.data;
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
        attributeValue: '["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]',
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
    chooseDataTime(swiperItem) {
      this.dataTime = swiperItem;
      this.$emit('chooseDataTime', swiperItem);
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>

<style scoped>
.swiper-item{
  width:30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50px;
  background:#6ACA6B;
  color:#ffffff;
  text-align: center;
}
.swiper-container{
  position: static;
}
.swiper-wrapper{
}
.swiper-button-prev,.swiper-button-next{
  height: 20px;
  top: 35px;
}
.selected{
  background: #57a3f3;
}
</style>
