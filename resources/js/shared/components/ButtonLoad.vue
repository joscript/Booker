<template>
    <div>
        <button class="btn btn-secondary btn-block" @click="$emit('check-availability')">
            <span v-if="!loading">Check!</span>
            <span v-if="loading"><i class="fas fa-circle-notch fa-spin"></i> Checking ...</span>
        </button>
    </div>
</template>

<script>
export default {
    props:{
        loading: false,
        errors: null
    }
}
</script>
