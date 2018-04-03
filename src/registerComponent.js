import Vue from 'vue';
import echarts from 'vue-echarts-v3/src/full';
import vueAwesomeSwiper from 'vue-awesome-swiper';
import Vue2Leaflet from 'vue2-leaflet';
import 'iview/dist/styles/iview.css';
import 'leaflet/dist/leaflet.css';
import darkTheme from './components/base/echartstheme/dark';
import chalkTheme from './components/base/echartstheme/chalk';
import infographicTheme from './components/base/echartstheme/infographic';
import macaronsTheme from './components/base/echartstheme/macarons';
import romaTheme from './components/base/echartstheme/roma';
import shineTheme from './components/base/echartstheme/shine';
import vintageTheme from './components/base/echartstheme/vintage';
import wonderlandTheme from './components/base/echartstheme/wonderland';
import halloweenTheme from './components/base/echartstheme/halloween';
import essosTheme from './components/base/echartstheme/essos';
import purplepassionTheme from './components/base/echartstheme/purplepassion';
import westerosTheme from './components/base/echartstheme/westeros';
import waldenTheme from './components/base/echartstheme/walden';

// swipper组件
/* eslint-disable */
import 'swiper/dist/css/swiper.css';
// 头部组件
import header from './components/base/app/header/Header';
// 导航组件
import VMenuBar from './components/base/app/menu/VMenuBar';
import HMenuBar from './components/base/app/menu/HMenuBar';
// import TMenuBar from './components/base/app/menu/TMenuBar';

// 单个主机监控组件

// 布局组件
import frame from './components/base/container/frame';

// swiper组件
import distSwiper from './components/base/assist/swiper';
import timeline from './components/base/assist/timeline'

// 基础图表组件
// 柱状图
import areaBarChart from './components/base/common/barcharts/areaBarChart';
import baseBarChart from './components/base/common/barcharts/baseBarChart';
import horizontalBarChart from './components/base/common/barcharts/horizontalBarChart';
// 折线图
import areaLineChart from './components/base/common/linecharts/areaLineChart';
import baseLineChart from './components/base/common/linecharts/baseLineChart';
// 其他
import liquidFillChart from './components/base/common/other/liquidfillChart';
import radarChart from './components/base/common/other/radarChart';
import elevatorNav from './components/base/common/other/elevatorNav';
// 饼图
import basePieChart from './components/base/common/piecharts/basePieChart';
import cyclicPieChart from './components/base/common/piecharts/cyclicPieChart';
import rosePieChart from './components/base/common/piecharts/rosePieChart';
// 散点图
import baseScatterChart from './components/base/common/scatter/baseScatterChart';
// 仪表盘组件
import cooldashboard from './components/base/common/dashboard/cooldashboard';
// tableau组件
import tableauView from './components/base/common/tableau/tableauView';

// text组件
import label from './components/base/text/text';

// 表单组件
import distButton from './components/base/form/button';
import fileView from './components/base/form/fileView';
import fileList from './components/base/form/fileList';

// 地图组件
import choroplethMap from './components/base/map/choroplethMap';
import distMap from './components/base/map/map';

// 注册echarts主题
echarts.registerTheme('dark', darkTheme);
echarts.registerTheme('chalk', chalkTheme);
echarts.registerTheme('infographic', infographicTheme);
echarts.registerTheme('macarons', macaronsTheme);
echarts.registerTheme('roma', romaTheme);
echarts.registerTheme('shine', shineTheme);
echarts.registerTheme('vintage', vintageTheme);
echarts.registerTheme('wonderland', wonderlandTheme);
echarts.registerTheme('halloween', halloweenTheme);
echarts.registerTheme('essos', essosTheme);
echarts.registerTheme('purplepassion', purplepassionTheme);
echarts.registerTheme('westeros', westerosTheme);
echarts.registerTheme('walden', waldenTheme);

// 注册echarts地图
echarts.registerMap('china', require('../static/map/china.json'));
echarts.registerMap('guangzhou', require('../static/map/cities/guangzhou.json'));
echarts.registerMap('beijing', require('../static/map/cities/beijing.json'));
echarts.registerMap('shenyang', require('../static/map/cities/shenyang.json'));

export default function regiterComponent() {
  Vue.component('echarts', echarts);
  Vue.component('headerbar', header);
  Vue.component('VMenuBar', VMenuBar);
  Vue.component('HMenuBar', HMenuBar);
  // Vue.component('TMenuBar', TMenuBar);
  // 常规组件注册
  Vue.component('areaBarChart', areaBarChart);
  Vue.component('baseBarChart', baseBarChart);
  Vue.component('horizontalBarChart', horizontalBarChart);
  Vue.component('areaLineChart', areaLineChart);
  Vue.component('baseLineChart', baseLineChart);
  Vue.component('liquidFillChart', liquidFillChart);
  Vue.component('radarChart', radarChart);
  Vue.component('elevatorNav', elevatorNav);
  Vue.component('basePieChart', basePieChart);
  Vue.component('cyclicPieChart', cyclicPieChart);
  Vue.component('rosePieChart', rosePieChart);
  Vue.component('baseScatterChart', baseScatterChart);
  Vue.component('cooldashboard', cooldashboard);

  Vue.component('tableauView', tableauView);
  Vue.component('textLabel', label);
  Vue.component('fileView', fileView);
  Vue.component('fileList', fileList);
  Vue.component('distButton', distButton);
  Vue.component('choroplethMap', choroplethMap);
  Vue.component('frame', frame);
  Vue.component('distSwiper', distSwiper);
  Vue.component('timeline', timeline);

  // 地图组件
  Vue.component('v-map',Vue2Leaflet.Map);
  Vue.component('v-tilelayer',Vue2Leaflet.TileLayer);
  Vue.component('v-marker',Vue2Leaflet.Marker);
  Vue.component('distMap',distMap);
  // 每个注册的注册如果需要在页面设计器中使用都需要添加下面的数组中
  const components = ['areaBarChart', 'baseBarChart', 'horizontalBarChart', 'areaLineChart', 'baseLineChart',
    'liquidFillChart', 'radarChart','elevatorNav', 'basePieChart', 'cyclicPieChart','rosePieChart', 'baseScatterChart',
    'headerbar', 'VMenuBar', 'HMenuBar', 'tableauView', 'textLabel', 'distButton',
    'choroplethMap', 'fileView', 'fileList', 'frame', 'cooldashboard','distSwiper','timeline'];
  Object.defineProperty(Vue.prototype, '$distComponents', { value: components });

  Vue.use(vueAwesomeSwiper);
}
