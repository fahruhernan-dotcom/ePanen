import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import router from './router';

// PrimeVue CSS
import 'primevue/resources/themes/lara-light-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import App from './App.vue';

// PrimeVue components
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Textarea from 'primevue/textarea';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Chart from 'primevue/chart';

import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

// Register PrimeVue components globally
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Textarea', Textarea);
app.component('Card', Card);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Dialog', Dialog);
app.component('Toast', Toast);
app.component('Dropdown', Dropdown);
app.component('Calendar', Calendar);
app.component('Chart', Chart);

app.mount('#app');
