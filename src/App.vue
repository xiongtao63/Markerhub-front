<template>
  <div id="app">
    <router-view/>
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>

import router from "@/router";

export default {
  name: "App",
  watch: {
    $route(to, from) {

      console.log("to")
      console.log(router)
      console.log(to)
      console.log("from")
      console.log(from)
      if (to.path !== '/login') {
        let obj = {
          name: to.name,
          title: to.meta.title
        }

        this.$store.commit("addTab", obj)
      }

    }
  },

}

</script>