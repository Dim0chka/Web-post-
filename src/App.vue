<template>
    <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
                <p class="mt-2 text-lg leading-8 text-gray-600">Learn how to grow your business with our expert advice.</p>
            </div>

            <form class="mt-4">   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-900">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-900 dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <my-input
                        type="search"
                        id="default-search"
                        v-model="searchQuery"
                        class="block w-full p-4 pl-10 outline-none text-sm text-gray-900 border focus:ring-4 dark:focus:ring-purple-900 border-gray-300 rounded-lg bg-gray-50  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 "
                        placeholder="Поиск..."
                    />
                </div>
            </form>
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

            <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-1 mb-10">
                <PostList 
                    :posts = "sortedAndSearchedPosts"
                    @remove = "removePost"
                    v-if="!isPostsLoading"
                />
                <my-loader v-else></my-loader>
            </div>
            <my-button-page :page="page" :limit="limit" :totalPages="totalPages"></my-button-page>
        </div>
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
            searchQuery: "",
            page: 1,
            limit: 10,
            totalPages: 0,
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
        changePage(pageN) {
            this.page = pageN
        },

        async fetchPosts() {
            try {
                this.isPostsLoading = true 
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
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

        },
        sortedAndSearchedPosts() {
            return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        page() {
            this.fetchPosts()
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

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
}

.current-page {
    border: 2px solid goldenrod
}

</style>
