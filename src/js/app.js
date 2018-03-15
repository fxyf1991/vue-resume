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
            // let User = AV.Object.extend('User');
            // let user = new User();
            // user.set('resume',this.resume);
            // user.save().then(function () {
            // }, function (error) {
            //     console.error(error);
            // });
        },
    }
});