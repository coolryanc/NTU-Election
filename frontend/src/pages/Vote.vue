<template lang="pug">
  TemplateTN
    MessageBox(v-if="loginInfo" :detailLogin="loginInfo" :voteResult="isSign" @endShow="clearLoginInfo" @endVote="voteFinish")
    .columns(style="margin-bottom: 46px")
      .column.is-6
        .box
          .content
            p.title 投票規則
            p 1. 國立臺灣大學學生皆具有本意向投票之投票權。
            p 2. 每人限投票一次，確定投票後無法修改。
            p 3. <span style="color: red">每張選票可圈選支持二到八位候選人</span>（須圈選兩位以上候選人，僅圈選一位將成為無效票）
            p 4. 投票時間為 2017 年 12 月 11 日 00：00 至 12 月 21 日 23：59。
      .column.is-6
        figure.image
          img(:src="voteProcess")
    transition(name="fade")
      #show(v-if="isShow")
        .is-mobile
          #mobile-ballot(v-if="!userVoted")
            .columns(v-if="authenticated")
              .column(v-for='(item, index) in candidates')
                .image
                  .image1
                    img(:src="item.image")
                .name
                  span.title.is-4 {{item.name}}
                .vote(@click="checkSign(index)" style="padding: 30px; position: relative")
                  figure.notSign(:class="{showSign: isSign[index]}" style="width: 100%;")
                    img(:src="voteImg" :alt="item.name")
        .is-not-mobile
          #ballot.columns(v-if="!userVoted")
            .column.ballot-contain(v-if="authenticated")
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
        .columns(v-if="!userVoted" style="margin-top: 32px;")
          .column(v-if="authenticated" style="overflow: hidden;")
            .button.is-primary(@click="submit()" style="float: right; padding: 30px 40px") 送出投票
        .columes(v-if="!authenticated" style="text-align: center; font-style: italic")
          .column
            br
            br
            p.subtitle.is-4 請登入後再進行投票
        .columes(v-if="authenticated" style="text-align: center;")
          .column(v-if="userVoted")
            br
            p.title.is-4#remind 小提醒
            br
            p.subtitle.is-5 親愛的同學，您已完成投票，請靜待校長意向投票結果！
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
      voteImg: './static/vote.png',
      voteProcess: './static/voteProcess.png',
      authenticated: false,
      userVoted: true,
      isShow: false
    }
  },
  mounted () {
    this.$http.get('https://ntustudents.org/election-api/deprecated/problems.php').then((response) => {
      this.candidates = JSON.parse(response.body).candidates
      this.isSign = Array(this.candidates.length).fill(false)
      this.authenticated = auth.user.authenticated
      this.userVoted = auth.user.userVoted
      this.isShow = true
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
    },
    voteFinish () {
      this.userVoted = true
      this.$forceUpdate()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../../node_modules/bulma/bulma.sass"
@import "../sass/common"

.fade-enter-active
  animation: show .2s 1

.fade-leave-active
  animation: show .2s reverse

@keyframes show
  0%
    opacity: 0.3
    transform: translateY(-5px)
  100%
    opacity: 1
    transform: translateY(0px)

@media screen and (max-width: 768px)
  .is-not-mobile
    display: none
  .is-mobile
    display: inherit

@media screen and (min-width: 769px)
  .is-not-mobile
    display: inherit
  .is-mobile
    display: none

.notSign
  opacity: 0
  user-select: none
.showSign
  opacity: 1

#remind
  position: relative
  &::before
    content: ''
    display: inline-block
    width: 20px
    height: 30px
    background-image: url('https://ntusa.iconcern.tw/img/issue.png')
    background-size: cover
    background-repeat: no-repeat
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

#mobile-ballot
  .columns, .column
    background-color: white
    transition-duration: .3s
  .columns
    box-shadow: 0 0 6px 2px rgba(black, .2)
    .column
      padding: 0
      display: flex
      flex-direction: row
      border-bottom: solid 1px rgba(black, 0.2)
      .image
        .image1
          +center
          width: 90%
        position: relative
        width: 30%
        border-right: solid 1px rgba(black, 0.2)
        box-sizing: border-box
      .name
        span
          +center
        position: relative
        width: 40%
        border-right: solid 1px rgba(black, 0.2)
        box-sizing: border-box
      .vote
        width: 30%

.vote
  cursor: url('https://cdn4.iconfinder.com/data/icons/IMPRESSIONS/accounting/png/64/stamp.png'), auto

</style>
