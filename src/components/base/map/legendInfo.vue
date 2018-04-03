<template>
  <div id="legendInfo">
    <div class="legendTitle">{{ infoTitle }}</div>
    <ul class="legendList">
      <li v-for="item in items">
        <i v-bind:style="{ background: item.color }"></i>&nbsp;&nbsp;
        <div class="legendContent">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'legendInfo',
  props: ['title', 'infolist'],
  data() {
    return {
      infoTitle: this.title,
      items: this.infolist,
    };
  },
  watch: {
    title(newTitle) {
      this.infoTitle = newTitle;
    },
    infolist(newInfolist) {
      this.items = newInfolist;
    }
  }
};
</script>
<style scoped>
#legendInfo {
  font-size: 0.9vw;
  /*background: rgba(255, 255, 255, 0.8);*/
  /*box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);*/
  color: #ffffff;
  font-family: "Microsoft YaHei";
}
#legendInfo:hover {
  color: #fc290e;
}
.legendTitle {
  display: block;
  height: 3vh;
  line-height: 3vh;
}
.legendList {
  margin-top: 0;
  padding: 0;
}
#legendInfo i {
  width: 2.5vw;
  height: 1vw;
  line-height: 1.2vw;
  float: left;
  opacity: 0.7;
}
#legendInfo li {
  list-style: none;
}
.legendContent {
  float: left;
  margin-left: 1vh;
}
</style>
