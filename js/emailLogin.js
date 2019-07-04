
layui.use(["form","element"], function(){
  var form = layui.form;

    form.on('submit(email)', function(data){
    loginCheck(data.field);
    return false; 
  });

});

function loginCheck(data) {
  $.ajax({
    url: "../data/LoginEmail.ashx",
    type: "POST",
    data: data,
    success: function(code) {
      if (code == 0) {
        layer.msg("邮箱或密码错误！", { icon:2 })
        return false;
      } else if (code == 1) {
        window.location.href = "./timeAxis.html"
      }
    }
  })
}