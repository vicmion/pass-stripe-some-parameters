<template>
  <v-layout id="app" theme="light">
    <v-main id="main">
      <router-view/>
    </v-main>
  </v-layout>
</template>

<style>
html {
  height: 100%;
}

body {
  background-color: #304E48;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#main {
  height: 100%;
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
