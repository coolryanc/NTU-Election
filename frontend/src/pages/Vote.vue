<template lang="pug">
  TemplateTN
    .columns(style="margin-bottom: 64px")
      .column.is-6
        .box
          .content
            p.title 投票規則
            p user投票時要投最少兩票，如果只投一票就按送出需要能判斷出來。當user按下條票送出後出現一個警示框，告知 : 投票送出後無法做更改唷 ! 確定要送出了嗎 ?
    .columns
      .column.vote(v-for='item in 8' style="position: relative; border: solid 1px; padding-top: 60px; padding-bottom: 60px")
    .columns
      .column(v-for='(item, index) in candidates' style="position: relative; border: solid 1px; padding-top: 30px; padding-bottom: 30px")
        p.title.is-6(style="text-align: center;") {{index+1}}
    .columns
      .column(v-for='item in candidates' style="position: relative; border: solid 1px")
        figure.image.is-4by3
          img(:src="item.image" :alt="item.name")
    .columns
      .column(v-for='item in candidates' style="position: relative; border: solid 1px; padding-top: 50px; padding-bottom: 50px")
        p.title.is-6(v-for='c in item.name' style="text-align: center;") {{c}}
</template>

<script>

import TemplateTN from '@/templates/TemplateTN'

export default {
  name: 'Vote',
  components: {
    TemplateTN
  },
  data () {
    return {
      candidates: null
    }
  },
  mounted () {
    this.$http.get('https://ntustudents.org/election-api/deprecated/candidates.php').then((response) => {
      this.candidates = JSON.parse(response.body).candidates
    }, (response) => {
      console.log('Error')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import "../../node_modules/bulma/bulma.sass"
  @import "../sass/common"

  .vote
      cursor: url(../../static/vote.png), auto
</style>
