<template>
    <div>
        <ol class="tweet-list">
            <li v-for="tweet in tweets" class="tweet-card">
                <div class="tweet-content">
                    <div class="tweet-header">
                    <span class="fullname">
                      <strong>{{ tweet.user.username }}</strong>
                    </span>
                        <span class="username">@JonVadillo </span>
                        <span class="tweet-time"> {{ tweet.created_at.toLocaleString() }}</span>
                    </div>

                    <div class="tweet-text">
                        <p class="" lang="es" data-aria-label-part="0">
                            ¡Nuevo artículo en Mozilla!
                            <br>Resuelto: Corregido – Una breve historia sobre un error reportado por la comunidad
                            <a href="" class="twitter-hashtag"><s>#</s><b>firefox</b></a> <a href="" class="twitter-hashtag"><s>#</s><b>comunidad</b></a>
                            <a href="" class="twitter-hashtag" dir="ltr"></a>
                        </p>
                    </div>
                    <div class="tweet-footer">
                        <a class="tweet-footer-btn">
                            <i class="fa fa-comment-o" aria-hidden="true"></i><span> 18</span>
                        </a>
                        <a class="tweet-footer-btn">
                            <i class="fa fa-retweet" aria-hidden="true"></i><span> 64</span>
                        </a>
                        <a class="tweet-footer-btn">
                            <i class="fa fa-thumbs-o-up" aria-hidden="true"></i><span> 202</span>
                        </a>
                    </div>
                </div>
            </li>
        </ol>
    </div>
</template>

<script lang="ts">
import {
    defineComponent, reactive,
} from 'vue'
export default defineComponent({
    name: 'TweetList',
    props: {
        tweets: {
            type: Array,
            default: () => []
        }
    }
})
</script>