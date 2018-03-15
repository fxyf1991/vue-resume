let app = new Vue({
    el: '#app',
    data: {
        loginVisible: false,
        signUpVisible: false,
        resume: {
            name: '李弢',
            jobTitle: '前端工程师',
            birthday: '1991年',
            gender: '男',
            email: 'fxyf1991@gmail.com',
            phone: '18551629909'
        },
        signUp: {
            email:'',
            password:''
        },
        login:{
            email:'',
            password:''
        }
    },
    methods: {
        onEdit(key, value) {
            this.resume[key] = value
        },
        onClickSave() {
            let currentUser = AV.User.current();
            if (!currentUser) {
                this.loginVisible = true
            } else {
                this.saveResume()
            }
        },
        onSignUp(e){
            let user = new AV.User();
            user.setUsername(this.signUp.email);
            user.setPassword(this.signUp.password);
            user.setEmail(this.signUp.email);
            user.signUp().then(function (user) {
                console.log(user);
            }, function (error) {
            });        },
        onLogin(){
            AV.User.logIn(this.login.email, this.login.password).then(function (loginedUser) {
                console.log(loginedUser);
            }, function (error) {
                if (error.code === 211){
                    alert('邮箱不存在')
                }else if(error.code === 210){
                    alert('邮箱和密码不匹配')
                }
            });
        },
        onLogout(){
            AV.User.logOut();
            alert('注销成功')
        },
        saveResume(){
            let user = AV.Object.createWithoutData('User', AV.User.current().id);
            user.set('resume', this.resume);
            user.save();
        }
    }
});