var fpwdModel = new Vue({
  el: '#fpwd',
  data: {
    step: 3,
    tel: '18675594174'
  },
  methods: {
    // 第一步
    step1: function () {
      var _this = this,
          telPhoneNum = this.$refs.telPhoneNum
      if (telPhoneNum.value == '') {
        passortModel.errorFn('请输入您的手机号码或邮箱')
        telPhoneNum.focus()
        return false
      } else {
        if (passortModel.verifyTel(telPhoneNum.value) || passortModel.verifyEmail(telPhoneNum.value)) {
          this.step = 2
          this.tel = telPhoneNum.value
        } else {
          passortModel.errorFn('请输入正确的手机号码或邮箱')
          telPhoneNum.focus()
          telPhoneNum.select()
          return false
        }
      }
    },
    // 第二步
    step2: function () {
      var _this = this, SMSVerify = this.$refs.SMSVerify,
          newPassword = this.$refs.newPassword,
          verifySMSUrl = headerModel.api + '/Passport/ValidatePhoneCode'

      if (SMSVerify.value == '' ) {
        passortModel.errorFn('请输入短信验证码')
        SMSVerify.focus()
        return false
      }
      if (newPassword.value == '') {
        passortModel.errorFn('请输入您的新密码')
        newPassword.focus()
        return false
      }
      $.ajax({
        url: verifySMSUrl,
        type: 'POST',
        data: {"Phone": _this.tel, "Code": SMSVerify.value},
        success: function (res) {
          // 请求成功，但验证失败
          if (res.resultid !== 200) {
            passortModel.errorFn(res.message)
            SMSVerify.select()
            return false
          } else {
            // window.location.href = './success.html?fpwd'
          }
        },
        error: function(e){
          $.dialog({
            type: 'ok',
            message: e.status + ' ' + e.statusText,
            delay: 1000,
            effect: true
          })
        }
      })
    },

  },
  mounted: function () {
    // this.$refs.step1text.focus()
  }
})