
layui.use(["form","element"], function(){
  var form = layui.form;
  var element = layui.element;

  form.on('submit(*)', function(data){
    loginCheck(data.field);
    return false; 
  });

  form.verify({
    emailEn:[
        /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        , 'The mailbox format is incorrect!'
    ]
  });  

});

function loginCheck(data) {
  $.ajax({
    url: "../data/Login.ashx",
    type: "POST",
    data: data,
    success: function(code) {
      if (code == 0) {
        layer.msg("用户名错误！", { icon:2 })
        return false;
      } 
      else if (code == 1) {
        layer.msg("密码错误！", { icon:2 })
        return false;
      } else if (code == 2) {
        window.location.href = "../TimeAxis/timeAxis.html"
      } else if (code == 3) {
        window.location.href = "../Exhibitor_Info/exhibitor-info.html"
      }
    }
  })
}