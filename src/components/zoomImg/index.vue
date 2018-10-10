<!--可放大查看的image-->
<template>
    <div @click="zoomIn=!zoomIn">
        <img :src="src" v-show="src" :style="'max-width:' + maxWidth + 'px;max-height:' + maxHeight+'px; cursor: pointer;'">
        <transition name="slide-fade">
            <div v-if="zoomIn" class="zoom-wrap">
                <div>
                    <img :src="src" >
                </div>
            </div>
        </transition>

    </div>
</template>

<script>

  export default {
    props: {
      src: {
        type: String,
        default: ''
      },
      //缩略图最宽最大px
      maxWidth: {
        type: Number,
        default: 48
      },
      maxHeight: {
        type: Number,
        default: 48
      }
    },
    watch: {
      zoomIn(val) {
        val ? this.showMask() : this.hideMask();
      }
    },
    name: "zoomImg",
    methods: {},
    data() {
      return {
        zoomIn: false,
      }
    },
    created() {
      this.$on('hideMask', () => {
        this.zoomIn = false;
      });
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .zoom-wrap {
        position: fixed;
        left: 180px;
        top: 0;
        z-index: 999;
        background: rgba(0, 0, 0, 0.3);
        width: 100%;
        height: 100%;
        div {
            width: 60%;
            height: 80%;
            margin: 5% 10%;
            overflow: auto;
            text-align: center;
            img {
                min-width: 60%;
                max-width: 100%;
                height: auto;
            }
        }
        
    }
    .slide-fade-enter-active, .slide-fade-leave-active {
        transition: all .3s ease;
    }

    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(100px);
        opacity: 0;
    }
    
</style>
