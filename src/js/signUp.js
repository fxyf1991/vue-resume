window.Signup = {
    data(){
        return {
            signUp: {
                email:'',
                password:''
            },

        }
    },
    methods:{
        onSignUp(e){
            let user = new AV.User();
            user.setUsername(this.signUp.email);
            user.setPassword(this.signUp.password);
            user.setEmail(this.signUp.email);
            user.signUp().then( (user) => {
                alert('注册成功')
                user = user.toJSON()
                this.$emit('signUp')
            }, function (error) {
                alert(error.rawMessage)
            });
        },
        onClickLogin(e){
            this.$emit('goToLogin')
        }
    },
    template:`
        <div  class="signUp" v-cloak>
        <form class="form" @submit.prevent="onSignUp">
            <h2>注册</h2>
            <!--不加type="button"会默认type为submit-->
            <button type="button" @click="signUpVisible = false">关闭</button>
            <div class="row">
                <label>邮箱</label>
                <input type="text" v-model="signUp.email">
            </div>
            <div class="row">
                <label>密码</label>
                <input type="text" v-model="signUp.password">
            </div>
            <div class="actions">
                <button type="submit">
                    提交
                </button>
                <router-link to="/login">登录</router-link>
            </div>

        </form>
    </div>
    `
}
Vue.component('signUp',window.Signup)