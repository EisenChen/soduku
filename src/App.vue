<template>
  <div class="content">
    <GameUi></GameUi>
  </div>
</template>

<script>
import GameUi from './views/GameUi.vue'

export default {
  name: 'App',
  components: {
    GameUi
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.content {
  height: 90vh;
  width: 90vw;
  margin: auto;
}
</style>
