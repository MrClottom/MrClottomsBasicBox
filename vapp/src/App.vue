<template>
  <div id="app">
    <el-alert
      title="current network isn't mainnet"
      type="warning"
      v-if="chain !== '0x1'"
      center
      show-icon
      :closable="false"
    >
      chainId: {{ chain }}
    </el-alert>
    <el-button class="account-show" round type="danger">Account: {{ account }}</el-button>
    <div class="centered">
      <p>Some centered content</p>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import AsyncButton from '@/components/AsyncButton'

export default {
  components: { AsyncButton },
  data() {
    return {
      provider: null,
      web3: null,
      account: null,
      chain: null
    }
  },
  async mounted() {
    this.provider = await detectEthereumProvider()
    this.chain = this.provider.chainId
    this.provider
      .on('accountsChanged', ([account]) => (this.account = account))
      .on('chainChanged', (newChain) => (this.chain = newChain))
    this.web3 = new Web3(this.provider)
    const [account] = await this.provider.request({ method: 'eth_requestAccounts' })
    this.account = account
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  flex-direction: column;
  justify-content: center;
  display: flex;
}
</style>

<style scoped>
.account-show {
  width: 24%;
  padding: 0.8%;
  margin: 1% auto 1% auto;
}
.centered {
  width: 50%;
  margin: 0 auto;
}
</style>
