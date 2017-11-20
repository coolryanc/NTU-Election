<template lang="pug">
  #main
    TemplateNav
    section.section
      .container
        slot
    TemplateFooter
</template>

<script>

import TemplateFooter from './TemplateFooter'
import TemplateNav from './TemplateNav'

export default {
  name: 'TemplateTN',
  components: {
    TemplateFooter,
    TemplateNav
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../../node_modules/bulma/bulma.sass"

a
  text-decoration: none

.section
  background-color: rgba(black, .015)
  padding-top: 10em

.container
  min-height: 100vh


#main
  height: 100%
</style>
