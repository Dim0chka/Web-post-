<template>
    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 w-full">
            <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Создание поста</h3>
            <div class="mt-2 w-full">
                <my-input
                    class="mb-2 mt-2"
                    v-model="post.title"
                    placeholder="Название"
                />
                <my-input
                    v-model="post.body"
                    placeholder="Описание"
                />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 sm:justify-between py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <my-button 
            @click="CreatePost"
            style="margin-left: 15px"
            >Создать
        </my-button>
      </div>
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
        },
    }
}
</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;

}

</style>
