<template>
  <div class="swiperItem" :class="[indexStatusClass.borderClass]" @click="showIndexDetail">
    <Row>
      <Col span="6" class="icon">
      <i class="iconfont icon-bumen1 indexIcon" :class="[indexStatusClass.iconClass]" style="font-size: 32px;"></i>
      </Col>
      <Col span="18">
        <Row class="remark">
            <p class="remarkline">{{name}}</p>
            <p :class="{flagWord: showFlag,hideFlagWord: !showFlag}">考</p>
            <p :class="{flag: showFlag}"></p>
        </Row>
        <Row>
          <span class="changeData">{{changeValue}}</span>
          <i class="changeStatus iconfont" :class="[trend.trendDirection]" style="font-size:32px;"></i>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: ['option', 'index', 'clickedIndex', 'detailPageRoutePath'],
  data() {
    return {
      icon: this.option.icon,
      statusIcon: this.option.statusIcon,
      name: this.option.name,
      changeValue: this.option.value,
    };
  },
  computed: {
    showFlag() {
      if (this.option.indicatorType === 1) {
        return true;
      }
      return false;
    },
    indexStatusClass() {
      const cssClass = {};
      switch (this.option.indicatorStatus) {
        case '达标':
          cssClass.borderClass = 'greenBorder';
          cssClass.iconClass = 'greenIcon';
          return cssClass;
        case '预警':
          cssClass.borderClass = 'redBorder';
          cssClass.iconClass = 'redIcon';
          return cssClass;
        case '未达标':
          cssClass.borderClass = 'yellowBorder';
          cssClass.iconClass = 'yellowIcon';
          return cssClass;
        case '未评估':
          cssClass.borderClass = 'grayBorder';
          cssClass.iconClass = 'grayIcon';
          return cssClass;
        default:
          return 'grayBorder';
      }
    },
    trend() {
      const cssClass = {};
      if (this.option.trend === 'up') {
        cssClass.trendDirection = 'icon-icon_zhuangtai';
      } else {
        cssClass.trendDirection = 'icon-icon_zhuangtai_xia';
      }
      return cssClass;
    },
  },
  methods: {
    showIndexDetail() {
      this.$router.push({ path: this.detailPageRoutePath, params: { id: this.option.id } });
    },
  },
};
</script>

<style scoped>
.swiperItem {
  width: 218px;
  height: 72px;
  background: #ffffff;
  border-radius: 10px;
  border: 2px solid #dcdcdc;
}
.swiperItem:hover {
  position: relative;
}

.icon {
  text-align: center;
  padding-top: 11px;
}

.greenBorder {
  border: 2px solid #4dcd98;
}

.greenBorder:hover {
  box-shadow: 0 0 15px rgba(77, 205, 152, 0.5);
}

.redBorder {
  border: 2px solid #f86668;
}

.redBorder:hover {
  box-shadow: 0 0 15px rgba(248, 102, 104, 0.5);
}


.yellowBorder {
  border: 2px solid #f99b37;
}

.yellowBorder:hover {
  box-shadow: 0 0 15px rgba(249, 155, 55, 0.5);
}

.grayBorder {
  border: 2px solid #cccccc;
}

.grayBorder:hover {
  box-shadow: 0 0 15px rgba(204, 204, 204, 0.5);
}

.greenIcon {
  color: #4dcd98;
}

.redIcon {
  color: #f86668;
}

.yellowIcon {
  color: #f99b37;
}

.grayIcon {
  color: #cccccc;
}

.remark {
  box-sizing: border-box;
  padding-top: 16px;
}
.remarkline {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 140px;
  font-size: 16px;
}

.flagWord {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  z-index: 10;
}
.hideFlagWord {
  display: none;
}
.flag {
  position: absolute;
  top: 0;
  right: 0;
  border-top: 25px solid #32a4f0;
  border-left: 25px solid transparent;
}
.changeStatus {
  float: right;
  margin-top: -20px;
  margin-right: 12px;
}

.goodTrend {
  color: green;
}

.badTrend {
  color: red;
}

.trend {
  color: blue;
}

.changeData {
  font-size: 20px;
  color: #0068b7;
}

.changeText {
  font-size: 14px;
  color: #0068b7;
}
</style>
