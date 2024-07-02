<template>
  <v-layout id="app" theme="light">
    <v-app-bar
      id="app-bar"
      :elevation="2"
    >
      <template v-slot:prepend>
        <img id="logo-img" src="@/assets/logo.jpeg"/>
      </template>
      
      <div class="actions-container">
        <v-btn
          variant="flat"
          elevation="2"
          color="primary"
        >
          Prenota
        </v-btn>
      </div>
    </v-app-bar>

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

#app-bar {
  padding-left: 50px;
  padding-right: 50px;
}

#logo-img {
  width: 70px;
}
</style>
