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
        <div class="booking-section-row date-times">
            <v-btn variant="outlined" @click="pickupDatetimeDialog=true">
                <span v-if="pickupDateTime">{{ pickupDateTimeFormatted }}</span>
                <span v-else>Select pickup time</span>
            </v-btn>
            <v-btn variant="outlined" @click="dropoffDatetimeDialog=true">
                <span v-if="dropoffDateTime">{{ dropoffDateTimeFormatted }}</span>
                <span v-else>Select dropoff time</span>
            </v-btn>
        </div>
        <div class="booking-section-row">
            <span>Numero di bagagli</span>
            <v-number-input control-variant="split" :min="0" :max="10" v-model="numberOfBags"></v-number-input>
        </div>
        <v-btn @click="checkout" elevation="2" text color="primary" :loading="loading">
            Continua
        </v-btn>
        <DateTimeSelection
            v-model="pickupDatetimeDialog"
            startHour="08:00"
            endHour="20:00"
            :intervalMinutes="30"
            @picked="pickedDatetime"
        >
        </DateTimeSelection>
        <DateTimeSelection
            v-model="dropoffDatetimeDialog"
            startHour="14:00"
            endHour="20:00"
            :intervalMinutes="30"
            @picked="droppedDatetime"
        >
        </DateTimeSelection>
    </div>
</template>

<script>
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import DateTimeSelection from './DateTimeSelection.vue'

export default {
    name: 'BookingSection',
    components: {
        VNumberInput,
        DateTimeSelection
    },    
    data () {
        return {
            locationOptions: ['Hotel 1', 'Hotel 2', 'Milano Stazione Centrale', 'Aeroporto Linate', 'Aeroporto Malpensa'],
            pickupLocation: null,
            dropoffLocation: null,
            pickupDateTime: null,
            dropoffDateTime: null,
            numberOfBags: 1,
            API_URL: "https://4qbmw3dl47.execute-api.us-east-1.amazonaws.com/Prod",
            loading: false,
            pickupDatetimeDialog: false,
            dropoffDatetimeDialog: false
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
        },
        pickupDateTimeFormatted () {
            if(this.pickupDateTime)
                return this.pickupDateTime.toLocaleString()
            
            return ''
        },
        dropoffDateTimeFormatted () {
            if(this.dropoffDateTime)
                return this.dropoffDateTime.toLocaleString()

            return ''
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
        pickedDatetime (chosenDate) {
            this.pickupDateTime = chosenDate
            this.pickupDatetimeDialog = false
        }, 
        droppedDatetime (chosenDate) {
            this.dropoffDateTime = chosenDate
            this.dropoffDatetimeDialog = false
        }
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

.booking-section .date-times {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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