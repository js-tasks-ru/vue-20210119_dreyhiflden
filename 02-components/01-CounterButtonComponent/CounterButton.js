export const CounterButton = {
  template: '<button type="button" @click="onClick()">{{ count }}</button>',

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

  methods: {
    onClick() {
      this.$emit('increment', this.count + 1);
    },
  },
};
