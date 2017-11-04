<template lang="pug">
  div
    nav.navbar(role="navigation" aria-label="main navigation")
      .navbar-brand
        router-link.navbar-item(to="/") 台大校長選舉
        .navbar-burger.burger
          span(v-for="i in 3")
      .navbar-menu
        .navbar-start
          .navbar-item.has-dropdown.is-hoverable
            router-link.navbar-link(to="/candidate") 候選人
            .navbar-dropdown
              router-link.navbar-item(v-for="item in candidates" :to="{name: 'candidate_detail', params:{detail: item}}" :key="item.name") {{item.name}}
          a.navbar-item 訪問
          a.navbar-item 投票去
    section.section
      .container
        slot
    TemplateFooter
</template>

<script>

import TemplateFooter from './TemplateFooter'

export default {
  name: 'TemplateTN',
  components: {
    TemplateFooter
  },
  data () {
    return {
      candidates: null
    }
  },
  mounted () {
    this.$http.get('http://localhost:5000/candidates').then((response) => {
      this.candidates = response.body.candidates
    }, (response) => {
      console.log('Error')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../../node_modules/bulma/bulma.sass"
// @import "../../node_modules/bulma/sass/utilities/_all"
// @import "../../node_modules/bulma/sass/components/navbar.sass"
// @import "../sass/common"

.navbar
  box-shadow: 0 2px 5px 0px rgba(black, 0.1)
a
  text-decoration: none

.container
  min-height: 720px
  // background-color: #783122

</style>
