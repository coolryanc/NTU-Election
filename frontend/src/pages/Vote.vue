<template lang="pug">
  TemplateTN
    .columns(style="margin-bottom: 64px")
      .column.is-6
        .box
          .content
            p.title 投票規則
            p user投票時要投最少兩票，如果只投一票就按送出需要能判斷出來。當user按下條票送出後出現一個警示框，告知 : 投票送出後無法做更改唷 ! 確定要送出了嗎 ?
    #ballot.columns
      .column.ballot-contain
        .columns
          .column.vote(v-for='(item, c_index) in candidates' @click="checkSign(c_index)" :key="item.name" style="position: relative; padding-top: 60px; padding-bottom: 60px")
            figure.image.is-1by1.notSign(:class="{showSign: isSign[c_index]}")
              img(src="/static/vote.png" :alt="item.name" style="width: 60%; height: 60%; left: 50%; transform: translate(-50%, 30%)")
        .columns
          .column(v-for='(item, index) in candidates' :key="item.e_name" style="position: relative; padding-top: 30px; padding-bottom: 30px")
            p.title.is-6(style="text-align: center;") {{index+1}}
        .columns
          .column(v-for='item in candidates' :key="item.image" style="position: relative;")
            figure.image.is-4by3
              img(:src="item.image" :alt="item.name")
        .columns
          .column(v-for='item in candidates' style="position: relative; padding-top: 50px; padding-bottom: 50px")
            p.title.is-5(v-for='c in item.name' style="text-align: center;") {{c}}
    .columns(style="margin-top: 32px;")
      .column(style="overflow: hidden;")
        .button.is-primary(style="float: right; padding: 30px 40px") 送出投票
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
      candidates: null,
      isSign: null
    }
  },
  mounted () {
    this.$http.get('https://ntustudents.org/election-api/deprecated/problems.php').then((response) => {
      this.candidates = JSON.parse(response.body).candidates
      this.isSign = Array(this.candidates.length).fill(false)
    }, (response) => {
      console.log('Error')
    })
  },
  methods: {
    checkSign (index) {
      let newBool = !this.isSign[index]
      this.$set(this.isSign, index, newBool)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../../node_modules/bulma/bulma.sass"
@import "../sass/common"
.vote
  cursor: url('https://cdn4.iconfinder.com/data/icons/IMPRESSIONS/accounting/png/64/stamp.png'), auto
.notSign
  opacity: 0
  user-select: none
.showSign
  opacity: 1
#ballot
  .ballot-contain
    .columns, .column
      background-color: white
    .columns
      .column
        border-right: solid 1px rgba(black, 0.2)
        border-bottom: solid 1px rgba(black, 0.2)
      .column:nth-child(8)
        border-right: none
    .columns:nth-child(4)
      .column
        border-bottom: none

  box-shadow: 0 0 6px 2px rgba(black, .2)
  // border-radius: 10px
</style>
