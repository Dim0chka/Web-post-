<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="show" @click="hideDialog">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div @click.stop class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <slot></slot>
            </div>
          </div>
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