<template>
  <div class="content">
    <GameUi></GameUi>    
    <PersonalSign></PersonalSign>
  </div>
</template>

<script>
import GameUi from './views/GameUi.vue';
import PersonalSign from './components/PersonalSign.vue';

export default {
  name: 'App',
  components: {
    GameUi,
    PersonalSign
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
  margin-top: 1rem;
}

.content {
  min-height: 90vh;
  min-width: 90vw;
  margin: auto;
}
</style>
