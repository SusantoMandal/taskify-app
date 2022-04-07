<template src="./login-page.html"></template>

<script>
import { mapGetters } from 'vuex';
import LoginCard from '../../components/login-card/login-card.vue';

export default {
  name: 'LoginPage',
  components: {
    LoginCard
  },
  computed: {
    ...mapGetters('user', ['getAccessToken'])
  },
  methods: {
    async loginUser(userEmail, userPassword) {
      const payload = {
        email: userEmail,
        password: userPassword
      };
      this.$store.dispatch('pageLoader/show');
      await this.$store.dispatch('user/loginUser', payload);
      this.$store.dispatch('pageLoader/hide');
      this.$router.push({
        name: 'TaskPage'
      });
    }
  },
  async created() {
    if (this.getAccessToken !== null) {
      const result = await this.$store.dispatch('user/verifyAuth');
      if (result.status === 200) {
        this.$router.push({
          name: 'TaskPage'
        });
      }
    }
    this.$store.commit('header/setShowSignButtons', false);
    this.$store.dispatch('pageLoader/hide');
  }
};
</script>

<style scoped lang="scss" src="./login-page.scss">
</style>
