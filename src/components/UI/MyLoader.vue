<template>
    <div class="loader">
        <div class="lines"></div>  
    </div> 
</template>

<script>
export default {
    name: "my-loader"
}
</script>

<style scoped>
body {
    background: white;
}
.loader {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
}

.lines {
    position: absolute;
    top: 50%;
    left: 50%;
    left: 50%;
    margin: -60px 0 0 -60px;
    border: 16px solid black;
    border-radius: 50%;
    border-top: 16px solid white;
    width: 120px;
    height: 120px;
    animation: rotate 2s linear infinite;
}

@keyframes rotate {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
}
</style>