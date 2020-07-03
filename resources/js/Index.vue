<template>
    <div>
        <nav class="navbar navbar-light bg-white border-bottom">
            <router-link class="navbar-brand mr-auto" :to="{name: 'home'}">Laravel BnB</router-link>
            <!-- <router-link class="btn nav-btn" :to="{name: 'second'}">Second</router-link> -->
            <router-link class="btn nav-btn" :to="{name: 'basket'}">
                Basket <span v-if="itemsInBasket" class="badge badge-secondary">{{itemsInBasket}}</span>
            </router-link>
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
            lastSearchComputed: state => state.lastSearch
        }),
        ...mapGetters({
            itemsInBasket: 'itemsInBasket'
        })
    }
}
</script>
