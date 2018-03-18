// let app = new Vue({
//     el: '#app',
//     data: {
//         loginVisible: false,
//         signUpVisible: false,
//         shareVisible:false,
//         previewUser:{
//             objectId:''
//         },
//         previewResume:{
//
//         },
//         currentUser: {
//             objectId:'',
//             email:''
//         },
//         resume: {
//             name: '李弢',
//             jobTitle: '前端工程师',
//             birthday: '1991年',
//             gender: '男',
//             email: 'fxyf1991@gmail.com',
//             phone: '18551629909',
//             skills:[
//                 {
//                     name:'技能名称',
//                     description:'技能描述'
//                 },
//                 {
//                     name:'技能名称',
//                     description:'技能描述'
//                 },
//                 {
//                     name:'技能名称',
//                     description:'技能描述'
//                 },
//                 {
//                     name:'技能名称',
//                     description:'技能描述'
//                 }
//             ],
//             projects:[
//                 {
//                     name:'项目名称',
//                     link:'x.com',
//                     keywords:'关键字',
//                     description:'详细情况'
//                 },
//                 {
//                     name:'项目名称',
//                     link:'x.com',
//                     keywords:'关键字',
//                     description:'详细情况'
//                 },
//                 {
//                     name:'项目名称',
//                     link:'x.com',
//                     keywords:'关键字',
//                     description:'详细情况'
//                 },
//                 {
//                     name:'项目名称',
//                     link:'x.com',
//                     keywords:'关键字',
//                     description:'详细情况'
//                 }
//             ]
//         },
//
//
//         shareLink:'',
//         mode:'edit',
//         skinPickerVisible:false,
//         mainClass:'default',
//     },
//     methods: {
//         onEdit(key, value) {
//             let regex = /\[(\d+)\]/g
//             key = key.replace(regex, (match,number)=>{
//                 return `.${number}`
//             })
//             keys = key.split('.')
//             let result = this.resume
//             for(let i = 0; i < keys.length; i++){
//                 if(i === keys.length-1){
//                     result[keys[i]] = value
//                 }else {
//                     result = result[keys[i]]
//                 }
//             }
//         },
//         onClickSave() {
//             let currentUser = AV.User.current();
//             if (!currentUser) {
//                 this.loginVisible = true
//             } else {
//                 this.saveResume()
//             }
//         },
//         hasLogin(){
//             return !!this.currentUser.objectId
//         },
//         onLogout(){
//             AV.User.logOut();
//             alert('注销成功')
//             window.location.reload()
//         },
//         saveResume(){
//             let {objectId} = AV.User.current().toJSON()
//             let user = AV.Object.createWithoutData('User', objectId);
//             user.set('resume', this.resume);
//             user.save().then(()=>{
//                 alert('保存成功')
//             }),()=>{
//                 alert('保存失败')
//             }
//         },
//         getResume(user){
//             let query = new AV.Query('User')
//             return query.get(user.objectId).then( (user) => {
//                 let resume = user.toJSON().resume
//                 return resume
//             }, function (error) {
//                 // 异常处理
//             });
//         },
//         addSkill(){
//             this.resume.skills.push({name:'技能名称',description:'技能描述'})
//         },
//         removeSkill(index){
//             this.resume.skills.splice(index,1)
//         },
//         addProject(){
//             this.resume.projects.push({name:'项目名称',link:'x.com',keywords:'关键字',description:'详细情况'})
//         },
//         removeProject(index){
//             this.resume.projects.splice(index,1)
//         },
//         print(){
//             window.print()
//         },
//         onShare(){
//             if (this.hasLogin()){
//                 this.shareVisible = true
//             }else {
//                 alert('请先登录')
//             }
//         },
//         onLogin(user){
//             this.currentUser.objectId = user.objectId
//             this.currentUser.email = user.email
//             this.loginVisible = false
//         }
//     },
//     watch:{
//         'current.ObjectId': function (newValue, oldValue) {
//             if(newValue){
//                 this.getResume(this.currentUser).then((resume)=>{
//                     this.resume = resume
//                 })
//             }
//         }
//     },
//     computed:{
//         displayResume(){
//             return this.mode === 'preview' ? this.previewResume : this.resume
//         }
//     }
// })
// //获取当前用户
// let currentUser = AV.User.current()
// if(currentUser) {
//     app.currentUser = currentUser.toJSON()
//     app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
//     app.getResume(app.currentUser).then(resume => {
//         app.resume = resume
//     })
// }
//
// //获取预览用户
// let search = location.search
// let regex = /user_id=([^&]+)/
// let matches = search.match(regex)
// let userId
// if(matches){
//     userId = matches[1]
//     app.mode = 'preview'
//     app.getResume({objectId:userId}).then(resume => {
//         app.previewResume = resume
//     })
// }




// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    { path: '/', component: window.App },
    { path: '/login', component: window.Login },
    { path: '/signUp', component: window.Signup },
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const root = new Vue({
    router,
    data(){
        return {
            currentUser:{}
        }
    }
}).$mount('#root')