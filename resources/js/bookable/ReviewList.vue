<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder pt-5">Review List</h6>

        <!-- <star-rating :value="4.0"></star-rating>
        <star-rating :value="4.4"></star-rating>
        <star-rating :value="4.5"></star-rating>
        <star-rating :value="4.6"></star-rating>
        <star-rating :value="0.9"></star-rating>
        <star-rating :value="3.2"></star-rating>
        <star-rating :value="3.5"></star-rating>
        <star-rating :value="3.7"></star-rating> -->

        <div v-if="loading">
            Loading...
        </div>
        <div v-else>
            <div class="border-bottom d-none d-md-block" v-for="(review, index) in reviews" :key="`review ${index}`">
                <div class="row pt-4">
                    <div class="col-md-6">
                        Josua Lagat
                    </div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <!-- {{review.rating}} -->
                        <star-rating class="fa-lg" :value="review.rating"></star-rating>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <small>{{review.created_at | fromNow}}</small>
                    </div>
                </div>

                <div class="row py-4">
                    <div class="col-md-12">
                        {{review.content}}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
// import moment from "moment"

export default {
    props:{
        bookableId: [String, Number]
    },
    data() {
        return {
            loading: false,
            reviews: null,
        }
    },
    created() {
        this.loading = true;

        axios.get(`/api/bookables/${this.bookableId}/reviews`)
        .then( response => this.reviews = response.data.data )
        .then( () => this.loading = false )
    },
    // filters: {
    //     fromNow(value){
    //         return moment(value).fromNow()
    //     }
    // }
}
</script>
