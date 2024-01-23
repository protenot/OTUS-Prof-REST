import { createApp } from 'vue';

//console.log(createApp)
  const vueApp = 
 createApp({
  
   data(){
    return{
        form:{
            name:'',
            email:'',
            password:''
        }
    }
   },
   methods:{
    createUser(){
        console.log(this.form)
    }
   }
})
vueApp.mount('#app');
