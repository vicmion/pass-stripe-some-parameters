<template>
    <div class="booking-section">
        <h3>Prenota</h3>
        <div class="booking-section-row">
            <v-select
                label="Luogo di ritiro"
                :items="pickupLocationOptions"
                v-model="pickupLocation"
                :clearable="true"
            ></v-select>
        </div>
        <div class="booking-section-row">
            <v-select
                label="Luogo di riconsegna"
                :items="dropoffLocationOptions"
                v-model="dropoffLocation"
                :clearable="true"
            ></v-select>
        </div>
        <div class="booking-section-row date-time-section">
            <p>Data e ora di ritiro</p>
            <div class="button-section">
                <div class="btn-box">
                    <v-btn :disabled="displayDate" @click="selectDate" color="primary">
                        {{ pickupDateLabel === null ? 'Seleziona data' : pickupDateLabel }}
                    </v-btn>
                </div>
                <div class="btn-box">
                    <v-btn :disabled="displayHour" @click="selectTime" color="primary">
                        {{ pickupHourLabel === null ? 'Seleziona ora' : pickupHourLabel }}
                    </v-btn>
                </div>
            </div>
            <div class="selection-section">
                <v-date-picker v-if="displayDate" v-model="pickupDate" :min="today"></v-date-picker>
                <v-time-picker
                    color="green-lighten-1"
                    v-if="displayHour"
                    v-model="pickupHour"
                    format="24h"
                    :allowed-minutes="allowedMinutes"
                    :allowed-hours="allowedHours"
                >
                </v-time-picker>
                <v-btn
                    v-if="displayHour || displayDate"
                    @click="closeBoth"
                    color="secondary"
                    icon="mdi-plus"
                    style="margin-left: 20px;"
                >
                X
                </v-btn>
            </div>
        </div>
        <div class="booking-section-row date-time-section">
            <p>Data e ora di riconsegna</p>
            <div class="button-section">
                <div class="btn-box">
                    <v-btn :disabled="displayDateDrop" @click="selectDateDrop" color="primary">
                        {{ dropoffDateLabel === null ? 'Seleziona data' : dropoffDateLabel }}
                    </v-btn>
                </div>
                <div class="btn-box">
                    <v-btn :disabled="displayHourDrop" @click="selectTimeDrop" color="primary">
                        {{ dropoffHourLabel === null ? 'Seleziona ora' : dropoffHourLabel }}
                    </v-btn>
                </div>
            </div>
            <div class="selection-section">
                <v-date-picker v-if="displayDateDrop" v-model="dropoffDate" :min="pickOffLimit"></v-date-picker>
                <v-time-picker
                    color="green-lighten-1"
                    v-if="displayHourDrop"
                    v-model="dropoffHour"
                    format="24h"
                    :allowed-minutes="allowedMinutes"
                    :allowed-hours="allowedDropoffHours"
                >
                </v-time-picker>
                <v-btn
                    v-if="displayHourDrop || displayDateDrop"
                    @click="closeBothDrop"
                    color="secondary"
                    icon="mdi-plus"
                    style="margin-left: 20px;"
                >
                X
                </v-btn>
            </div>
        </div>
        <div class="booking-section-row">
            <span>Numero di bagagli</span>
            <v-number-input control-variant="split" :min="0" :max="10" v-model="numberOfBags"></v-number-input>
        </div>
        <v-btn @click="checkout" elevation="2" text color="primary" :loading="loading">
            Continua
        </v-btn>
    </div>
</template>

<script>
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { DateTime } from 'luxon'

