layui.use(["form", "element"], function () {
  var form = layui.form;
  var element = layui.element;

  form.on('submit(email)', function (data) {
    loginCheck(data.field);
    return false;
  });

  form.verify({
    emailEn: [
      /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, 'The mailbox format is incorrect!'
    ]
  });

});

function loginCheck(data) {
  $.ajax({
    url: "../data/LoginEmail.ashx",
    type: "POST",
    data: data,
    success: function(code) {
      if (code == 0) {
        layer.msg("Error mailbox or password!", { icon:2 })
        return false;
      } else if (code == 1) {
        window.location.href = "./timeAxis.html"
      }
    }
  })
}