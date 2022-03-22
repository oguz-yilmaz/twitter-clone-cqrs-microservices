<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {
    defineComponent,
    ref,
} from 'vue'
import { onErrorCaptured } from 'vue'


export default defineComponent({
    setup () {
        const error = ref('')

        onErrorCaptured(e => {
            error.value = 'Something went wrong'

            return true
        })

        return { error }
    }
})
</script>

<template>
    <div v-if="error">
        {{ error }}
    </div>

    <Suspense>
        <template #default>
            <div>
                <div class="wrapper">
                    <ul class="nav">
                        <li class="nav-item">
                            <RouterLink class="nav-link active" to="/">Home</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/timeline">Timeline</RouterLink>
                        </li>
                    </ul>
                </div>

                <RouterView />
            </div>
        </template>
        <template #fallback>
            <div>Loading...</div>
        </template>
    </Suspense>
</template>

<style>
@import "@/assets/base.css";
</style>
