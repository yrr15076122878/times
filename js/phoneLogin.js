layui.use(["form", "element"], function () {
  var form = layui.form;

  form.on('submit(phone)', function (data) {
    loginCheck(data.field);
    return false;
  });

});

function loginCheck(data) {
  $.ajax({
    url: "../data/LoginPhone.ashx",
    type: "POST",
    data: data,
    success: function (code) {
      if (code == 0) {
        layer.msg("手机号或密码错误！", {
          icon: 2
        })
        return false;
      } else if (code == 1) {
        window.location.href = "./timeAxis.html"
      }
    }
  })
}