<template>
    <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Блог</h2>
                <p class="mt-2 text-lg leading-8 text-gray-600">Опубликуй свою историю, чтобы другие читатели смогли проникнутся</p>
            </div>
            <!-- Поисковик -->
            <SearchVue>
                <my-input
                        type="search"
                        id="default-search"
                        v-model="searchQuery"
                        placeholder="Поиск..."
                    />
            </SearchVue>
            <!-- Кнопки "Создать пост и сортировка по спику -->
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
            <!-- модальное окно создание поста -->
            <my-dialog v-model:show="dialogVisible">
                <PostForm 
                    @create="CreatePost"
                    @remove="removeDialog"
                />
            </my-dialog>
            <!-- Посты -->
            <PostList 
                :posts = "sortedAndSearchedPosts"
                @remove = "removePost"
                v-if="!isPostsLoading"
            />
            <!-- лоудер загрузки постов  -->
            <my-loader v-else></my-loader>
            <!-- кнопки переключения на другие страницы -->
            <PageButton 
                :page="page" 
                :totalPages="totalPages" 
                :countPosts="countPosts"
                @changePage="ChangePage"
                @prevPage="PrevPage"
                @nextPage="NextPage"
                >
            </PageButton>
        </div>
    </div>
</template>

<script>
import PostForm from './components/PostForm.vue'
import PostList from './components/PostList.vue'
import PageButton from './components/PageButton.vue'
import axios from 'axios'
import SearchVue from './components/Search.vue'

export default {
    components: {
        PostForm, PostList, PageButton, SearchVue
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
            countPosts: 0,
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
        removeDialog() {
            this.dialogVisible = false
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true 
        },
        ChangePage(pageN) {
            this.page = pageN
        },
        PrevPage(page) {
            if (page === 1) {
                this.page = this.totalPages 
            } else {
                this.page = page - 1
            }
        },
        NextPage(page) {
            if (page === this.totalPages) {
                this.page = 1 
            } else {
                this.page = page + 1
            }
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
                this.countPosts = response.headers['x-total-count']
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

</style>
