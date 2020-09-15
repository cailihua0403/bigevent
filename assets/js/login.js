$(function () {
  $("#link-login").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link-reg").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码应为6-12位"],
    repwd: function (value) {
      if ($(".reg-box [name=password]").val() !== value) {
        return "两次密码不一致";
      }
    },
  });

  //注册事件
  $("#form-reg").on("submit", function (e) {
    // 1. 阻止默认的提交行为
    e.preventDefault();
    $.post(
      "/api/reguser",
      {
        username: $("#form-reg [name=username]").val(),
        password: $("#form-reg [name=password]").val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功，请登录！");
        // 模拟人的点击行为
        $("#link_login").click();
      }
    );
  });
  //登录事件
  $("#form-login").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/api/login",
      data: {
        username: $("#form-login [name=username]").val(),
        password: $("#form-login [name=password]").val(),
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登陆失败");
        }
        layer.msg("登录成功");
        console.log(res.token);
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
