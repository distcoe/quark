<script>
export default {
  props: ['options', 'parentWidth', 'parentHeight', 'designerWindowWidth', 'designerWindowHeight'],
  data() {
    return {
      // 定位方式
      position: this.options.position || 'absolute',
      // 组件宽度
      width: this.options.width || '',
      // 组件高度
      height: this.options.height || '',
      // 背景颜色
      background: this.options.background || '',
      // 距离容器顶部的距离
      top: this.options.top || '',
      // 距离容器左部的距离
      left: this.options.left || '',
      // 距离容器右边的距离
      right: this.options.right || '',
      // 边框样式
      border: this.options.border || '',
      // 组件堆叠顺序
      zIndex: this.options.zIndex || '',

      /** attributes about style */

      /** attributes about data */
      // 静态数据
      staticData: this.options.staticData || '',
      // 默认静态数据
      defaultData: this.options.defaultData || '',
      // 绑定数据URl
      dataUrl: this.options.dataUrl || '',
      // 数据请求周期 默认为0时，只请求一次
      refreshInterval: this.options.interval || '',
      // 主题
      defaultheme: this.options.defaultheme || '',
      data: [],

      /** types of fetch data */
      fetchDataType: this.options.dataType || '', // 0:json string 1: rest api 2 csv
      dataBindInfo: this.options.defaultDataBind || '', // 数据转换说明
    };
  },
  mounted() {
    if (this.refreshInterval && this.refreshInterval > 0) {
      setInterval(this.getData, this.refreshInterval);
    } else {
      this.getData();
    }
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
    staticData: {
      handler() {
        this.getData();
      },
      deep: true,
    },
    dataUrl() {
      this.getData();
    },
  },
  methods: {
    // 获取组件数据
    getData() {
      let bindedData = null;
      if (this.staticData != null && this.$lodash.trim(this.staticData).length !== 0) {
        bindedData = JSON.parse(this.staticData);
      } else if (this.defaultData) {
        bindedData = JSON.parse(this.options.defaultData);
      }
      if (bindedData) {
        if (this.fetchDataType === '0') {
        // static data
          if (this.$lodash.trim(this.dataBindInfo).length !== 0) {
            bindedData = this.transformData(this.dataBindInfo, bindedData);
          }
          this.data = bindedData;
        } else if (this.fetchDataType === '1') {
          // rest api
          if (this.dataUrl) {
            this.$http.get(this.dataUrl).then((response) => {
              // 定义了数据转换信息就使用该信息来做数据转换
              if (this.dataBindInfo) {
                this.data = this.transformData(this.dataBindInfo, response.data);
              } else {
                this.data = response.data;
              }
            });
          }
        } else if (this.fetchDataType === '2') {
        // csv
        } else if (this.fetchDataType === '3') {
        // oracle
        }
      }
    },

    // 更新数据
    updateData(newData) {
      if (this.fetchDataType === '0') {
        this.staticData = newData;
      } else if (this.fetchDataType === '1') {
        this.dataUrl = newData;
      }
    },


    // 使用数据mapping配置转换数据为组件可使用的数据
    transformData(dataBindInfo, data) {
      const bindInfo = JSON.parse(dataBindInfo);
      // 绑定格式中包含[]时表示将从返回的数据中提取数据，将不会按照返回数据的已有格式进行数据处理
      const extractData = bindInfo.filter(item => item.mapping.indexOf('[') !== -1);
      if (extractData.length > 0) {
        const newItem = {};
        bindInfo.forEach((bindItem) => {
          if (bindItem.mapping.indexOf('@') !== -1) {
            newItem[bindItem.title] = bindItem.mapping.substring(1);
          } else if (bindItem.mapping.indexOf('[') !== -1) {
            newItem[bindItem.title] = [];
            let valueKey = bindItem.mapping.substring(1);
            valueKey = valueKey.substring(0, valueKey.length - 1);
            data.forEach((item1) => {
              newItem[bindItem.title].push(item1[valueKey]);
            });
          }
        });
        return new Array(newItem);
      }
      // 不进行数据提取时，将按照反回数据的默认格式进行匹配
      return data.map((item) => {
        const newItem = {};
        bindInfo.forEach((bindItem) => {
          if (bindItem.mapping.indexOf('@') !== -1) {
            newItem[bindItem.title] = bindItem.mapping.substring(1);
          } else if (bindItem.mapping === '可自定义') {
            newItem[bindItem.title] = item[bindItem.title];
          } else {
            newItem[bindItem.title] = item[bindItem.mapping];
          }
        });
        return newItem;
      });
    },
  },
};
</script>