export default {
    name: 'BookingSectionV2',
    components: {
        VTimePicker,
        VNumberInput
    },    
    data () {
        return {
            locationOptions: ['Hotel 1', 'Hotel 2', 'Milano Stazione Centrale', 'Aeroporto Linate', 'Aeroporto Malpensa'],
            pickupLocation: null,
            dropoffLocation: null,
            pickupDate: null,
            pickupDateLabel: null,
            pickupHour: null,
            pickupHourLabel: null,
            dropoffDate: null,
            dropoffHour: null,
            numberOfBags: 1,
            displayDate: false,
            displayHour: false,
            displayDateDrop: false,
            displayHourDrop: false,
            dropoffDateLabel: null,
            dropoffHourLabel: null,
            API_URL: "https://4qbmw3dl47.execute-api.us-east-1.amazonaws.com/Prod",
            today: null,
            pickOffLimit: null,
            loading: false
        }
    },
    mounted () {
        this.today = DateTime.now().minus({days: 1}).toFormat('yyyy-MM-dd')
    },
    watch: {
        pickupDate () {
            this.pickupDateLabel = this.pickupDate.setLocale('it-IT').toLocaleString()
            this.displayDate = false
            this.pickOffLimit = this.pickupDate.minus({days: 1}).toFormat('yyyy-MM-dd')
        },
        pickupHour () {
            this.pickupHourLabel = this.pickupHour.toLocaleString()
            this.displayHour = false
        },
        dropoffDate () {
            this.dropoffDateLabel = this.dropoffDate.setLocale('it-IT').toLocaleString()
            this.displayDateDrop = false
        },
        dropoffHour () {
            this.dropoffHourLabel = this.dropoffHour.toLocaleString()
            this.displayHourDrop = false
        }
    },
    computed: {
        pickupLocationOptions () {
            if(this.dropoffLocation === null)
                return this.locationOptions
            else {
                if(this.dropoffLocation === 'Hotel 1' || this.dropoffLocation === 'Hotel 2')
                    return ['Milano Stazione Centrale', 'Aeroporto Linate', 'Aeroporto Malpensa']
                else return ['Hotel 1', 'Hotel 2']
            }
        },
        dropoffLocationOptions () {
            if(this.pickupLocation === null)
                return this.locationOptions
            else {
                if(this.pickupLocation === 'Hotel 1' || this.pickupLocation === 'Hotel 2')
                    return ['Milano Stazione Centrale', 'Aeroporto Linate', 'Aeroporto Malpensa']
                else return ['Hotel 1', 'Hotel 2']
            }
        }
    },
    methods: {
        checkout () {
            this.loading = true
            this.axios.post(this.API_URL + '/create-order', {
                pickupLocation: this.pickupLocation,
                dropoffLocation: this.dropoffLocation,
                pickupDate: this.pickupDate,
                pickupHour: this.pickupHour,
                dropoffDate: this.dropoffDate,
                dropoffHour: this.dropoffHour,
                numberOfBags: 1,
            }).then((response) => {
                console.log(response.data.Location)
                window.location.href = response.data.Location
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        },
        selectDate () {
            this.displayHour = false
            this.displayDate = true
        },
        selectTime () {
            this.displayDate = false
            this.displayHour = true
        },
        closeBoth () {
            this.displayDate = false
            this.displayHour = false
        },
        selectDateDrop () {
            this.displayHourDrop = false
            this.displayDateDrop = true
        },
        selectTimeDrop () {
            this.displayDateDrop = false
            this.displayHourDrop = true
        },
        closeBothDrop () {
            this.displayDateDrop = false
            this.displayHourDrop = false
        },
        allowedMinutes: v => v === 30 || v === 0,
        allowedHours: v => v >= 8 && v <= 12,
        allowedDropoffHours: v => v >= 14 && v <= 20
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
    margin: 40px 0 0;
}

.booking-section {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    background-color: #304E48;
    height: 100%;
}

.booking-section .booking-section-row {
    width: 100%;
    margin-bottom: 20px;
}

.booking-section .date-time-section {
    display: flex;
    flex-direction: column;
}

.booking-section .date-time-section .button-section {
    margin-top: 5px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.booking-section .date-time-section .selection-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.booking-section .date-time-section p {
    text-align: left;
    margin-left: 20px;
}

.booking-section .date-time-section .btn-box {
    flex-grow: 1;
}


/* .demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
} */
</style>