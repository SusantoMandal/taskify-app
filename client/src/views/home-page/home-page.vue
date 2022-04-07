<template src="./home-page.html">
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  computed: {
    ...mapGetters('user', ['getAccessToken'])
  },
  async created() {
    if (this.getAccessToken !== null) {
      await this.$store.dispatch('user/verifyAuth');
    }
    this.$store.commit('header/setShowSignButtons', true);
    this.$store.dispatch('pageLoader/hide');
  }
};
</script>

<style scoped lang="scss" src="./home-page.scss">
</style>
