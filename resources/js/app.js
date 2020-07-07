require('./bootstrap');

// npm's
import VueRouter from "vue-router"
import router from "./route";
import moment from "moment"
import Vuex from "vuex";

// components
import Index from "./Index.vue";
import StarRating from './shared/components/StarRating';
import FatalError from './shared/components/FatalError';
import ValidationErrors from './shared/components/ValidationErrors';
import Success from './shared/components/Success';
import ButtonLoad from "./shared/components/ButtonLoad";

// helpers
import storeDefinition from "./store";
import Axios from "axios";

// globals
window.Vue = require('vue');
Vue.use(VueRouter);
Vue.use(Vuex);

Vue.filter("fromNow", value => moment(value).fromNow());
Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("v-errors", ValidationErrors);
Vue.component("success", Success);
Vue.component("button-load", ButtonLoad);


const store = new Vuex.Store(storeDefinition);
// store.commit('increment'); // calling mutation using commit
// store.commit('increment'); // calling mutation using commit
// console.log(store.state.count);

// store.commit('changeName', 'Lagat');

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        Index
    },
    async beforeCreate() {
        this.$store.dispatch("loadStoredState"); // calling the loadStoredState action to make a data mutation and set the lastSearch object datas from the local storage

        // await axios.get('/sanctum/csrf-cookie');
        // await axios.post('/login', {
        //     email: "josua.lagat@gmail.com",
        //     password: "password"
        // });

        // await axios.get('/user');
    }
});
