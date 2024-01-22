import { createApp } from 'vue';
//import { createUser } from '..';
const vueApp = createApp({
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: ''
            }
        };
    },
    methods: {
        createUser() {
            console.log(this.form);
        }
    }
});
vueApp.mount('#app');
export default vueApp;
