<template>
    <div class="post">
        <div>
            <div>Пост №{{ post.id }}</div>
            <div><strong>Название:</strong> {{ post.title }}</div>
        </div>
        <div><strong>Описание:</strong> {{ post.body }}</div>
        <div class="btns">
            <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
            <my-button @click="$emit('remove', post)">Удалить</my-button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        // props - берём значение post из файла PostList и принимаем его как объект
        post: {
            type: Object,
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.btns {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
</style>