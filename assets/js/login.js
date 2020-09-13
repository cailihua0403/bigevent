$(function(){
    $('#form-login').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#form-reg').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
   var form=layui.form
   form.verify({
       pwd:[/^[\S]{6,12}$/,'密码应为6-12位'],
       repwd:function(value){
        if($('.reg-box [name=password]').val()!==value) {
            return '两次密码不一致' 
        }
       }
   })
})