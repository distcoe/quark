<template>
  <div class="elevatorNav" :style="{ position: position, width: width, height: height,background:background,top:top,right:right,zIndex:zIndex}">
      <ul>
        <li
          class=""
          v-for="(elevator, index) in elevatorItems"
          :key="index"
          @click="goElevatorAnchor(elevator.path)"
        >
          <div class="elevatorTop">
            <Icon :type=elevator.icon size="25"></Icon>
          </div>
          <div class="elevatorBottom">
            {{elevator.value}}
          </div>
        </li>
        <li>
          <router-link to='/zonghe'>
            <div class="elevatorTop">
              <Icon type="reply" size="25"></Icon>
            </div>
            <div class="elevatorBottom">
              返回首页
            </div>
          </router-link>
        </li>
        <li @click="backToTop">
          <div class="elevatorTop">
            <Icon type="arrow-up-b" size="25"></Icon>
          </div>
          <div class="elevatorBottom">
            TOP
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
  import common from '../../common';
  import EventBus from '../../../../utils/EventBus';

  export default {
    name: 'elevatorNav',
    extends: common,
    data() {
      return {
      // mydefaultheme: this.options.defaultheme || '',
      };
    },
    computed: {
      elevatorItems() {
        const elevatorItems = this.data;
        return elevatorItems;
      },
    },
    mounted() {

    },
    methods: {
      /** get all attributes  所有可在页面设计器中设置的属性 */
      goElevatorAnchor(selector) {
        EventBus.$emit('goElevatorAnchor', { selector });
      },
      backToTop() {
        EventBus.$emit('backToTop');
      },
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
          attributeDisplayName: 'Right',
          attributeName: 'right',
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
          attributeValue: '[{"icon":"","value":""},{"icon":"","value": "指标关联",},{"icon":"","value":"返回首页",},{"icon":"","value":"TOP"}]',
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

      /** compoments action end */
    },
  };
</script>

<style>
.elevatorNav ul{
  width: 95%;
  height: 180px;
  border-top:1px solid #8F8E8D;
  border-left:1px solid #8F8E8D;
  border-right: 1px solid #8F8E8D;
}
.elevatorNav ul li{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid #8F8E8D;
  margin-top: 5px;
}
.elevatorTop,.elevatorBottom{
  width: 100%;
  height: 20px;
  line-height: 20px;
}
.elevatorNav ul li a {
  color:black;
}

.elevatorNav ul li a:hover {
  color: #B63634;
}
.elevatorNav ul li:hover{
  color: #B63634;
}
</style>
