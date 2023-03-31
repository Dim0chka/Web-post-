<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <transition-group name="post-list">
            <PostItem class="post" 
                v-for="post in posts" 
                :key = 'post.id' 
                :post="post" 
                @remove="$emit('remove', post)"
            />
        </transition-group>
    </div>
    <h2 style="color: red;" v-else>
        Список постов пуст
    </h2>
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
.post {
    padding: 15px;
    border: 2px solid goldenrod;
    margin-top: 15px;
}
.post-list-item {
    display: inline-block;
    margin-right: 10px;
  }
.post-list-enter-active, .list-leave-active {
    transition: all 1s;
}
.post-list-enter, .post-list-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
</style>
