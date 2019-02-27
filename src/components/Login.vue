<template>
  <div style="width: 100%;height: 100%;">
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    ></vue-particles>

    <el-form
      :style="contentStyleObj"
      :model="loginForm"
      :rules="rules"
      class="login-container"
      label-position="left"
      label-width="0px"
      v-loading="loading"
    >
      <div v-if="ishow" class="logo">
        <img src="~@/assets/img/logo.jpg">
      </div>
      <h3 class="login_title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button class="submitBtn" type="primary" @click.native.prevent="submitClick">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: this.$Cookies.set("password") == null ? false : true,
      loginForm: {
        account: this.$Cookies.get("account"),
        password: this.$Cookies.get("password")
      },
      loading: false,
      contentStyleObj: {
        height: ""
      },
      ishow: false
    };
  },
  created() {},
  mounted() {
    this.initHeight();

    var timeout = null;
    window.onresize = this.windowResize;
  },
  methods: {
    initHeight: function() {
      let windowH =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight; //浏览器高度
      let windowW =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth; //浏览器高度
      if (windowW <= 767) {
        this.contentStyleObj.height = windowH + "px";
        this.ishow = true;
      } else {
        this.contentStyleObj.height = "320px";
        this.ishow = false;
      }
    },
    windowResize: function() {
      var windowH =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight; //浏览器高度
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
          _this.contentStyleObj.height = windowH + "px";
          _this.ishow = true;
        } else {
          _this.contentStyleObj.height = "320px";
          _this.ishow = false;
        }
      }, 20);
    },
    submitClick: function() {
      var _this = this;
      this.loading = true;
      this.postRequest("/login", {
        username: this.loginForm.account,
        password: this.loginForm.password
      }).then(resp => {
        _this.loading = false;
        if (resp && resp.status == 200) {
          var data = resp.data;
          if (data.status == "success") {
            _this.$store.commit("login", data.msg);
            this.$Message.success({ message: "登录成功！" });
            this.$Cookies.set("account", this.loginForm.account);
            if (this.checked) {
              this.$Cookies.set("password", this.loginForm.password);
            } else {
              this.$Cookies.remove("password");
            }

            var path = _this.$route.query.redirect;
            _this.$router.replace({
              path: path == "/" || path == undefined ? "/home" : path
            });
          } else {
            this.$Message.error({ message: data.msg });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
#particles-js {
  height: 100%;
  width: 100%;
  background: url("~@/assets/img/bg.jpg") no-repeat center;
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
}
.login-container {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  margin-top: -180px;
  margin-left: -175px;
  border-radius: 15px;
  background-clip: padding-box;
  width: 350px;
  height: 320px;
  padding: 0 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  transition: all 1s;
  -moz-transition: all 1s;
  /* Firefox 4 */
  -webkit-transition: all 1s;
  /* Safari 和 Chrome */
  -o-transition: all 1s;
  /* Opera */
  .login_title {
    margin: 0 auto;
    padding: 30px 0;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
  .el-button {
    width: 100%;
  }
}
/*平板*/
@media screen and (min-width: 768px) and (max-width: 991px) {
  #particles-js {
    overflow-y: scroll;
  }
}
/*中等屏幕*/
@media (min-width: 992px) {
}
/*大屏幕*/
@media (min-width: 1200px) {
}
/*手机*/
@media screen and (max-width: 767px) {
  .login-container {
    top: 0;
    left: 0;
    margin: 0;
    padding-left: 0;
    padding-right: 0;
    width: 100%;
    border-radius: 0;
    border: none;
    box-shadow: 0;
    .el-input {
      width: 80%;
    }
    .el-button {
      width: 80%;
    }
    .login_title {
      margin: 0 auto;
      padding: 50px 0 30px;
      text-align: center;
      color: #505458;
    }
    .logo {
      overflow: hidden;
      img {
        margin: 50px auto 0;
        width: 30%;
        @include borderRadius(8px);
      }
    }
  }
}
</style>