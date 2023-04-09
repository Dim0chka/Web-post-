<template>
  <div class="navbar">
    <div>Vue 3</div>
    <div class="navbar__btn">
        <div class="flex space-x-4">
            <a v-for="item in navigation" :key="item.name" @click="$router.push(item.href)" :class="[item.href === CurrentPath ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            CurrentPath: 0, 
            navigation: [
                {name: 'Главная', href: "/"},
                {name: 'Посты', href: "/posts"}
            ]
        }
    },
    watch: {
    '$route' (to) {
      this.CurrentPath = to.path
    }
  }
}
</script>

<style>
.navbar {
    height: 55px;
    background-color: teal;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.navbar__btn {
    margin-left: auto;
}

.navbar__btn:last-child {
    margin-right: 15px;
}

</style>