<template>
  <div class="home">
    <transition name="fade" @touchmove.stop.prevent>
      <!-- 这部分功能主要是关闭侧栏菜单，类似一层遮罩的效果 -->
      <div class="menu-mask" v-show="isRellyShow" @click="hideSide"></div>
    </transition>

    <transition name="el-zoom-in-center">
      <!-- 这里才是侧栏代码部分 -->
      <el-aside width="160px" class="home-aside" v-show="isRellyShow">
        <div style="display: flex;justify-content: flex-start;width: 160px;text-align: left;">
          <el-menu style="background: #ececec;width: 160px;" unique-opened router>
            <template v-for="(item,index) in this.routes" v-if="!item.hidden">
              <el-submenu :key="index" :index="index+''">
                <template slot="title">
                  <i :class="item.iconCls" style="color: #52bab5;width: 14px;"></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item
                  @click="hideSide"
                  width="160px"
                  style="padding-left: 30px;padding-right:0px;margin-left: 0px;width: 150px;text-align: left"
                  v-for="child in item.children"
                  :index="child.path"
                  :key="child.path"
                >{{child.name}}</el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
        </div>
      </el-aside>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    hideSide: function() {
      this.$store.dispatch("hideSideBar");

      if (
        this.$store.state.currentRoutes.indexOf(
          this.$router.currentRoute.name
        ) > -1
      ) {
      } else {
        this.$store.state.currentRoutes.push(this.$router.currentRoute.name);
        let currentRoutes = this.$store.state.currentRoutes;
        this.$store.commit("saveCurrentRoutes", currentRoutes);
      }
      console.log(this.$store.state.currentRoutes);
    }
  },
  computed: {
    routes() {
      return this.$store.state.routes;
    },
    isRellyShow() {
      return this.$store.getters.isShowMethod;
    }
  },
  mounted: function() {}
};
</script>

<style  lang="scss" scoped>
.home-aside {
  height: 100%;
  background-color: #ececec;
}
.el-submenu .el-menu-item {
  width: 160px;
  min-width: 155px;
}
.menu-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 1;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
}
.fade-enter-to,
.fade-leave-to {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-to {
  transition: transform 0.3s;
  transform: translate(0px, 0px);
}
.slide-fade-enter,
.slide-fade-leave-to {
   opacity: 0;
   -webkit-transform: translate(-286px, 0px);
   transform: translate(-286px, 0px);
   -webkit-transition: opacity 0.3s ease-in-out 0.3s,
    -webkit-transform 0.3s ease-in-out;
   transition: opacity 0.3s ease-in-out 0.3s, transform 0.3s ease-in-out;
}
/*手机*/
@media screen and (max-width: 767px) {
  .home-aside {
    z-index: 11;
    position: fixed;
    width: 286px;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    -webkit-overflow-scrolling: touch;
  }
}
@media screen and (min-width: 992px) {
  .home-aside {
    display: block !important;
  }
}
</style>