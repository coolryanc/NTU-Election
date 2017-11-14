<template lang="pug">
  #main
    nav.navbar(role="navigation" aria-label="main navigation")
      .navbar-brand
        router-link(to="/")
          img(src="/static/canIAsk.png" style="height: 84px;")
        .navbar-burger.burger
          span(v-for="i in 3")
      .navbar-menu
        .navbar-start
          router-link.navbar-item(to="/candidate")
            img(src=src="https://ntusa.iconcern.tw/img/profile.png" style="height: 18px;")
            p.subtitle.is-6 &nbsp; 候選人簡介
          router-link.navbar-item(to="/interview")
            img(src="https://ntusa.iconcern.tw/img/issue.png" style="height: 18px;")
            p.subtitle.is-6 &nbsp; 校務議題立場
          router-link.navbar-item(to="/vote")
            img(src="https://ntusa.iconcern.tw/img/vote.png" style="height: 18px;")
            p.subtitle.is-6 &nbsp; 我要投票
          a.navbar-item(href="https://ntusa.iconcern.tw/videoRecord.php")
            img(src="https://ntusa.iconcern.tw/img/video.png" style="height: 18px;")
            p.subtitle.is-6 &nbsp; 新聞影音
          a.navbar-item(href="https://ntusa.iconcern.tw/about.php")
            img(src="https://ntusa.iconcern.tw/img/iConcenr_info.png" style="height: 60px;")
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
    }
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
  padding: 12px 0
  position: fixed
  width: 100% !important
  z-index: 999
  height: 7em

a
  text-decoration: none

.section
  background-color: rgba(black, 0.01)
  padding-top: 10em

.navbar-brand, .navbar-menu
  margin-left: 2em

.navbar-brand img
  position: relative
  // top: 20px

.container
  min-height: 100vh
  padding: 0 25px

p.subtitle.is-6
  font-size: .9em
  font-weight: 500
  color: rgba(black, 0.5)
  &:hover
    color: rgba(black, 0.6)
.navbar-burger.burger
  &:hover
    background-color: transparent

#main
  height: 100%
</style>
