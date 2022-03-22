<template>
    <div>
        <div class="main-container">
            <div class="container main-content">
                <div class="row">
                    <div class="col-xs-6">
                        <TweetList :tweets="tweets"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
} from 'vue'
import Tweets from '@/collections/Tweets'
import TweetList from '@components/tweets/TweetList.vue'

export default defineComponent({
    name: 'LandingPageIndex',
    components: {TweetList},
    async setup (propsObj) {
        const tweets = reactive(await Tweets.load())

        return {
            tweets
        }
    },
})
</script>

<style lang="scss" scoped>
@import "@/assets/pages/landing/style.scss";
</style>