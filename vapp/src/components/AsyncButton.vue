<template>
  <el-button
    :type="type"
    :round="round"
    :circle="circle"
    :icon="icon"
    :loading="isLoading"
    :size="size"
    :disabled="disabled"
    @click="doFunc"
  >
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  props: {
    type: String,
    circle: Boolean,
    round: Boolean,
    icon: String,
    size: String,
    disabled: Boolean,
    onClick: { default: () => () => undefined }
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    async doFunc() {
      this.isLoading = true
      try {
        await this.onClick()
      } catch {
        undefined
      }
      this.isLoading = false
    }
  }
}
</script>
