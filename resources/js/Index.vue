<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">Laravel BnB</router-link>
            <!-- <router-link class="btn nav-btn" :to="{name: 'second'}">Second</router-link> -->

            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'basket'}">
                        Basket <span v-if="itemsInBasket" class="badge badge-secondary">{{itemsInBasket}}</span>
                    </router-link>
                </li>

                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link :to="{name: 'register'}" class="nav-link">Register</router-link>
                </li>

                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link :to="{name: 'login'}" class="nav-link">Login</router-link>
                </li>

                <li class="nav-item" v-if="isLoggedIn">
                    <a href="#" class="nav-link" @click.prevent="Logout">Logout</a>
                </li>
            </ul>
        </nav>

        <div class="container mt-4 px-4">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return{
            lastSearch: this.$store.state.lastSearch
        }
    },
    computed: {
        ...mapState({
            lastSearchComputed: state => state.lastSearch,
            isLoggedIn: "isLoggedIn"
        }),
        ...mapGetters({
            itemsInBasket: 'itemsInBasket'
        })
    },
    methods: {
        async Logout(){
            try {
                axios.post('/logout');
                this.$store.dispatch('logout');
            } catch (error) {
                this.$store.dispatch('logout');
            }
        }
    }
}
</script>
