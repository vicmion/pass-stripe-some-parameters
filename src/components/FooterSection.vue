<template>
    <v-footer
      id="footer"
      app
    >
      <v-row no-gutters>
        <v-col cols="12">
          <div class="footer-section">
            <span>Baggysitter s.r.l</span>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="footer-section">
            <a id="private-policy" href="https://www.iubenda.com/privacy-policy/78619331" class="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe " title="Privacy Policy ">Privacy Policy</a>
            <span style="width: 20px;"></span>
            <a id="cookie-policy" href="https://www.iubenda.com/privacy-policy/78619331/cookie-policy" class="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe " title="Cookie Policy ">Cookie Policy</a>
          </div>
        </v-col>
      </v-row>
    </v-footer>
</template>

<script>
export default {
    name: 'FooterSection'
}
</script>

<style>
.footer-section {
  margin-left: 50px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
}
</style>