<template>
  <div id="app" class="app-container">
  <PageLoader />
  <Header />
  <main>
    <router-view/>
  </main>
  </div>
</template>

<script>
import PageLoader from './components/page-loader/page-loader.vue';
import Header from './components/header/header.vue';

export default {
  name: 'App',
  components: {
    Header,
    PageLoader
  }
};
</script>

<style lang="scss" src="./assets/styles/index.scss">
</style>
