<template>
    <div>
        <fatal-error v-if="error"></fatal-error>
        <success v-if="success">
            You've left a review, thank you very much!
        </success>
        <div class="row" v-else>
            <div :class="[{'col-md-4': twoColumn}, {'d-none': oneColumn}]">
                <div class="card">
                    <div class="card-body">
                        <div v-if="loading">
                            Loading...
                        </div>
                        <div v-if="hasBooking">
                            <p>Stayed at <router-link :to="{name: 'bookable', params: {id: booking.bookable.bookable_id}}">{{booking.bookable.title}}</router-link></p>
                            <p>From {{booking.from}} To {{booking.to}}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div :class="[{'col-md-8': twoColumn}, {'col-md-12': oneColumn}]">
                <div v-if="loading">
                Loading...
                </div>
                <div v-else>
                    <div v-if="alreadyReviewed">
                        <h3>You've already left a review for this booking!</h3>
                    </div>
                    <div v-else>
                        <div class="form-group">
                            <label for="" class="text-muted">Select the star rating (1 is worst - 5 is best)</label>
                            <star-rating class="fa-3x" v-model="review.rating"></star-rating>
                        </div>
                        <div class="form-group">

                            <label for="content" class="text-muted">Describe your experience with</label>
                            <textarea
                                name="content"
                                class="form-control"
                                cols="30" rows="10"
                                v-model="review.content"
                                :class="[{'is-invalid': errorFor('content')}]">
                            </textarea>
                            <v-errors :errors="errorFor('content')"></v-errors>

                        </div>
                        <button class="btn btn-primary btn-block" @click.prevent="submit" :disabled="sending">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {is404, is422} from "./../shared/utils/response"
import validationErrors from "./../shared/mixins/validationErrors"

export default {
    mixins: [validationErrors],
    data() {
        return {
            review: {
                id: null,
                rating: 1,
                content: null
            },
            existingReview: null,
            loading: false,
            booking: null,
            error: false,
            sending: false,
            success: false
        }
    },
    methods:{
        onRatingChanged(rating){
            console.log(rating)
        }
    },
    computed: {
        alreadyReviewed(){
            return this.hasReview || !this.booking
        },
        hasReview(){
            return this.existingReview !== null
        },
        hasBooking(){
            return this.booking !== null
        },
        oneColumn() {
            return !this.loading && this.alreadyReviewed
        },
        twoColumn() {
            return this.loading || !this.alreadyReviewed
        }
    },
    methods: {
        submit() {
            this.errors = null;
            this.sending = true;
            this.success = false;

            axios.post('/api/reviews', this.review)
            .then( response => {
                this.success = response.status === 201; // if response.status == 201 -> true
            })
            .catch( (error) => {{
                if(is422(error)){
                    const errors = error.response.data.errors

                    if(errors["content"] && 1 === _.size(errors)){
                        this.errors = errors
                        return;
                    }

                }
                this.error = true
            }})
            .then( () => {
                this.sending = false
            })
        },
    },
    async created() {

        this.review.id = this.$route.params.id
        this.loading = true

        // async await version
        try {
            this.existingReview = (await axios.get(`/api/reviews/${this.review.id}`)).data.data;
        } catch (err) {
            if (is404(err)) {
                try {
                    this.booking = (await axios.get(`/api/booking-by-review/${this.review.id}`)).data.data;
                } catch (err) {
                    this.error = !is404(err);
                }
            } else {
                this.error = true;
            }
        }
        this.loading = false;

        // axios.get(`/api/reviews/${this.review.id}`)
        // .then( response => { // if already reviewed
        //     this.existingReview = response.data.data
        // })
        // .catch( error => { // if no review
        //     if(is404(error)){
        //         // fetching booking by a review key
        //         return axios.get(`/api/booking-by-review/${this.review.id}`)
        //                 .then( response => {
        //                     this.booking = response.data.data
        //                 })
        //                 .catch( error => {
        //                     // !is404(error) ? this.error = true : {}
        //                     if(!is404(error)) this.error = true
        //                     // this.error = !is404(error)
        //                 })
        //     }
        //     this.error = true
        //  })
        // .then( (response) => {
        //     // console.log(response)
        //     this.loading = false
        // })
    },
}

// let xxx = new Promise( (resolve, reject) => {
//  	console.log('executing in 2 sec...')
//   	setTimeout(() => {
//       resolve('resolved promise custom');
//     }, 2000);
// })

// xxx.then( (res) => console.log(res) );
</script>

<style scoped>
    .form-control.is-invalid ~ div > .invalid-feedback {
        display: block;
    }
</style>
