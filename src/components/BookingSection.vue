<template>
    <div class="booking-section">
        <h3>Booking section</h3>
        <var-select placeholder="Luogo di ritiro" v-model="pickupLocation">
            <var-option label="Hotel 1" />
            <var-option label="Milano Stazione Centrale" />
            <var-option label="Aeroporto Linate" />
            <var-option label="Aeroporto Malpensa" />
            <var-option label="Hotel 2" />
        </var-select>
        <var-select placeholder="Luogo di riconsegna" v-model="dropoffLocation">
            <var-option label="Hotel 1" />
            <var-option label="Hotel 2" />
        </var-select>
        <var-date-picker :locale="locale" v-model="pickupDate" />
        <var-date-picker :locale="locale" v-model="pickupHour" />
        <var-time-picker :locale="locale" v-model="dropoffDate" />
        <var-time-picker :locale="locale" v-model="dropoffHour" />
        <var-button type="primary">Prenota</var-button>
    </div>
</template>

<script>
import enUS from '@varlet/ui/es/locale/en-US'

export default {
    name: 'BookingSection',
    data () {
        return {
            locale: enUS,
            pickupLocation: null,
            dropoffLocation: null,
            pickupDate: null,
            pickupHour: null,
            dropoffDate: null,
            dropoffHour: null
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.booking-section {
    max-width: 500px;
}

h3 {
    margin: 40px 0 0;
}
</style>