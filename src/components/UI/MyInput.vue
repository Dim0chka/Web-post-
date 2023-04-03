<template>
  <input :value="modelValue" @input="updateInput" class="block w-full p-4 pl-10 outline-none text-sm text-gray-900 border focus:ring-4 dark:focus:ring-purple-900 border-gray-300 rounded-lg bg-gray-50  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 " type="text">
</template>

<script>
export default {
    name: "my-input",
    props: {
      modelValue: [String, Number]
    },
    methods: {
      updateInput(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
}
</script>

<style scoped>
.input {
    width: 100%;
    border: 2px solid goldenrod;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>