import Vue from './vue.esm.browser.js';

const app = new Vue({
  el: '#app',
  data: {
    number: 0,
  },
  methods: {
    increaseNumber() {
      return this.number++;
    },
  },
});
