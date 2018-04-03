<template>
  <div class="fileCard">
    <Card class="card"
      @mouseover.native="showOperationButton"
      @mouseout.native="hideOperationButton">
      <div class="fileImg">
        <img :src="thumbnailUrl" alt="">
      </div>
      <div class="operation-icons">
        <label>
          <i class="iconfont icon-icon_yl" @click="viewFile"></i>
        </label>
        <label>
          <i class="iconfont icon-icon_sc_nml" style="margin:0 48px;"></i>
        </label>
        <label>
          <i class="iconfont icon-icon_xz"></i>
        </label>
      </div>
    </Card>
    <div>
      <p>{{title}}</p>
      <p>{{date}}</p>
    </div>
  </div>
</template>
<script>
import EventBus from '../../../utils/EventBus';

export default {
  props: ['fileUrl', 'thumbnailUrl', 'title', 'date'],
  name: 'fileCard',
  data() {
    return {

    };
  },
  methods: {
    // 显示页面卡片上的操作按钮
    showOperationButton(evt) {
      const mouseEvent = evt;
      mouseEvent.currentTarget.querySelector('.operation-icons').style.display = 'block';
    },
    // 隐藏页面卡片上的操作按钮
    hideOperationButton(evt) {
      const mouseEvent = evt;
      mouseEvent.currentTarget.querySelector('.operation-icons').style.display = 'none';
    },
    viewFile() {
      EventBus.$emit('viewFile', { fileUrl: this.fileUrl });
    },
  },
};
</script>
<style>
.ivu-card-body {
  padding: 1px;
}
</style>

<style scoped>
.fileCard{
  width: 100%;
  height: 100%;
}
.card {
  width: 194px;
  height: 272px;
}
.fileImg{
  width: 100%;
  height: 100%;
}
.operation-icons{
  position: absolute;
  width: 100%;
  height: 32px;
  bottom: 0;
  text-align: center;
  display: none;
  cursor: pointer;
  background: #000000;
  opacity: 0.5;
}
.operation-icons i:hover{
  color:cornflowerblue ;
}

.operation-icons i {
  font-size: 18px;
  color: #fafafa;
}
</style>


