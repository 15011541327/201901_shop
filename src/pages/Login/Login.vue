<template>
  <!--on表示显示，off表示关闭-->
  <div class="on">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">
                  {{computeTime>0? `已发送(${computeTime})s` :'获取验证码'}}
                </button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                  <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                  <div class="switch_button" :class="showPwd ?'on' : 'off'" @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{showPwd? 'abc': '...'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" ref="captcha" src="http://localhost:3000/captcha" alt="captcha" @click="getCaptcha">
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
    </section>
  </div>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip.vue'
  import {reqSendCode,reqPwdLogin,reqSmsLogin} from'../../api/index'
    export default{
      components:{
        AlertTip
      },
      data(){
        return{
          loginWay:true,  //true代表短信登录，false代表密码登录
          phone:'',       // 手机号
          code:'' ,          // 短信验证码
          computeTime: 0,   // 倒计时的时间
          showPwd:false ,   //是否显示密码
          pwd:'',           //密码
          name:'',      //用户名
          captcha: '', // 图形验证码
          alertText: '', // 提示文本
          alertShow: false, // 是否显示警告框
        }
      },
      computed:{
        rightPhone(){
          return /^1\d{10}$/.test(this.phone)
        },
      },
      methods:{
        // 异步获取短信验证码
        async getCode(){
          //如果没有倒计时执行
          if(!this.computeTime){
            //倒计时
            this.computeTime = 30;
            this.intervalId = setInterval(() => {
              this.computeTime--;
              if(this.computeTime <= 0){
                // 停止计时
                clearInterval(this.intervalId);
              }
            },1000);
            //发送ajax 请求(请求后台向指定手机号发验证码短信
            let result = await reqSendCode(this.phone);
            if(result.code === 1){
              //验证码发送失败提示警告
              this.showAlert(result.msg);
              //判断倒计时是否还在进行；如果还在，停止倒计时
              if(this.computeTime){
                this.computeTime = 0;
                clearInterval(this.intervalId);
              }
            }
          }
        },
        //封装提示警告框更新内容
        showAlert(alertText) {
          this.alertShow = true;
          this.alertText = alertText;
        },
        //登录、注册
        async login(){
          //定义保存ajax请求结果的变量
          let result;
          //判断登录方式
          if(this.loginWay){//短信登录
            const {phone,code,rightPhone} = this;
            if(!rightPhone){//判断手机号是否正确
              //手机号错误
              this.showAlert('手机号不正确');
              return
            }else if(!/^\d{6}$/.test(code)){
              //验证码错误
              this.showAlert('验证码错误');
              return
            }
            // 发送ajax请求手机号短信登陆
            result = await reqSmsLogin(phone,code);
          }else{//密码登录
            const {name,captcha,pwd} = this;
            if(!name) {
              // 用户名必须指定
              this.showAlert('用户名必须指定');
              return
            } else if(!pwd) {
              // 密码必须指定
              this.showAlert('密码必须指定');
              return
            } else if(!captcha) {
              // 验证码必须指定
              this.showAlert('验证码必须指定');
              return
            }
            // 发送ajax请求用户名密码登录
            result = await reqPwdLogin({name,pwd,captcha})
          }
          //停止倒计时
          if(this.computeTime){
            this.computeTime = 0;
            clearInterval(this.intervalId);
          }
          //根据ajax请求结果处理相关
          if(result.code === 0){
            //保存用户信息到state中
            const user = result.data;
            this.$store.dispatch('recordUser',user);
            //跳转到个人中心界面
            this.$router.replace('/profile')
          }else {
            //显示警告提示
            this.showAlert(result.msg);
            //更新验证码
            this.$refs.captcha.src = 'http://localhost:3000/captcha?' + Date.now();
          }
        },
        //关闭提示框
        closeTip(){
          this.alertShow = false;
          this.alertText = '';
        },
        //获取图片验证码
        getCaptcha(event){//src每次必须不同，才会刷新验证码
          this.$refs.captcha.src ='http://localhost:3000/captcha?'+ Date.now();
        }
      }
    }
</script>

<style>
  .on{
    width:100%;
    height:100%;
  }
  .on .loginContainer {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .on .loginContainer .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;
  }
  .on .loginContainer .loginInner .login_header .login_logo {
    font-size: 40px;
    font-weight: bold;
    color: #02a774;
    text-align: center;
  }
  .on .loginContainer .loginInner .login_header .login_header_title {
    padding-top: 40px;
    text-align: center;
  }
  .on .loginContainer .loginInner .login_header .login_header_title >a {
    color: #333;
    font-size: 14px;
    padding-bottom: 4px;
  }
  .on .loginContainer .loginInner .login_header .login_header_title >a:first-child {
    margin-right: 40px;
  }
  .on .loginContainer .loginInner .login_header .login_header_title >a.on {
    color: #02a774;
    font-weight: 700;
    border-bottom: 2px solid #02a774;
  }
  .on .loginContainer .loginInner .login_content >form >div {
    display: none;
  }
  .on .loginContainer .loginInner .login_content >form >div.on {
    display: block;
  }
  .on .loginContainer .loginInner .login_content >form >div input {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: 0;
    font: 400 14px Arial;
  }
  .on .loginContainer .loginInner .login_content >form >div input:focus {
    border: 1px solid #02a774;
  }
  .on .loginContainer .loginInner .login_content >form >div .login_message {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
  }
  .on .loginContainer .loginInner .login_content >form >div .login_message .get_verification {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border: 0;
    color: #ccc;
    font-size: 14px;
    background: transparent;
  }
  .on .loginContainer .loginInner .login_content >form >div .login_message .right_phone{color:black;}
  .on .loginContainer .loginInner .login_content >form >div .login_verification {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
  }
  .on .loginContainer .loginInner .login_content >form >div .login_verification .switch_button {
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: background-color 0.3s, border-color 0.3s;
    padding: 0 6px;
    width: 30px;
    height: 16px;
    line-height: 16px;
    color: #fff;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
  .on .loginContainer .loginInner .login_content >form >div .login_verification .switch_button.off {
    background: #fff;
  }
  .on .loginContainer .loginInner .login_content >form >div .login_verification .switch_button.off .switch_text {
    float: right;
    color: #ddd;
  }
  .on .loginContainer .loginInner .login_content >form >div .login_verification .switch_button.on {
    background: #02a774;
  }
  .on .loginContainer .loginInner .login_content >form >div .login_verification .switch_button >.switch_circle {
    position: absolute;
    top: -1px;
    left: -1px;
    width: 16px;
    height: 16px;
    border: 1px solid #ddd;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  }
  .on .loginContainer .loginInner .login_content >form >div .login_verification .switch_button >.right{
    transition: transform 0.3s;
    transform:translateX(30px);
  }
  .on .loginContainer .loginInner .login_content >form >div .login_hint {
    margin-top: 12px;
    color: #999;
    font-size: 14px;
    line-height: 20px;
  }
  .on .loginContainer .loginInner .login_content >form >div .login_hint >a {
    color: #02a774;
  }
  .on .loginContainer .loginInner .login_content >form .login_submit {
    display: block;
    width: 100%;
    height: 42px;
    margin-top: 30px;
    border-radius: 4px;
    background: #4cd96f;
    color: #fff;
    text-align: center;
    font-size: 16px;
    line-height: 42px;
    border: 0;
  }
  .on .loginContainer .loginInner .login_content .about_us {
    display: block;
    font-size: 12px;
    margin-top: 20px;
    text-align: center;
    color: #999;
  }
  .on .loginContainer .loginInner .go_back {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 30px;
    height: 30px;
  }
  .on .loginContainer .loginInner .go_back >.iconfont {
    font-size: 20px;
    color: #999;
  }
</style>
