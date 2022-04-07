<template src="./login-card.html">
</template>

<script>
import {
  required,
  minLength,
  sameAs,
  email
} from 'vuelidate/lib/validators/index';

export default {
  name: 'LoginCard',
  data() {
    return {
      userData: {
        userId: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  validations: {
    userData: {
      userId: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(5)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  props: {
    mode: String
  },
  computed: {
    isSubmitDisable() {
      if (this.mode === 'register') {
        return !this.userData.userId.length > 0
        || !this.userData.password.length > 0 || !this.userData.confirmPassword.length > 0
        || !this.userData.email.length > 0;
      }
      return !this.userData.password.length > 0 || !this.userData.email.length > 0;
    }
  },
  methods: {
    emitToParent() {
      if (this.mode === 'register') {
        this.$emit('onFromSubmit', this.userData.userId, this.userData.password, this.userData.email);
      } else {
        this.$emit('onFromSubmit', this.userData.email, this.userData.password);
      }
    },
    touchPopulatedFields() {
      const modelFields = [
        'userId',
        'email',
        'password',
        'confirmPassword'
      ];
      Object.keys(this.$v.userData).forEach((key) => {
        if (modelFields.includes(key) && this.$v.userData[key].$model) {
          this.$v.userData[key].$touch();
        }
      });
    }
  },
  mounted() {
    this.touchPopulatedFields();
  }
};
</script>

<style scoped lang="scss" src="./login-card.scss">
</style>
