Vue.component('share',{
    props:['shareLink'],
    template:`
        <div  class="share" v-cloak>
        <h2>
            请将链接分享给面试官
        </h2>
        <textarea readonly>{{shareLink}}</textarea>
    </div>
    `
})