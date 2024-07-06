<template>
  <div class="about">
    <h1>Payment was not successfull</h1>
      <v-btn color="primary" @click="goToHome">
        Back to home
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
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: white;

}
</style>