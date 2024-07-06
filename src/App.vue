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
        <!-- <v-btn
          variant="flat"
          elevation="2"
          color="primary"
        >
          Prenota
        </v-btn> -->
      </div>
    </v-app-bar>

    <v-main h-auto>
      <router-view/>
    </v-main>

    <FooterSection></FooterSection>
  </v-layout>
</template>

<script>
import FooterSection from '@/components/FooterSection'

export default {
  name: 'App',
  components: {
    FooterSection
  }
}
</script>

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
  color: #2c3e50;
  display: flex;
  flex-direction: column;
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

#footer {
  min-height: 100px;
}
</style>
