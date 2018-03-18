window.App = {
    template: `
    <div>
        <app-aside v-show="mode === 'edit'" :logout-visible="hasLogin()" @logout="onLogout" @save="onClickSave">
        </app-aside>
        <main>
            <resume :mode="mode" :display-resume="displayResume" :resume="resume"></resume>
        </main>
        <button class="exitPreview" @click="mode = 'edit'" v-if="mode === 'preview'">退出预览</button>
    </div>
    `,
    data(){
        return {
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
            shareLink:'',
            mode:'edit',
            skinPickerVisible:false,
            mainClass:'default',
        }
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
                this.$router.push('/login')
            } else {
                this.saveResume()
            }
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
        print(){
            window.print()
        },
        onShare(){
            if (this.hasLogin()){
                this.shareVisible = true
            }else {
                alert('请先登录')
            }
        },
        onLogin(user){
            this.currentUser.objectId = user.objectId
            this.currentUser.email = user.email
            this.loginVisible = false
        }
    },
    watch:{
        'current.ObjectId': function (newValue, oldValue) {
            if(newValue){
                this.getResume(this.currentUser).then((resume)=>{
                    this.resume = resume
                })
            }
        }
    },
    computed:{
        displayResume(){
            return this.mode === 'preview' ? this.previewResume : this.resume
        }
    }
}
Vue.component('app', App)
