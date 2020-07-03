<template>
    <div class="m-2">
        <div class="card w-100 h-100 my-2">
            <div class="card-body">
                <router-link :to="{ name: 'bookable', params: {id} }">
                    <h5 class="card-title">{{ title }}</h5>
                </router-link>
                <p class="card-text">{{ description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        description: String,
        id: Number
    },
    mounted(){
        // console.log(this.title)
        // this.title = "New title"
    }
}
</script>
