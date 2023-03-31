<template>
    <button class="btn">
        <slot></slot>
        <!-- slot - для того, чтобы в других файлах можно было писать свой value для этой кнопки  -->
    </button>
</template>

<script>
export default {
    name: "my-button"
}
</script>

<style scoped>
.btn {
    padding: 20px;
    background: none;
    color: goldenrod;
    border: 2px solid goldenrod;
    align-self: flex-end;
}
</style>