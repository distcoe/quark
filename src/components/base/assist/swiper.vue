<template>
  <div class="swiper" :style="{ position: position, width: width,background:background,top:top,left:left,zIndex:zIndex}">
    <swiper :options="swiperOption"  ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in indicator" :key="index" class="slide">
        <swiperItem :option="item" :index="index" :clickedIndex="clickedIndex"></swiperItem>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>


<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import swiperItem from './swiperItem';
  import common from '../common';
  import EventBus from '../../../utils/EventBus';

  export default {
    props: ['items'],
    extends: common,
    data() {
      return {
        clickedIndex: 0,
        notNextTick: true,
        swiperOption: {
          // swiper options 所有的配置同swiper官方api配置
          grabCursor: true,
          height: 72,
          slidesPerView: 4,
          spaceBetween: 9,
          slidesOffsetBefore: 5,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
        },
        indicator: this.items || [],
      };
    },
    mounted() {
      this.$refs.mySwiper.swiper.on('click', this.goAnchor);
    },
    methods: {
      goAnchor(selector) {
        const msg = {
          selector: `#anchor${selector.clickedIndex}`,
        };
        this.clickedIndex = selector.clickedIndex;
        EventBus.$emit('goAnchor', msg);
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

      /** compoments action end */
    },
    components: {
      swiper,
      swiperSlide,
      swiperItem,
    },
  };
</script>
<style>
.swiper-wrapper {
  width: 80%;
  padding: 10px 60px;
}
</style>

<style scoped>
.swiper {
  background: #f5f5f5;
  height: 90px;

}
.slide {
  width: 220px!important;
}
</style>
