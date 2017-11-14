<template lang="pug">
  TemplateTN
    #interview
      .columns#explain
        .column.is-3
          .box
            .media
              .media-content
                .content
                  .columns
                    .column.explain-text
                      span.title.is-4.redCheck ✓
                    .column.explain-text
                      span.title.is-4.disagree ✗
                    .column.explain-text
                      span.title.is-4.neutral ▲
      .columns
        .column.is-2
        .column.is-1(v-for="(item, index) in candidates" :key="index")
          .media
            .media-content.center-text
              p.title.is-5 {{item.name}}
        .column
      .columns(v-for="(item, index) in problems" :key="index")
        .column.is-2
          .media
            .media-left
              .tag Q{{index+1}}.
            .media-content
              p.title.is-6 {{item.description.substring(0,7)}} <br />...
        .column.is-1.reason(v-for="(v, vIndex) in item.vote" :key="vIndex" @click="getReplyData(index, vIndex)")
          p.subtitle.is-2.center-text.redCheck(v-if="v.approve") ✓
          p.subtitle.is-2.center-text(v-if="v.approve === false") ✗
          p.subtitle.is-2.center-text.neutral(v-if="v.approve === null") ▲
        .column
          .button.is-primary(@click="getReplyData(index, 8)") 查看所有回覆
      ReplyCube(:detailReply="getDetail" :questionTitle="getQuestionTitle" :getClass="isShow" @endShow="cancelIsShow")
</template>

<script>

import TemplateTN from '@/templates/TemplateTN'
import ReplyCube from '@/components/ReplyCube'

export default {
  name: 'Landing',
  components: {
    TemplateTN,
    ReplyCube
  },
  data () {
    return {
      candidates: null,
      problems: null,
      getDetail: [],
      getQuestionTitle: '',
      isShow: ''
    }
  },
  mounted () {
    this.$http.get('http://localhost:5000/problems').then((response) => {
      this.candidates = response.body.candidates
      this.problems = response.body.problems
    }, (response) => {
      console.log('Error')
    })
  },
  methods: {
    getReplyData (index, vIndex) {
      this.getDetail = []
      this.getQuestionTitle = this.problems[index].description
      if (vIndex === 8) {
        this.problems[index].vote.map((el, i) => {
          const tmp = Object.assign({}, this.candidates[i], el)
          this.getDetail.push(tmp)
        })
      } else {
        const tmp = Object.assign({}, this.candidates[vIndex], this.problems[index].vote[vIndex])
        this.getDetail.push(tmp)
      }
      document.querySelector('html').classList.add('is-clipped')
      this.isShow = 'is-active'
    },
    cancelIsShow () {
      document.querySelector('html').classList.remove('is-clipped')
      this.isShow = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../../node_modules/bulma/bulma.sass"
@import "../sass/common"

#explain
  margin-bottom: 70px
  .explain-text
    text-align: center
    span.title.is-4.redCheck
      color: red
      &::after
        content: ' 贊成'
        color: rgba(black, 0.7)
        font-size: .7em
    span.title.is-4.disagree
      &::after
        content: ' 反對'
        color: rgba(black, 0.7)
        font-size: .7em
    span.title.is-4.neutral
      color: #0C1D27
      &::after
        content: ' 中立'
        color: rgba(black, 0.7)
        font-size: .7em

p.subtitle.is-2.center-text.redCheck
  color: red

p.subtitle.is-2.center-text.neutral
  color: #0C1D27

p.subtitle.is-2.center-text
  position: relative
  &::after
    display: block
    transition-duration: .07s
    opacity: 0
    content: '回覆'
    +center
    font-size: 0.3em
    background-color: #222
    padding: 7px
    width: 70%
    border-radius: 3px
    color: white

.media-content.center-text, .center-text
  text-align: center

.column.is-1.reason
  cursor: pointer
  padding-top: 0
  &:hover
    p.subtitle.is-2.center-text
      &::after
        opacity: 1

.fade-enter-active
  animation: show .4s 1

.fade-leave-active
  animation: show .4s reverse

#interview
  animation: show .5s 1

@keyframes show
  0%
    opacity: 0.3
    transform: translateY(-5px)
  100%
    opacity: 1
    transform: translateY(0px)
</style>
