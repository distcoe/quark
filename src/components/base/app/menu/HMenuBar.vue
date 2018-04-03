<template>
  <div id="menuBar" class="menuBar">
    <div v-if="menuType == 'oneDeck'">
      <Menu theme="dark" active-name="1" v-bind:class="{ activeChart: newStyle == true}" mode="horizontal">
        <MenuItem v-for="(item,index) in menuItems" :name="index" :key="index">
        <router-link :to="item.children[0].path">
          {{ item.children[0].name}}
        </router-link>
        </MenuItem>
      </Menu>
    </div>
    <div v-if="menuType == 'twoDeck'">
      <Menu theme="dark" v-bind:class="{ activeChart: newStyle == true}" mode="horizontal">
        <Submenu v-for="(submenu,index) in menuItems" :name="index" :key="index">
          <template slot="title">
            <Icon type="ios-paper"></Icon>
            {{submenu.templateName}}
          </template>
          <MenuItem v-for="(subItem,subIndex) in submenu.children" :name="index - subIndex" :key="subIndex">
          <router-link :to="subItem.path">
            {{subItem.name}}
          </router-link>
          </MenuItem>
        </Submenu>
      </Menu>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HMenuBar',
  props: ['options', 'menuType', 'menuItems'],
  data() {
    return {
      newStyle: true,
    };
  },
  beforeMount() {
    if (this.menuType === 'oneDeck' && this.menuItems === []) {
      this.menuItems = [{
        templateName: '',
        children: [
          { name: '', path: '' },
        ],
      }];
    } else if (this.menuType === 'twoDeck' && this.menuItems === []) {
      this.menuItems = [{
        templateName: '',
        children: [
          { name: '', path: '' },
        ],
      }];
    }
  },
  watch: {
    menuType: {
      handler() {
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
      }];
    },
  },
};
</script>
<style scoped>
#menuBar {
  width: 100%!important;
  height: 50px;
  background: green;
}

.activeChart {
  width: 100%!important;
  height: 50px;
}
</style>
