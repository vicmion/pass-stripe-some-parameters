<template>
    <div class="booking-section-v3">
        <span class="title">Pick the hour</span>
        <div class="date-section">
            <v-icon
                dark
                size="40"
                @click="prevDays"
            >
                mdi-chevron-left
            </v-icon>
            <div class="dates">
                <div
                    v-for="day in days"
                    v-bind:key="day.id"
                    class="date"
                    @click="selectDate(day)"
                >
                    <span class="month">{{ day['month'] }}</span>
                    <span class="day">{{  day['day'] }}</span>
                </div>
            </div>
            <v-icon
                dark
                size="40"
                @click="nextDays"
            >
                mdi-chevron-right
            </v-icon>
        </div>
        <div class="hour-section">
            <v-icon
                dark
                size="40"
                @click="prevHours"
                :class="{ 'disabled-icon': !showPrevHoursButton }"
                :disabled="!showPrevHoursButton"
            >
                mdi-chevron-left
            </v-icon>
            <div class="hours-grid">
                <div
                    v-for="hour in hours.slice(hoursOffset*9, (hoursOffset*9)+9)"
                    :key="hour.id"
                    :class="{
                        'hour': true,
                        'highlighted': hour['id'] === pickedHourId
                    }"
                    @click="selectHour(hour)"
                >
                    {{ hour['description'] }}
                </div>
            </div>
            <v-icon
                dark
                size="40"
                @click="nextHours"
                :class="{
                    'disabled-icon': !showNextHoursButton
                }"
                :disabled="!showNextHoursButton"
            >
                mdi-chevron-right
            </v-icon>
        </div>
    </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'BookingSectionV3',
  components: {
  },
  props: {
    startHour: String,
    endHour: String,
    intervalMinutes: Number
  },
  data () {
    return {
        moment: null,
        days: [],
        hours: [],
        hoursOffset: 0,
        pickedHourId: null
    }
  },
  mounted () {
    this.moment = DateTime.now()

    this.days = this.createDaysOptions(this.moment)
    
    this.hours = this.createHoursOptions()
  },
  computed: {
    showNextHoursButton () {
        return (this.hoursOffset * 9 + 9)< this.hours.length
    },
    showPrevHoursButton () {
        return this.hoursOffset > 0
    }
  },
  methods: {
    createHoursOptions () {
        const hours = []

        let start = DateTime.fromFormat(this.startHour, 'HH:mm')
        const end = DateTime.fromFormat(this.endHour, 'HH:mm')

        let index = 0
        while(start <= end) {
            hours.push({
                id: index,
                description: start.toFormat('HH:mm')
            })
            index += 1
            start = start.plus({minutes:this.intervalMinutes})
        }

        return hours
    },
    createDaysOptions (current) {
        return [
            {
                id: 1,
                day: current.minus({days:1}).day,
                month: current.minus({days:1}).toLocaleString({ month: 'long' })
            },
            {
                id: 2,
                day: current.day,
                month: current.toLocaleString({ month: 'long' })
            },
            {
                id: 3,
                day: current.plus({days:1}).day,
                month: current.plus({days:1}).toLocaleString({ month: 'long' })
            }
        ]   
    },
    prevHours () {
        this.hoursOffset -= 1
    },
    nextHours () {
        this.hoursOffset += 1
    },
    prevDays () {
        this.moment = this.moment.minus({days:3})
        this.days = this.createDaysOptions(this.moment)
    },
    nextDays () {
        this.moment = this.moment.plus({days:3})
        this.days = this.createDaysOptions(this.moment)
    },
    selectHour (hour) {
        if (this.pickedHourId === hour.id)
            this.pickedHourId = null
        else
            this.pickedHourId = hour.id
    },
    selectDate(d) {
        console.log(d)
    }
  }
}
</script>

<style scoped>
.booking-section-v3 {
    width: 300px;
    height: 300px;
    background-color: white;
    display: flex;
    flex-direction: column;
}

.title {
    margin-top: 5px;
    font-size: 13px;
    text-align: center;
}

.date-section {
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.dates {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.date {
    width: 50px;
    height: 50px;
    background-color: lightblue;
    border-radius: 50px;
    margin: 0px 10px 0 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
}

.date:hover {
    cursor: pointer;
}

.month {
    margin-top: 2px;
    font-size: 10px;
}

.day {
    font-size: 14px;
}

.hour-section {
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.hours-grid {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
}

.hour {
    background-color: lavender;
    margin: 5px;
    width: 60px;
    height: 40px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hour:hover {
    cursor: pointer;
}

.empty-hour {
    background-color: transparent;
    margin: 5px;
    width: 60px;
    height: 40px;
    border-radius: 5px;
}

.disabled-icon {
  color: rgba(0, 0, 0, 0.26); /* Lightly shaded color */
}

.highlighted {
    background-color: #304E48;
    color: white;
}
</style>