<template lang="pug">
  TemplateTN
    MessageBox(v-if="loginInfo" :detailLogin="loginInfo" :voteResult="isSign" @endShow="clearLoginInfo")
    .columns(style="margin-bottom: 46px")
      .column.is-6
        .box
          .content
            p.title 「我要投票！」 - 投票規則
            p 1. 國立臺灣大學學生皆具有本投票之投票權。
            p 2. 每人限投票一次，確定投票後無法修改。
            p 3. 投票時間為 2017 年 12 月 11 日 0 時至 12 月 26 日 21 時。
      .column.is-6
        figure.image
          img(src="/static/VoteProcess.png")
    #ballot.columns
      .column.ballot-contain
        .columns
          .column(v-for='item in candidates' :key="item.image" style="position: relative;")
            figure.image.is-4by3
              img(:src="item.image" :alt="item.name")
        .columns
          .column(v-for='item in candidates' style="position: relative; padding-top: 50px; padding-bottom: 50px")
            p.title.is-4(v-for='c in item.name' style="text-align: center;") {{c}}
        .columns
          .column.vote(v-for='(item, c_index) in candidates' @click="checkSign(c_index)" :key="item.name" style="position: relative; padding-top: 60px; padding-bottom: 60px")
            figure.image.is-1by1.notSign(:class="{showSign: isSign[c_index]}")
              img(:src="voteImg" :alt="item.name" style="width: 60%; height: 60%; left: 50%; transform: translate(-50%, 30%)")
    .columns(style="margin-top: 32px;")
      .column(style="overflow: hidden;")
        .button.is-primary(@click="submit()" style="float: right; padding: 30px 40px") 送出投票
</template>

<script>

import TemplateTN from '@/templates/TemplateTN'
import MessageBox from '@/components/MessageBox'
import auth from '../auth'

export default {
  name: 'Vote',
  components: {
    TemplateTN,
    MessageBox
  },
  data () {
    return {
      candidates: null,
      isSign: null,
      loginInfo: null,
      voteImg: './static/vote.png'
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
    },
    submit () {
      let self = this
      let authPromise = auth.checkAuth(this)
      authPromise.then((info) => {
        self.loginInfo = Object.assign({}, self.loginInfo, info)
        self.$forceUpdate()
      })
    },
    clearLoginInfo () {
      this.loginInfo = null
      this.$forceUpdate()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../../node_modules/bulma/bulma.sass"
@import "../sass/common"

.notSign
  opacity: 0
  user-select: none
.showSign
  opacity: 1
#ballot
  .ballot-contain
    .columns, .column
      background-color: white
      transition-duration: .3s
    .column.vote
      &:hover
        background-color: rgba(#222, .05)
    .columns
      .column
        border-right: solid 1px rgba(black, 0.2)
        border-bottom: solid 1px rgba(black, 0.2)
      .column:nth-child(8)
        border-right: none
    .columns:nth-child(3)
      .column
        border-bottom: none

  box-shadow: 0 0 6px 2px rgba(black, .2)

.vote
  cursor: url('https://cdn4.iconfinder.com/data/icons/IMPRESSIONS/accounting/png/64/stamp.png'), auto

</style>
