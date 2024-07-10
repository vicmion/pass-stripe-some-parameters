<template>
    <v-row class="location-section" no-gutters>
        <v-col class="location-section-milan" md="6" sm="12" xs="12">
            <div class="location-box">
                <p class="location-section-title">Milan</p>
            </div>
        </v-col>
        <v-col class="location-section-lecce" md="6" sm="12" xs="12">
            <div class="location-box">
                <span class="location-section-title">Lecce</span>
                <span class="location-section-subtitle">Coming soon</span>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'LocationSection'
}
</script>

<style scoped>
.location-section {
    width: 100%;
    height: 500px;
}

.location-section-milan {
    width: 100%;
    background: url('~@/assets/milano.jpg') no-repeat center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.location-box {
    width: 250px;
    height: 250px;
    background-color: white;
    text-align: center;
    border-radius: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.location-section-lecce {
    width: 100%;
    background: url('~@/assets/lecce.jpg') no-repeat center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.location-section-title {
    font-size: 60px;
    color: black;
}

.location-section-subtitle {
    font-size: 30px;
    color: black;
}

@media (max-width: 960px) {
    .location-section {
        height: 350px;
    }

    .location-box {
        width: 120px;
        height: 120px;
        border-radius: 120px;
    }

    .location-section-title {
        font-size: 30px;
    }

    .location-section-subtitle {
        font-size: 15px;
    }
}
</style>