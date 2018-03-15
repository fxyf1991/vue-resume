let app = new Vue({
    el: '#app',
    data: {
        editingName: 'true',
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
        save() {
            let currentUser = AV.User.current();
            if (!currentUser) {
                this.showLogin()
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
        }
    }
});