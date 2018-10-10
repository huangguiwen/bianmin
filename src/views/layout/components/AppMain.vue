<template>
    <section class="app-main">
        <transition name="fade" mode="out-in">
            <!-- <router-view :key="key"></router-view> -->
            <div>
                <p class="title-bar" v-show="$router.currentRoute.meta.title!=='首页'">{{$router.currentRoute.meta.title}}</p>
                <router-view></router-view>
            </div>
        </transition>
    </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    position: relative;
    overflow: hidden;
    .title-bar {
        border-bottom: 1px solid #efefef;
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        font-size: 18px;
        margin: 0;
    }
}
</style>
