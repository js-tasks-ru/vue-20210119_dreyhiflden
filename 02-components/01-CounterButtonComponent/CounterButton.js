export const CounterButton = {
  template: '<button type="button" @click="onClick()">Increment</button>',

  model: {
    prop: 'value',
    event: 'increment',
  },

  props: {
    value: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      count: this.value,
    };
  },

  methods: {
    onClick() {
      this.$emit('increment', ++this.count);
    },
  },
};
