<template src="./header.html">
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState('header', ['showSignButtons']),
    ...mapGetters('user', ['getAccessToken'])
  },
  methods: {
    goToLoginPage() {
      this.$router.push({
        name: 'LoginPage'
      });
    },
    goToRegisterPage() {
      this.$router.push({
        name: 'RegisterPage'
      });
    },
    async signOutUser() {
      await this.$store.commit('user/removeAccessToken');
      this.$store.hotUpdate(this.$store.state);
      this.$router.push({
        name: 'HomePage'
      });
    }
  }
};
</script>

<style scoped lang="scss" src="./header.scss">
</style>
