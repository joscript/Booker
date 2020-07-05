<template>
    <div>
        <div class="row">
            <div class="col-md-8" v-if="itemsInBasket">
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="first_name">First name</label>
                        <input type="text" class="form-control" v-model="customer.first_name" :class="[{'is-invalid': this.errorFor('customer.first_name')}]" name="first_name">
                        <v-errors :errors="errorFor('customer.first_name')"></v-errors>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="last_name">Last name</label>
                        <input type="text" class="form-control" v-model="customer.last_name" :class="[{'is-invalid': this.errorFor('customer.last_name')}]" name="last_name">
                        <v-errors :errors="errorFor('customer.last_name')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 form-group">
                        <label for="email">Email</label>
                        <input type="text" class="form-control" v-model="customer.email" :class="[{'is-invalid': this.errorFor('customer.email')}]" name="email">
                        <v-errors :errors="errorFor('customer.email')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="street">Street</label>
                        <input type="text" class="form-control" v-model="customer.street" :class="[{'is-invalid': this.errorFor('customer.street')}]" name="street">
                        <v-errors :errors="errorFor('customer.street')"></v-errors>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="city">City</label>
                        <input type="text" class="form-control" v-model="customer.city" :class="[{'is-invalid': this.errorFor('customer.city')}]" name="city">
                        <v-errors :errors="errorFor('customer.city')"></v-errors>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5 mb-3">
                        <label for="country">Country</label>
                        <select class="custom-select d-block w-100" v-model="customer.country" :class="[{'is-invalid': this.errorFor('customer.country')}]" name="country">
                        <option value="">Choose...</option>
                        <option>United States</option>
                        </select>
                        <v-errors :errors="errorFor('customer.country')"></v-errors>
                        <div class="invalid-feedback">
                        Please select a valid country.
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="state">State</label>
                        <select class="custom-select d-block w-100" v-model="customer.state" :class="[{'is-invalid': this.errorFor('customer.state')}]" name="state">
                        <option value="">Choose...</option>
                        <option>California</option>
                        </select>
                        <v-errors :errors="errorFor('customer.state')"></v-errors>
                        <div class="invalid-feedback">
                        Please provide a valid state.
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="zip">Zip</label>
                        <input type="text" class="form-control" v-model="customer.zip" :class="[{'is-invalid': this.errorFor('customer.zip')}]" name="zip" placeholder="3315" required="">
                        <v-errors :errors="errorFor('customer.zip')"></v-errors>
                        <div class="invalid-feedback">
                        Zip code required.
                        </div>
                    </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-12">
                            <button class="btn btn-primary btn-lg btn-block" type="submit" :disabled="loading" @click.prevent="book">
                                <span v-if="!loading">Book Now!</span>
                                <span v-if="loading"><i class="fas fa-circle-notch fa-spin"></i> Booking...</span>
                            </button>
                        </div>
                    </div>
            </div>
            <div class="col-md-8" v-else>
                <div class="jumbotron jumbotron-fluid text-center">
                    <h1>Empty</h1>
                </div>
            </div>
            <div class="col-md-4">
                <div class="d-flex justify-content-between">
                    <h6 class="text-uppercase text-secondary font-weight-bolder">Your cart</h6>
                    <h6 class="badge badge-secondary text-uppercase">
                        <span v-if="itemsInBasket">Items {{itemsInBasket}}</span>
                        <span v-else>Empty</span>
                    </h6>
                </div>

                <transition-group :class="[{'is-invalid': this.errorFor('customer.to')}]" name="fade">
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
import validationErrors from '../shared/mixins/validationErrors';

export default {
    mixins: [validationErrors],
    data(){
        return {
            customer: {
                first_name: null,
                last_name: null,
                email: null,
                street: null,
                city: null,
                country: null,
                state: null,
                zip: null
            },
            loading: false
        }
    },
    methods: {
        async book (){
            this.loading = true;
            this.errors = null;

            try {
                await axios.post('/api/checkout', {
                        customer: this.customer,
                        bookings: this.basket.map(basketItem => ({
                                    bookable_id: basketItem.bookable.id,
                                    from: basketItem.dates.from,
                                    to: basketItem.dates.to
                                }))
                });
                this.$store.dispatch("clearBasket");
            } catch (error) {
                this.errors = error.response && error.response.data.errors;
            }

            this.loading = false;
        }
    },
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
