<template>
  <div class="login">
      <!-- 使用elementUI组件 el-card -->
      <el-card class="login-card">
          <!-- 匿名插槽 -->
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <!-- 表单 => el-form 包裹 -->
          <!-- 数据校验 => el-form绑定 model表单数据 ,绑定rules规则 -->
          <el-form ref="myForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
              <el-form-item prop="mobile">
                  <!-- 手机号 -->
                  <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <!-- 验证码 -->
                  <el-input v-model="loginForm.code" style="width:65%" placeholder="请输入验证码"></el-input>
                  <!-- 发送验证码 -->
                  <el-button style="float:right">发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="agree">
                  <!-- 同意选项 -->
                  <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <!--登录按钮 -->
                    <el-button @click="login" type="primary" style="width:100%">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rules, value, callBack) {
      // rules表示当前的规则
      // value表示当前表单项的值
      // callBack表示执行后的回调函数
      value ? callBack() : callBack(new Error('登录前您需要勾选是否同意条款'))
    }
    return {
      // 表单数据是一个对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false// 是否同意协议
      },
      // 校验规则 required 为true 就表示该字段必填 如果不填 就会提示消息
      loginRules: {
        mobile: [{ require: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }],
        code: [{ require: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '您输入的验证码有误' }],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      // 校验整个表单的规则
      // validate 是一个方法 => 方法中传入的一个函数 两个校验参数  是否校验成功/未校验成功的字段
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          // 只有一切的校验通过之后 才会进行请求
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.loginForm
          }).then(result => {
            // 将后台返回的token令牌存储到前端缓存中
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/home') // 跳转到主页
          }).catch(() => {
            // 提示消息
            this.$message({
              type: 'warning',
              message: '您的手机号或者验证码错误'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
    background-image: url("../../assets/img/login_bg.jpg");
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
        width: 440px;
        height: 340px;
        .title{
            text-align: center;
            img{
                height: 45px;
            }
        }
    }
}
</style>
