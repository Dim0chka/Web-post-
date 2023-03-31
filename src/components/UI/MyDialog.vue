<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div @click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "my-dialog",
    props: {
        show: {
            type: Boolean,
            default: false 
        }
    },
    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        }
    }
}
</script>

<style>
.dialog {
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    display: flex;
}

.dialog__content {
    margin: auto;
    border-radius: 12px;
    background: white;
    min-height: 50px;
    min-width: 300px; 
    padding: 20px;
}
</style>