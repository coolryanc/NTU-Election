<template lang="pug">
  transition(name="fade")
    .modal(v-if="status === 'success'" class="is-active")
      .modal-background(@click="endShow")
      .modal-card
        .modal-card-body
          .card-content
            article.media
              .media-left
                figure.image.is-16x16
                  img(src="https://ntusa.iconcern.tw/img/issue.png")
              .media-content
                p.title.is-4 小提醒
            .content(v-if="detailLogin.data.has_voted === true")
              br
              p 親愛的同學，您已投過票，請靜待校長選舉結果！
            .content(v-else)
              br
              p(v-if="postReturnInfo") {{postReturnInfo}}
              p(v-else) 若您圈選之候選人數少於 <span style="color:red">兩人</span>，您的選票將成為<span style="color:red">無效票</span>。請再次確認您的投票，若無需修改請按「確認送出」。
            .content(v-if="detailLogin.data.has_voted === false" style="overflow: hidden;")
              .button.is-primary(style="float: right; margin: 10px 5px" @click="endShow") 返回
              .button.is-primary(v-if="!postReturnInfo" style="float: right; margin: 10px 5px" @click="submitVote") 送出
          button.modal-close.is-large(@click="endShow")
    .modal(v-else class="is-active")
      .modal-background(@click="endShow")
      .modal-card
        .modal-card-body
          .card-content
            article.media
              .media-left
                figure.image.is-16x16
                  img(src="https://ntusa.iconcern.tw/img/issue.png")
              .media-content
                p.title.is-4 小提醒
            .content
              br
              p {{detailLogin.error_message}}
            .content(style="overflow: hidden;")
              .button.is-primary(style="float: right; margin: 10px 5px" @click="endShow") 返回
          button.modal-close.is-large(@click="endShow")
</template>

<script>
import auth from '../auth'

export default {
  name: 'MessageBox',
  data () {
    return {
      status: '',
      postCandidateId: [],
      postReturnInfo: ''
    }
  },
  props: {
    detailLogin: Object,
    voteResult: Array
  },
  mounted () {
    this.status = this.detailLogin.status
    this.voteResult.forEach((el, index) => {
      if (el === true) {
        this.postCandidateId.push(index.toString())
      }
    })
    document.querySelector('html').classList.add('is-clipped')
  },
  methods: {
    endShow () {
      this.postReturnInfo = ''
      document.querySelector('html').classList.remove('is-clipped')
      this.$emit('endShow')
    },
    submitVote () {
      console.log('vote!')
      let self = this
      let votePromise = auth.userVote(this, this.postCandidateId)
      votePromise.then((info) => {
        self.postReturnInfo = info
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../../node_modules/bulma/bulma.sass"

@media screen and (max-width: 768px)
  .is-not-mobile
    display: none
  .is-mobile
    display: block

@media screen and (min-width: 769px)
  .is-not-mobile
    display: inherit
  .is-mobile
    display: none

.modal-card
  border-radius: 5px

.modal
  z-index: 999

.fade-enter-active
  animation: show .4s 1

.fade-leave-active
  animation: show .4s reverse

@keyframes show
  0%
    opacity: 0.3
    transform: translateY(-5px)
  100%
    opacity: 1
    transform: translateY(0px)

</style>
