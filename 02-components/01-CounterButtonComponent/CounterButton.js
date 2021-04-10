export const CounterButton = {
  template: '<button type="button" @click="onClick()">{{ value }}</button>',

  model: {
    prop: 'count',
    event: 'increment',
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      value: this.count,
    };
  },

  methods: {
    onClick() {
      this.$emit('increment', ++this.value);
    },
  },
};
