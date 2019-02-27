<template>
  <div>
    <el-container class="home-container">
      <el-header class="home-header">
        <div class="info">
          <i class="mobile-menu el-icon-menu" @click="showSide"></i>
          <span class="home_title">人力资源管理</span>
          <div class="logo">
            <img src="~@/assets/img/logo.jpg">
          </div>
        </div>
        <div style="display: flex;align-items: center;margin-right: 7px">
          <el-badge style="margin-right: 16px" :is-dot="this.$store.state.nfDot">
            <i class="fa fa-bell-o" @click="goChat" style="cursor: pointer"></i>
          </el-badge>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">
              {{user.name}}
              <i>
                <img
                  v-if="user.userface!=''"
                  :src="user.userface"
                  style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"
                >
              </i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <side-bar></side-bar>
        <el-container>
          <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="tag in this.currentRoutes" v-text="tag" class="el-icon-close"></el-breadcrumb-item>
            </el-breadcrumb>

            <keep-alive>
              <router-view v-if="this.$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!this.$route.meta.keepAlive"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import SideBar from "@/componentsub/sideBar.vue";
export default {
  components: { "side-bar": SideBar },
  data() {
    return {};
  },
  created() {
    console.log(this.$store.state.currentRoutes);
  },
  mounted: function() {
    this.init();
    var timeout = null;
    window.onresize = this.windowResize;
    // this.devMsg();
    this.loadNF();
  },
  methods: {
    handleClose: function(tag) {
      this.$store.state.currentRoutes.splice(this.$router.currentRoute.name, 1);
      let currentRoutes = this.$store.state.currentRoutes;
      this.$store.commit("saveCurrentRoutes", currentRoutes);
    },
    showSide: function() {
      this.$store.dispatch("showSideBar");
    },
    init: function() {
      var windowW =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth; //浏览器高度
      if (windowW <= 767) {
      } else {
      }
    },
    windowResize: function() {
      var windowW =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth; //浏览器高度
      var res = null;
      if (res) {
        clearTimeout(res);
      }
      var _this = this;
      res = setTimeout(function() {
        console.log("change");
        if (windowW <= 767) {
        } else {
        }
      }, 20);
    },
    loadNF() {
      var _this = this;
      this.getRequest("/chat/sysmsgs").then(resp => {
        var isDot = false;
        resp.data.forEach(msg => {
          if (msg.state == 0) {
            isDot = true;
          }
        });
        _this.$store.commit("toggleNFDot", isDot);
      });
    },
    goChat() {
      this.$router.push({ path: "/chat" });
    },
    devMsg() {
      this.$alert(
        "为了确保所有的小伙伴都能看到完整的数据演示，数据库只开放了查询权限和部分字段的更新权限，其他权限都不具备，完整权限的演示需要大家在自己本地部署后，换一个正常的数据库用户后即可查看，这点请大家悉知!",
        "友情提示",
        {
          confirmButtonText: "确定",
          callback: action => {
            this.$notify({
              title: "重要重要!",
              type: "warning",
              message:
                "小伙伴们需要注意的是，目前只有权限管理模块完工了，因此这个项目中你无法看到所有的功能，除了权限管理相关的模块。权限管理相关的模块主要有两个，分别是 [系统管理->基础信息设置->权限组] 可以管理角色和资源的关系， [系统管理->操作员管理] 可以管理用户和角色的关系。",
              duration: 0
            });
          }
        }
      );
    },
    handleCommand(cmd) {
      var _this = this;
      if (cmd == "logout") {
        this.$confirm("注销登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _this.getRequest("/logout");
            _this.$store.commit("logout");
            _this.$router.replace({ path: "/" });
          })
          .catch(() => {
            _this.$message({
              type: "info",
              message: "取消"
            });
          });
      }
    }
  },
  data() {
    return {
      isDot: false
    };
  },
  computed: {
    currentRoutes() {
      return this.$store.state.currentRoutes;
    },
    user() {
      return this.$store.state.user;
    },
    routes() {
      return this.$store.state.routes;
    }
  }
};
</script>
<style lang="scss">
.info {
  .home_title {
    font-size: 16px;
  }
  @include fj(flex-start);
  .logo {
    width: 40px;
    height: 40px;
    overflow: hidden;
    margin-left: 16px;
    img {
      display: block;
      width: 100%;
      @include borderRadius(8px);
    }
  }
}
.home-container {
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}

.home-header {
  background-color: #52bab5;
  color: #fff;
  text-align: center;
  @include fj(space-between);
  box-sizing: content-box;
  padding: 0px;
}

.home-aside {
  background-color: #ececec;
}

.home-main {
  background-color: #fff;
  color: #000;
  text-align: center;
  margin: 0px;
  padding: 0px;
}

.home_title {
  color: #fff;
  font-size: 20px;
  display: inline;
  margin-left: 8px;
}

.home_userinfo {
  color: #fff;
  cursor: pointer;
}

.home_userinfoContainer {
  display: inline;
  margin-right: 20px;
}

.el-submenu .el-menu-item {
  width: 160px;
  min-width: 155px;
}
.mobile-menu {
  display: none;
}
.el-breadcrumb__item {
  display: inline-block;
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin-right: 10px;
  border: 1px solid rgba(82, 186, 181, 0.2);
  border-radius: 4px;
  background-color: rgba(82, 186, 181, 0.1);
  text-decoration: none;
}
.el-breadcrumb__item:hover {
  background-color: #52bab5;
  color: #fff;
}
.el-breadcrumb__item:visited {
  color: #52bab5;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.el-icon-close:before {
  content: "";
}
.el-icon-close:after {
  content: "\E60F";
}
/*手机*/
@media screen and (max-width: 767px) {
  .logo {
    display: none;
  }
  .mobile-menu {
    display: block;
    font-size: 18px;
    margin-left: 10px;
  }
}
</style>
