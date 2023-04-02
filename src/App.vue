<template>
    <div class="app">
            <h1>Страница с постами</h1>

            <div class="app_btns">
                <my-button 
                    @click="showDialog"
                    >Создать пост
                </my-button>
                <my-select
                    v-model="selectedSort"
                    :options="sortOptions"
                />
            </div>
    
            <my-dialog v-model:show="dialogVisible">
                <PostForm 
                    @create="CreatePost"
                />
            </my-dialog>
    
            <PostList 
                :posts = "sortedPost"
                @remove = "removePost"
                v-if="!isPostsLoading"
            />
            <my-loader v-else></my-loader>
    </div>
</template>

<script>
import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
import axios from 'axios'

export default {
    components: {
        PostForm, PostList,
    },
    data() {
        return {
            posts: [],            
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: "",
            sortOptions: [
                {value: 'title', name: 'По названию постов'},
                {value: 'body', name: 'По содержанию постов'},
                {value: 'post.id', name: 'От старых постов'},
                {value: '-post.id', name: 'От новых постов'}
            ]

        }
    },
    methods: {
        CreatePost(post) {
            this.posts.push(post)
            this.dialogVisible = false 
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true 
        },

        async fetchPosts() {
            try {
                this.isPostsLoading = true 
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
                this.posts = response.data
            } catch(e) {
                alert(e)
            } finally {
                this.isPostsLoading = false     
            }
        }
    },
    mounted() {
        this.fetchPosts() 
        
    },
    computed: {
        sortedPost() {
            return (this.selectedSort === "-post.id") ? [...this.posts].sort(function compare(arg1, arg2) {
                    if (arg1.id < arg2.id)
                        return 1;
                    if (arg1.id > arg2.id)
                        return -1;
                    return 0;
                }) : [...this.posts].sort((arg1, arg2) => { return arg1[this.selectedSort]?.localeCompare(arg2[this.selectedSort])})

        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
}

.app_btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0; 
}
</style>
