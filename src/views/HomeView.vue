<template>
    <v-container class="main-container ma-0 pa-0" fluid>
      <v-row no-gutters>
        <v-col no-gutters lg="8" md="8" sm="12">
          <div class="left-section">
            <div class="bg"></div>
            <v-container>
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
        <v-col no-gutterslg="4" md="4" sm="12">
          <BookingSection>
          </BookingSection>
        </v-col>
      </v-row>
      <LocationSection></LocationSection>
    </v-container>
</template>

<script>
import BookingSection from '@/components/BookingSection'
import LocationSection from '@/components/LocationSection'

export default {
  name: 'HomeView',
  components: {
    BookingSection,
    LocationSection
  }
}
</script>

<style scoped>
.main-container {
}

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
