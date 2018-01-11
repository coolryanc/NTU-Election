<template lang="pug">
  #app
    router-view
</template>

<script>
import auth from './auth'
export default {
  name: 'app',
  data () {
    return {
      token: null,
      iConcernNtuId: null,
      windowUrl: window.location.href
    }
  },
  beforeMount () {
    this.getIdToken()
  },
  methods: {
    getIdToken () {
      let url = new URL(this.windowUrl)
      let iConcernNtuId = url.searchParams.get('iConcernNtuId')
      let token = url.searchParams.get('token')
      if (token !== null && iConcernNtuId !== null) {
        this.iConcernNtuId = iConcernNtuId
        this.token = token
        auth.setLocalStorage(iConcernNtuId, token)
        window.history.replaceState({}, {}, '/election' + this.$route.path)
      }
    }
  }
}
</script>

<style lang="sass">
  @import "../node_modules/bulma/bulma.sass"
  html, body
    width: 100%
    height: 100%
    margin: 0
    padding: 0

  #app
    width: 100%
    height: 100%
</style>
