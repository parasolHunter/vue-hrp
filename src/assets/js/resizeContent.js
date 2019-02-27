(function() {
  var Model = {
    init: function() {
      var header = 0;
      if ($(".header").height() != null) {
        header = 0.88 * 100 * ($(window).width() / 750);
      }
      var footer = 0;
      if ($("footer").height() != null) {
        footer = 0.98 * 100 * ($(window).width() / 750);
      }
      if ($("#last").height() != null) {
        footer = 1.2 * 100 * ($(window).width() / 750);
      }

      if ($("#bottom_resizeContent").height()) {
        var bottom_resizeContent = 1.2 * 100 * ($(window).width() / 750);
        $("#baseContent").height(
          $(window).height() - header - footer - 1 - bottom_resizeContent
        );
      } else {
        //通用
        $("#baseContent").height($(window).height() - header - footer);
      }
      $("body").css({ opacity: 1 });
    }
  };

  //全局对象
  var Global = (function() {
    return this || (0, eval)("this");
  })();
  //全局命名空间（下划线+首字母大写）
  var ModelName = "_ResizeContent";

  //CMD模块引用
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Model;
  }

  //AMD模块引用
  if (typeof define === "function" && define.amd) {
    define(function() {
      return Model;
    });
  }

  //注册到VUE
  if (typeof Vue == "function") {
    Vue.prototype[ModelName] = Model;
  }
  //注册到全局
  Global[ModelName] = Model;
})();
