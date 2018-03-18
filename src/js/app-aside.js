Vue.component('app-aside',{
    props:['logoutVisible'],
    template:`
        <aside >
        <div class="upper">
            <ul class="actions">
                <li>
                    <button class="button" @click="$emit('clickSave')">保存</button>
                </li>
                <li>
                    <button class="button" @click="$emit('share')">分享</button>
                </li>
                <li>
                    <button class="button" @click="$emit('print')">打印</button>
                </li>
                <li>
                    <button class="button" @click="$emit('changeTheme')">换肤</button>
                </li>
            </ul>
        </div>
        <div class="down">
            <!--!!用于转换变量为布尔值-->
            <button @click="$emit('logout')" v-show="logoutVisible">登出</button>
        </div>
    </aside>

    `
})