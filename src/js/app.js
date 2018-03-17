let app = new Vue({
    el: '#app',
    data: {
        loginVisible: false,
        signUpVisible: false,
        shareVisible:false,
        previewUser:{
            objectId:''
        },
        previewResume:{

        },
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
            phone: '18551629909',
            skills:[
                {
                    name:'技能名称',
                    description:'技能描述'
                },
                {
                    name:'技能名称',
                    description:'技能描述'
                },
                {
                    name:'技能名称',
                    description:'技能描述'
                },
                {
                    name:'技能名称',
                    description:'技能描述'
                }
            ],
            projects:[
                {
                    name:'项目名称',
                    link:'x.com',
                    keywords:'关键字',
                    description:'详细情况'
                },
                {
                    name:'项目名称',
                    link:'x.com',
                    keywords:'关键字',
                    description:'详细情况'
                },
                {
                    name:'项目名称',
                    link:'x.com',
                    keywords:'关键字',
                    description:'详细情况'
                },
                {
                    name:'项目名称',
                    link:'x.com',
                    keywords:'关键字',
                    description:'详细情况'
                }
            ]
        },
        signUp: {
            email:'',
            password:''
        },
        login:{
            email:'',
            password:''
        },
        shareLink:'',
        mode:'edit'
    },
    methods: {
        onEdit(key, value) {
            let regex = /\[(\d+)\]/g
            key = key.replace(regex, (match,number)=>{
                return `.${number}`
            })
            keys = key.split('.')
            let result = this.resume
            for(let i = 0; i < keys.length; i++){
                if(i === keys.length-1){
                    result[keys[i]] = value
                }else {
                    result = result[keys[i]]
                }
            }
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
        getResume(user){
            let query = new AV.Query('User')
            return query.get(user.objectId).then( (user) => {
                let resume = user.toJSON().resume
                return resume
            }, function (error) {
                // 异常处理
            });
        },
        addSkill(){
            this.resume.skills.push({name:'技能名称',description:'技能描述'})
        },
        removeSkill(index){
            this.resume.skills.splice(index,1)
        },
        addProject(){
            this.resume.projects.push({name:'项目名称',link:'x.com',keywords:'关键字',description:'详细情况'})
        },
        removeProject(index){
            this.resume.projects.splice(index,1)
        },
    },
    watch:{
        'current.ObjectId': function (newValue, oldValue) {
            if(newValue){
                this.getResume(this.currentUser)
            }
        }
    },
    computed:{
        displayResume(){
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    }
})
//获取当前用户
let currentUser = AV.User.current()
if(currentUser) {
    app.currentUser = currentUser.toJSON()
    app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
    app.getResume(app.currentUser).then(resume => {
        app.resume = resume
    })
}

//获取预览用户
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if(matches){
    userId = matches[1]
    app.mode = 'preview'
    app.getResume({objectId:userId}).then(resume => {
        app.previewResume = resume
    })
}
