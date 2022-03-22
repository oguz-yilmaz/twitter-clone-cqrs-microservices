import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Requester } from '@/lib/api/Requester'
import '@/boot/packages'

const app = createApp(App)

app.provide('$requester', new Requester());

app.use(router)

app.mount('#app');
