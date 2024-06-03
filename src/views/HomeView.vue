<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>{{checkoutSessionEndpoint}}</p>
    <form :action="checkoutSessionEndpoint" method="POST">
        <button type="submit" id="checkout-button">Checkout</button>
      </form>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data () {
    return {
      API_URL: "http://localhost:4242"
    }
  },
  computed: {
    checkoutSessionEndpoint: function () {
      return `${this.API_URL}/create-checkout-session`
    }
  }
}
</script>
