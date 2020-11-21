export default {
  data: () => ({
    listeners: []
  }),
  methods: {
    listenTo(listener, event, callback) {
      listener.on(event, callback)
      this.listeners.push({
        listener,
        event,
        callback
      })
      return listener
    }
  },
  destroyed() {
    this.listeners.forEach(({ listener, event, callback }) =>
      listener.removeListener(event, callback)
    )
  }
}
