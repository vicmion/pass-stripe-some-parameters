<template>
    <div class="booking-section">
        <h3>Book</h3>
        <div class="booking-section-row">
            <v-select
                label="Pickup location"
                :items="pickupLocationOptions"
                v-model="pickupLocation"
                :clearable="true"
            ></v-select> 
        </div>
        <div
            v-if="pickupLocation == 'Other destination'"
            class="booking-section-row"
        >
            <v-text-field
                label="Other pickup location"
                v-model="customPickupLocation"
            >
            </v-text-field>
        </div>
        <div
            class="booking-section-row"
        >
            <v-select
                label="Dropoff location"
                :items="dropoffLocationOptions"
                v-model="dropoffLocation"
                :clearable="true"
            ></v-select>
        </div>
        <div
            v-if="dropoffLocation == 'Other destination'"
            class="booking-section-row"
        >
            <v-text-field
                label="Other dropoff location"
                v-model="customDropoffLocation"
            >
            </v-text-field>
        </div>
        <div class="booking-section-row date-times">
            <v-btn variant="outlined" @click="pickupDatetimeDialog=true">
                <span v-if="pickupDateTime">{{ pickupDateTimeFormatted }}</span>
                <span v-else>Select pickup time</span>
            </v-btn>
            <v-btn
                :disabled="pickupDateTime === null"
                variant="outlined"
                @click="dropoffDatetimeDialog=true"
            >
                <span v-if="dropoffDateTime">{{ dropoffDateTimeFormatted }}</span>
                <span v-else>Select dropoff time</span>
            </v-btn>
        </div>
        <div class="booking-section-row">
            <span>Small bags</span>
            <v-number-input control-variant="split" :min="0" :max="10" v-model="smallBags">
            </v-number-input>
        </div>
        <div class="booking-section-row">
            <span>Large bags</span>
            <v-number-input control-variant="split" :min="0" :max="10" v-model="largeBags">
            </v-number-input>
        </div>
        <div class="booking-section-row">
            <span>Out of format bags</span>
            <v-number-input control-variant="split" :min="0" :max="10" v-model="outOfFormatBags">
            </v-number-input>
        </div>
        <div class="booking-section-row">
            <v-select
                label="Nationality"
                item-title="title"
                item-value="code"
                :items="countriesOptions"
                v-model="nationality"
                :clearable="true"
            >
            </v-select>
        </div>
        <v-btn
            v-if="customDropoffLocation === null && customPickupLocation === null"
            @click="checkout"
            elevation="2"
            text color="primary"
            :loading="loading"
        >
            Proceeed
        </v-btn>
        <v-btn
            v-else
            @click="checkout"
            elevation="2"
            text color="primary"
            :loading="loading"
        >
            Send request
        </v-btn>
        <DateTimeSelection
            v-model="pickupDatetimeDialog"
            startHour="08:00"
            endHour="12:00"
            :intervalMinutes="30"
            @picked="pickedDatetime"
        >
        </DateTimeSelection>
        <DateTimeSelection
            v-model="dropoffDatetimeDialog"
            :startDate="pickupDateTime"
            startHour="14:00"
            endHour="20:00"
            :intervalMinutes="30"
            @picked="droppedDatetime"
        >
        </DateTimeSelection>
    </div>
</template>

<script>
import { allCountries } from 'country-region-data';
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
            locationOptions: ['Hotel NHow Milano', 'Domina Hotel Milano Fiera', 'Milan central station', 'Milan Linate airport', 'Milan Malpensa airport', 'Other destination'],
            pickupLocation: null,
            customPickupLocation: null,
            dropoffLocation: null,
            customDropoffLocation: null,
            pickupDateTime: null,
            dropoffDateTime: null,
            smallBags: 0,
            largeBags: 0,
            outOfFormatBags: 0,
            loading: false,
            pickupDatetimeDialog: false,
            dropoffDatetimeDialog: false,
            nationality: null,
            countriesOptions: [],
            dt_now: null,
            dropoff_start_hour: '08:00'
        }
    },
    mounted () {
        this.countriesOptions = allCountries.map((item) => {
            return {
                title: item[0],
                code: item[1]
            }
        })
    },
    watch: {
        pickupLocation () {
            if(this.pickupLocation !== 'Other destination')
                this.customPickupLocation = null
        },
        dropoffLocation () {
            if(this.dropoffLocation !== 'Other destination')
                this.customDropoffLocation = null
        }
    },
    computed: {
        pickupLocationOptions () {
            if(this.dropoffLocation === null)
                return this.locationOptions
            else {
                if(this.dropoffLocation === 'Hotel NHow Milano' || this.dropoffLocation === 'Domina Hotel Milano Fiera')
                    return ['Milan central station', 'Milan Linate airport', 'Milan Malpensa airport', 'Other destination']
                else return ['Hotel NHow Milano', 'Domina Hotel Milano Fiera', 'Other destination']
            }
        },
        dropoffLocationOptions () {
            if(this.pickupLocation === null)
                return this.locationOptions
            else {
                if(this.pickupLocation === 'Hotel NHow Milano' || this.pickupLocation === 'Domina Hotel Milano Fiera')
                    return ['Milan central station', 'Milan Linate airport', 'Milan Malpensa airport', 'Other destination']
                else return ['Hotel NHow Milano', 'Domina Hotel Milano Fiera', 'Other destination']
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
            console.log('this.pickupDateTime: ', this.pickupDateTime.toFormat("yyyy-LL-dd'T'HH:mm'Z'"))
            console.log('this.dropoffDateTime: ', this.dropoffDateTime.toFormat("yyyy-LL-dd'T'HH:mm'Z'"))
            this.loading = true
            this.axios.post(process.env.VUE_APP_API_URL + '/create-order', {
                pickupLocation: this.pickupLocation,
                dropoffLocation: this.dropoffLocation,
                smallBags: this.smallBags,
                largeBags: this.largeBags,
                outOfFormatBags: this.outOfFormatBags,
                pickupTimestamp: this.pickupDateTime.toFormat("yyyy-LL-dd'T'HH:mm'Z'"),
                dropoffTimestamp: this.dropoffDateTime.toFormat("yyyy-LL-dd'T'HH:mm'Z'"),
                nationality: this.nationality
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
    text-align: center;
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