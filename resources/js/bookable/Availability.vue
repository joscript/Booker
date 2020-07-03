<template>
    <div class="mt-4">
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check availability
            <transition name="fade">
                <span class="text-danger" v-if="noAvailability">(NOT AVAILABLE)</span>
                <span class="text-success" v-if="hasAvailability">(AVAILABLE)</span>
            </transition>
        </h6>

        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input
                    type="text"
                    name="from"
                    class="form-control form-control-sm"
                    v-model="from" @keyup.enter="check"
                    :class="[{'is-invalid': this.errorFor('from')}]"
                    placeholder="Start date"
            >
                <v-errors :errors="errorFor('from')"></v-errors>
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input
                type="text"
                name="to"
                class="form-control form-control-sm"
                v-model="to"
                @keyup.enter="check"
                :class="[{'is-invalid': this.errorFor('to')}]"
                placeholder="End date"
            >
                <v-errors :errors="errorFor('to')"></v-errors>
            </div>
        </div>
        <!-- <button class="btn btn-secondary btn-block" @click="check" :disabled="loading">
            <span v-if="!loading">Check!</span>
            <span v-if="loading"><i class="fas fa-circle-notch fa-spin"></i> Checking ...</span>
        </button> -->
        <button-load :loading="loading" :errors="errors" v-on:check-availability="check" :disabled="loading"></button-load>
    </div>
</template>

<script>
import {is422} from "./../shared/utils/response";
import validationErrors from "./../shared/mixins/validationErrors";

export default {
    mixins: [validationErrors],
    props:{
        bookableId: [String, Number]
    },
    data() {
        return{
            from: this.$store.state.lastSearch.from,
            to: this.$store.state.lastSearch.to,
            loading: false,
            status: null,
        }
    },
    methods: {
        chk(){
            alert('checked');
        },
        // check() {
        //     this.loading = true
        //     this.errors = null

        //     this.$store.dispatch('setLastSearch', {from: this.from, to: this.to});

        //     axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
        //     .then( response => {
        //         this.status = response.status
        //     })
        //     .catch( error => {
        //         if(is422(error)) this.errors = error.response.data.errors
        //         this.status = error.response.status
        //     })
        //     .then( () => this.loading = false )
        // },
        async check() {
            this.loading = true
            this.errors = null

            this.$store.dispatch('setLastSearch', {from: this.from, to: this.to});

            try{
                this.status = (await axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)).status;
                this.$emit("availability", this.hasAvailability);
            }catch(error){
                if(is422(error)) this.errors = error.response.data.errors;
                this.status = error.response.status;
                this.$emit("availability", this.hasAvailability);
            }
            this.loading = false;
        },
    },
    computed: {
        hasErrors(){
            return this.status === 422 && this.errors !== null;
        },
        hasAvailability(){
            return this.status === 200;
        },
        noAvailability(){
            return this.status === 404;
        }
    }
}
</script>

<style scoped>
    label {
        font-size: 0.7rem;
        text-transform: uppercase;
        color: gray;
        font-weight: bold;
    }
</style>
