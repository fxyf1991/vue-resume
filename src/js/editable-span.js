Vue.component('editable-span', {
    props: ['value'],
    template: `
                <span class="editable-span">
                    <span v-show="!editing" contenteditable="true">{{value}}</span>
                    <input v-show="editing" type="text" :value="value" @input="triggerEdit">
                    <button @click="editing = !editing">edit</button>
                </span>
        `,
    data(){
        return{
            editing: false
        }
    },
    methods:{
        triggerEdit(e){
            this.$emit('edit', e.target.value)
        }
    }
})