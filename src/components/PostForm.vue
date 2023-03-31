<template>
    <form @submit.prevent>
        <!-- submit.prevent - чтобы не было отпарвки(submint.preventdefault()) -->
        <h4>Создание поста</h4>
        <my-input
            v-model="post.title"
            placeholder="Название"
        />
        <my-input
            v-model="post.body"
            placeholder="Описание"
        />
        <my-button 
        style="margin-top: 15px;"
        @click="CreatePost"
        >Создать
        </my-button>
    </form>
</template>


<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: '',
            }
        }
    }, 
    methods: {
        CreatePost() {
            this.post.id = Date.now()
            this.$emit('create', this.post)
            this.post = {
                title: '',
                body: ''
            }
        }
    }
}
</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;

}

</style>
