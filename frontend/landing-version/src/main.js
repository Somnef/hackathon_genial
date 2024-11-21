import { createApp } from "vue";
import "./assets/style.css";
import App from "./App.vue";
import VueSmoothScroll from "vue3-smooth-scroll";
import router from './router'; // Import the router
import { createVuestic } from 'vuestic-ui'; // Vuestic UI does not have a default export, use named imports
import vuesticGlobalConfig from './services/vuestic-ui/global-config';


import Button from "./components/Button.vue";
import LinkButton from "./components/LinkButton.vue";

let app = createApp(App);

app.use(VueSmoothScroll);

app.component("Button", Button);
app.component("LinkButton", LinkButton);

// Use Vuestic UI correctly here
app.use(router).use(createVuestic({ config: vuesticGlobalConfig })).mount("#app");