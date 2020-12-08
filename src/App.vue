<template>
  <div id="app" lang="de">
    <Eingabe />
  </div>
</template>

<script>
import Eingabe from './components/Eingabe.vue'

export default {
  name: 'App',
  components: {
    Eingabe
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;


}
</style>

<style lang="scss">
  $secondary: #adb5bd; // $gray-500
  $light: #e9ecef; // $gray-200
  $enable-gradients: true;
  $enable-shadows: true;

  .tooltip-inner {
    max-width: 500px !important;
  }

  @import "~bootstrap/scss/bootstrap.scss";
  @import "~bootstrap-vue/src/index.scss";

</style>
