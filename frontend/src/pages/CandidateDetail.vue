<template lang="pug">
  TemplateTN
    .reee {{detail.name}}
</template>

<script>

import TemplateTN from '@/templates/TemplateTN'

export default {
  name: 'CandidateDetail',
  components: {
    TemplateTN
  },
  props: {
    detail: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import "../../node_modules/bulma/bulma.sass"
</style>
