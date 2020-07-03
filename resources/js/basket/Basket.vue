<template>
    <div>
        <div class="row">
            <div class="col-md-8">
                Checkout form
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6 class="text-uppercase text-secondary font-weight-bolder">Your cart</h6>
                    <h6 class="badge badge-secondary text-uppercase">
                        <span v-if="itemsInBasket">Items {{itemsInBasket}}</span>
                        <span v-else>Empty</span>
                    </h6>
                </div>

                <transition-group name="fade">
                    <div v-for="item in basket" :key="item.bookable.id">
                        <div class="py-2 border-top d-flex justify-content-between">
                            <span>
                                <router-link class="text-dark" :to="{name: 'bookable', params: {id: item.bookable.id}}">{{item.bookable.title}}</router-link>
                            </span>
                            <span class="font-weight-bold">${{item.price.total}}</span>
                        </div>
                        <div class="py-1 d-flex justify-content-between">
                            <span>
                                <small> From {{item.dates.from}} </small>
                            </span>
                            <span>
                                <small> To {{item.dates.to}} </small>
                            </span>
                        </div>
                        <div class="py-1 text-right">
                            <button class="btn btn-sm btn-outline-secondary" @click="$store.dispatch('removeFromBasket', item.bookable.id)">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </transition-group>


            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["itemsInBasket"]),
        ...mapState({
            basket: state => state.basket.items
        })
    }
}
</script>

<style scoped>
    h6.badge {
        font-size: 100%;
    }
</style>
