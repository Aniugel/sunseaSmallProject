// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acount:'',
    password: '',
    placeholderAcount:'用户名/邮箱/手机号',
    placeholderPassword:'密码',
    findPassword:'找回密码',
    companyRegister: '公司注册',
    phoneRegister:'手机注册',
    disabled:'true',
    login:'登录',
    btnstate:'default',
  },
  acountInput:function(e){
    var content=e.detail.value;
    console.log(content);
    if(content!=''){
      this.setData({disabled:false,btnstate:'primary',acount:content});
    }else{
      this.setData({ disabled: true, btnstate: 'default'});
    }
  },
  pwdBlur:function(e){
    var password=e.detail.value;
    if(password!=''){
      this.setData({password:password})
    }
  }
})