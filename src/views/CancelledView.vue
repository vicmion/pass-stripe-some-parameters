<template>
  <div class="about">
    <h1>Pagamento non andato a buon fine</h1>
      <v-btn color="primary" @click="goToHome">
        Torna alla home
      </v-btn>
  </div>
</template>

<script>

export default {
  name: 'CancelledView',
  methods: {
    goToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.about {
  margin-top: 50px;
}

h1 {
  color: white;

}
</style>