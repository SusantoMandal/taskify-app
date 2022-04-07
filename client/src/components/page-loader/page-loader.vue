<template src="./page-loader.html"></template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PageLoader',
  computed: {
    ...mapState('pageLoader', ['show'])
  }
};
</script>

<style scoped lang="scss" src="./page-loader.scss"></style>
