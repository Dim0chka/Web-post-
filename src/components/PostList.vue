<template>
    <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-1 mb-10">
        <div v-if="posts.length > 0">
            <transition-group name="post-list">
                <PostItem 
                    v-for="post in posts" 
                    :key = 'post.id'  
                    :post="post" 
                    @remove="$emit('remove', post)"
                />
            </transition-group>
        </div>
        <div class="text-center" v-else>
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Список постов пуст</h1>
        </div>
    </div>
</template>


<script>
import PostItem from "@/components/PostItem.vue"

export default {
    components: { PostItem },
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.post-list-item {
    display: inline-block;
    margin-right: 10px;
  }
.post-list-enter-active, .post-list-leave-active {
    transition: all 0.4s;
}
.post-list-enter-from, .post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}

.post-list-move {
    transition: transform 0.4s ease;
}
</style>
