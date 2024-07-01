<template>
    <div class="booking-section-v3">
        <span class="title">Pick the hour</span>
        <div class="date-section">
            <v-icon
                dark
                size="40"
                @click="prevDays"
                :class="{ 'disabled-icon': !showPrevDaysButton }"
                :disabled="!showPrevDaysButton"
            >
                mdi-chevron-left
            </v-icon>
            <div class="dates">
                <div
                    v-for="day in days.slice(daysOffset*3, daysOffset*3+3)"
                    v-bind:key="day.id"
                    :class="{
                        'date': true,
                        'highlighted': day['id'] === pickedDateId
                    }"
                    @click="selectDate(day)"
                >
                    <span class="month">{{ day['monthLocale'] }}</span>
                    <span class="day">{{  day['day'] }}</span>
                </div>
            </div>
            <v-icon
                dark
                size="40"
                @click="nextDays"
                :class="{ 'disabled-icon': !showNextDaysButton }"
                :disabled="!showNextDaysButton"
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
        <div class="confirm-section">
            <v-btn
                variant="outlined"
                :disabled="!(pickedHourId !== null && pickedDateId != null)"
                @click="select"
            >
                <span v-if="!(pickedHourId !== null && pickedDateId != null)">Select</span>
                <span v-else>{{ mergedDate }}</span>
            </v-btn>
        </div>
    </div>
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'DateTimeSelection',
  components: {
  },
  props: {
    startHour: String,
    endHour: String,
    intervalMinutes: Number
  },
  data () {
    return {
        days: [],
        hours: [],
        hoursOffset: 0,
        daysOffset: 0,
        pickedHourId: null,
        pickedDateId: null,
        pickedHour: null,
        pickedDate: null,
        choosenDate: null
    }
  },
  mounted () {
    this.days = this.createDaysOptions(this.moment)
    
    this.hours = this.createHoursOptions()
  },
  computed: {
    showNextHoursButton () {
        return (this.hoursOffset * 9 + 9)< this.hours.length
    },
    showPrevHoursButton () {
        return this.hoursOffset > 0
    },
    showNextDaysButton () {
        return (this.daysOffset * 3 + 3)< this.days.length
    },
    showPrevDaysButton () {
        return this.daysOffset > 0
    },
    mergedDate () {
        let dt = DateTime.now()

        const timeComponents = {
            hour: this.pickedHour.hour,
            minute: this.pickedHour.minute,
            day: this.pickedDate.day,
            month: this.pickedDate.month,
            year: this.pickedDate.year,
        }

        const mergedDateTime = dt.set(timeComponents)

        return mergedDateTime.toLocaleString(DateTime.DATETIME_SHORT)
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
    createDaysOptions () {
        let options = []
        const moment = DateTime.now()

        let index = 0
        for(let start = DateTime.now(); start < moment.plus({days: 14}); start = start.plus({days: 1})) {
            options.push({
                id: index,
                day: start.day,
                month: start.month,
                year: start.year,
                monthLocale: start.toLocaleString({ month: 'long' })
            })
            index += 1
        }

        return options
    },
    prevHours () {
        this.hoursOffset -= 1
    },
    nextHours () {
        this.hoursOffset += 1
    },
    prevDays () {
        this.daysOffset -= 1
    },
    nextDays () {
        this.daysOffset += 1
    },
    selectHour (hour) {
        if (this.pickedHourId === hour.id)
            this.pickedHourId = null
        else {
            this.pickedHourId = hour.id
            this.pickedHour = DateTime.fromFormat(hour['description'], 'HH:mm')
        }
    },
    selectDate(d) {
        if (this.pickedDateId === d.id)
            this.pickedDateId = null
        else {
            this.pickedDateId = d.id
            this.pickedDate = DateTime.fromObject({days: d['day'], month: d['month'], year: d['year']})
        }
    },
    select () {
        this.$emit('picked', this.mergedDate)
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

.confirm-section {
    height: 100px;
    display: flex;
    margin-left: 20px;
    margin-right: 20px;
    flex-direction: column;
    justify-content: center;
}
</style>