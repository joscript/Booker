<template>
    <div class="row">
        <div class="col-md-8">
            <div v-if="!loading">
                <div class="card">
                    <div class="card-body">
                        <h2>{{bookable.title}}</h2>
                        <hr>
                        <article>{{bookable.description}}</article>
                    </div>
                </div>
            </div>
            <div v-else>
                Loading...
            </div>
            <review-list :bookable-id="this.$route.params.id"></review-list>
        </div>
        <div class="col-md-4">
            <availability :bookable-id="this.$route.params.id" v-on:availability="checkPrice($event)" class="mb-4"></availability>

            <transition name="fade">
                <div v-if="price">
                    <price-breakdown :price="price"></price-breakdown>
                    <button class="btn btn-primary btn-block" :disabled="inBasketAlready" @click="addToBasket">Book now</button>
                </div>
            </transition>

            <button class="btn btn-primary btn-block mt-2" v-if="inBasketAlready" @click="removeFromBasket">Remove from basket</button>
            <div v-if="inBasketAlready" class="mt-4 text-muted warning">Seems like you've added this object to basket already. if you want to change dates, remove it from the basket first</div>



        </div>
    </div>
</template>

<script>
import Availability from "./Availability";
import ReviewList from "./ReviewList";
import PriceBreakdown from "./PriceBreakdown";
import { mapState, mapGetters } from 'vuex';

export default {
    components: {
        Availability,
        ReviewList,
        PriceBreakdown
    },
    data() {
        return {
            bookable: null,
            loading: false,
            price: null,
            // from: this.$store.state.lastSearch.from,
            // to: this.$store.state.lastSearch.to,
        }
    },
    computed:{
        ...mapState({
            lastSearch: "lastSearch",
            // inBasketAlready(state){
            //     if(this.bookable === null){
            //         return false;
            //     }

            //     return state.basket.items.reduce((result, item) => result || item.bookable.id === this.bookable.id, false);
            // }
        }),
        inBasketAlready(){
            if(this.bookable === null){
                return false;
            }
            return this.$store.getters.inBasketAlready(this.bookable.id);
        }
    },
    methods: {
        async checkPrice(hasAvailability){
            // console.log(hasAvailability);
            if(!hasAvailability){
                this.price = null;
            }

            try {
                this.price = (await axios.get(`/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`)).data.data;
            } catch (error) {
                this.price = null;
            }
        },
        addToBasket(){
            this.$store.dispatch('addToBasket', {
                bookable: this.bookable,
                price: this.price,
                dates: this.lastSearch
            });
        },
        removeFromBasket(){
            this.$store.dispatch('removeFromBasket', this.bookable.id)
        }
    },
    created() {
        this.loading = true
        axios.get(`/api/bookables/${this.$route.params.id}`)
        .then( response => {
            this.bookable = response.data.data;
            this.loading = false
        })
    }
}
</script>

<style scoped>
.warning{
    font-size: 0.7rem;
}
</style>
