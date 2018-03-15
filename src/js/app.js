let app = new Vue({
    el: '#app',
    data: {
        loginVisible: false,
        signUpVisible: false,
        currentUser: {
            objectId:'',
            email:''
        },
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
            user.signUp().then( (user) => {
                alert('注册成功')
                user = user.toJSON()
                this.currentUser.objectId = user.objectId
                this.currentUser.email = user.email
                this.signUpVisible = false
            }, function (error) {
                alert(error.rawMessage)
            });
            },
        onLogin(e){
            AV.User.logIn(this.login.email, this.login.password).then( (user) => {
                user = user.toJSON()
                this.currentUser.objectId = user.objectId
                this.currentUser.email = user.email
                this.loginVisible = false
            }, function (error) {
                if (error.code === 211){
                    alert('邮箱不存在')
                }else if(error.code === 210){
                    alert('邮箱和密码不匹配')
                }
            });
        },
        hasLogin(){
            return !!this.currentUser.objectId
        },
        onLogout(){
            AV.User.logOut();
            alert('注销成功')
            window.location.reload()
        },
        saveResume(){
            let {objectId} = AV.User.current().toJSON()
            let user = AV.Object.createWithoutData('User', objectId);
            user.set('resume', this.resume);
            user.save().then(()=>{
                alert('保存成功')
            }),()=>{
                alert('保存失败')
            }
        },
        getResume(){
            let query = new AV.Query('User')
            query.get(this.currentUser.objectId).then( (user) => {
                let resume = user.toJSON().resume
                this.resume = resume
            }, function (error) {
                // 异常处理
            });
        }
    }
})
//页面加载一开始就获取用户信息
let currentUser = AV.User.current()
if(currentUser){
    app.currentUser = currentUser.toJSON()
    app.getResume()
}
