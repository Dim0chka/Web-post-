<template>
  <select class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" :value="modelValue" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        > {{ option.name }}
    </option>
  </select>
  
</template>


<script>
export default {
    name: "my-select",
    props: {
        modelValue: {
            type: String
        },
        options: {
            type: Array, 
            default: () => []
        }
    },
    methods: {
        changeOption(event) {
            this.$emit('update:modelValue', event.target.value)
            console.log(event.target.value)
        }
    }
}
</script>

<style>

</style>