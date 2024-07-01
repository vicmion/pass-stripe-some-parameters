<template>
    <v-container class="ma-0 pa-0" fluid style="height: 100%;">
      <v-row no-gutters style="height: 100%;">
        <v-col no-gutters style="height: 100%;" lg="8" md="8" sm="12">
          <div class="left-section">
            <div class="bg"></div>
            <v-container>
              <v-row>
                <v-col cols="12" class="header">
                  <img id="logo-img" src="@/assets/logo.jpeg"/>
                  <h1>Baggy Sitter</h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" align="left">
                  <h2>Lightravel? Now, it's possible! With Baggysitter, you can just forget your luggages...</h2>
                </v-col>
                <v-col cols="12" align="left">
                  <h2>How it works?</h2>
                </v-col>
                <v-col cols="12">
                  <p>The day of your arrival: We will babysit your bags when you arrive at the airport/station and you will find them directly to your B&B/hotel</p>
                </v-col>
                <v-col cols="12">
                  <p>The day of your departure: We will babysit your bags when you leave the B&B/hotel and you will find them directly to the airport/station</p>
                </v-col>
                <v-col cols="12">
                  <p>So that you can fully exploit the first and last day of your stay!</p>
                </v-col>
              </v-row>
            </v-container>
            <div class="information-panel">
              
            </div>
          </div>
        </v-col>
        <v-col no-gutters style="height: 100%;" lg="4" md="4" sm="12">
          <BookingSectionV2>
          </BookingSectionV2>
          <DateTimeSelection
            startHour="08:00"
            endHour="20:00"
            :intervalMinutes="30"
          >
          </DateTimeSelection>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import BookingSectionV2 from '@/components/BookingSectionV2.vue'
import DateTimeSelection from '@/components/DateTimeSelection'
import { DateTime } from 'luxon'

export default {
  name: 'HomeView',
  components: {
    DateTimeSelection,
    BookingSectionV2
  },
  mounted () {
    this.today = DateTime.now()
  },
  data () {
    return {
      today: DateTime,
      todayStr: String,
      API_URL: "https://u0fgu8solc.execute-api.us-east-1.amazonaws.com/prod"
    }
  },
  computed: {
    checkoutSessionEndpoint: function () {
      return `${this.API_URL}/checkout`
    }
  }
}
</script>

<style scoped>

#logo-img {
  width: 100px;
}

.left-section {
  color: white;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

h1 {
  margin-left: 20px;
}

.left-section .bg {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    background: url('~@/assets/bagagli.jpg');
    background-size: cover;
    opacity: 0.2;
    width: 100%;
    height: 100%;
}

.left-section p {
    text-align: left;
}
</style>
