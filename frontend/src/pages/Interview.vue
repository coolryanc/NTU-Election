<template lang="pug">
  TemplateTN
    #interview
      .is-not-mobile
        .columns#explain
          .column.is-4
            .box
              .media
                .media-content
                  .content
                    .columns
                      .column.explain-text
                        span.title.is-4.redCheck ○
                      .column.explain-text
                        span.title.is-4.disagree ✗
                      .column.explain-text
                        span.title.is-4.neutral △
                      .column.explain-text
                        span.title.is-4.none □
        .columns
          .column.is-2
          .column.is-1(v-for="(item, index) in candidates" :key="index")
            .media
              .media-content.center-text
                p.title.is-5 {{item.name}}
          .column
        .columns(v-for="(item, index) in problems" :key="index")
          .column.is-2(@click="getQuestionData(index)" style="cursor: pointer;")
            .media
              .media-left
                .tag Q{{index+1}}.
              .media-content
                p.title.is-6 {{problemsDescription[index].shortDescription}}
          .column.is-1(style="padding-top:0;" v-for="(v, vIndex) in item.vote" :key="vIndex")
            p.reason.subtitle.is-2.center-text.redCheck(v-if="v == 1" @click="getReplyData(index, vIndex)") ○
            p.reason.subtitle.is-2.center-text(v-if="v === 2" @click="getReplyData(index, vIndex)") ✗
            p.reason.subtitle.is-2.center-text.neutral(v-if="v === 3" @click="getReplyData(index, vIndex)") △
            p.reason.subtitle.is-2.center-text.neutral(v-if="v === 4" @click="getReplyData(index, vIndex)") □
            .menu-label.is-6.center-text.neutral(v-if="v === 0" style="line-height:5;") 填答中
          .column
            .button.is-primary(@click="getReplyData(index, 8)") 查看所有回覆
        ReplyCube(:detailReply="getDetail" :questionTitle="getQuestionTitle" :getClass="replyIsShow" @endShow="cancelIsShow")
        QuestionCube(:detailReply="getQuestion" :questionTitle="getQuestionTitle" :getClass="questionIsShow" @endShow="cancelIsShow")
      .is-mobile
        .box(v-for="(item, index) in problems" :key="index")
          .columns
            .column
              .media
                .media-left
                  .tag Q{{index+1}}.
                .media-content(@click="getQuestionData(index)" style="cursor: pointer;")
                  p.title.is-6 {{problemsDescription[index].shortDescription}}
          .columns
            .column(style="overflow: hidden;")
              .button.is-primary(@click="getReplyData(index, 8)" style="float: right;") 查看所有回覆
        ReplyCube(:detailReply="getDetail" :questionTitle="getQuestionTitle" :getClass="replyIsShow" @endShow="cancelIsShow")
        QuestionCube(:detailReply="getQuestion" :questionTitle="getQuestionTitle" :getClass="questionIsShow" @endShow="cancelIsShow")
</template>

<script>

import TemplateTN from '@/templates/TemplateTN'
import ReplyCube from '@/components/ReplyCube'
import QuestionCube from '@/components/QuestionCube'
export default {
  name: 'Landing',
  components: {
    TemplateTN,
    ReplyCube,
    QuestionCube
  },
  data () {
    return {
      candidates: null,
      problems: [],
      problemsDescription: [],
      getDetail: [],
      getQuestionTitle: '',
      replyIsShow: '',
      questionIsShow: '',
      getQuestion: ''
    }
  },
  mounted () {
    let getAllData = async () => {
      await this.getCandidates()
      await this.getProblemsDescription()
      await this.getStandpoint()
    }
    getAllData()
  },
  methods: {
    getStandpoint () {
      return new Promise((resolve, reject) => {
        this.$http.get('https://ntustudents.org/election-api/interview_response.php?field=problemId,candidateId,response').then((response) => {
          let getData = JSON.parse(response.body).data
          for (let i = 0; i < this.problemsDescription.length; i++) {
            let problem = Object.assign({}, {'vote': []})
            for (let j = 0; j < this.candidates.length; j++) {
              problem.vote.push(0)
            }
            this.problems.push(problem)
          }
          getData.map(el => {
            let problemId = el.problemId
            let candidateId = el.candidateId
            this.problems[problemId].vote[candidateId] = el.response
          })
          resolve()
        }, (response) => {
          console.log('Error')
        })
      })
    },
    getCandidates () {
      return new Promise((resolve, reject) => {
        this.$http.get('https://ntustudents.org/election-api/candidate.php?field=name,profileImage').then((response) => {
          this.candidates = JSON.parse(response.body).data
          resolve()
        }, (response) => {
          console.log('Error')
        })
      })
    },
    getProblemsDescription () {
      return new Promise((resolve, reject) => {
        this.$http.get('https://ntustudents.org/election-api/interview_problem.php?field=shortDescription,problemId').then((response) => {
          this.problemsDescription = JSON.parse(response.body).data
          resolve()
        }, (response) => {
          console.log('Error')
        })
      })
    },
    getReplyData (index, vIndex) {
      let url = ''
      if (vIndex !== 8) {
        url = `https://ntustudents.org/election-api/interview_response.php?problemId=${index}&candidateId=${vIndex}`
      } else {
        url = `https://ntustudents.org/election-api/interview_response.php?problemId=${index}`
      }
      this.$http.get(url).then((response) => {
        let getDescription = JSON.parse(response.body).data
        this.getDetail = []
        this.getQuestionTitle = this.problemsDescription[index].shortDescription
        getDescription.map((el, index) => {
          const tmp = Object.assign({}, this.candidates[el.candidateId], el)
          this.getDetail.push(tmp)
        })
        document.querySelector('html').classList.add('is-clipped')
        this.replyIsShow = 'is-active'
      }, (response) => {
        console.log('Error')
      })
    },
    getQuestionData (index, vIndex) {
      this.getQuestionTitle = this.problems[index].description
      this.getQuestion = this.problems[index].detail
      document.querySelector('html').classList.add('is-clipped')
      this.questionIsShow = 'is-active'
    },
    cancelIsShow () {
      document.querySelector('html').classList.remove('is-clipped')
      this.replyIsShow = ''
      this.questionIsShow = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../../node_modules/bulma/bulma.sass"
@import "../sass/common"

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
    span.title.is-4.none
      color: #0C1D27
      &::after
        content: ' 皆非'
        color: rgba(black, 0.7)
        font-size: .7em

p.subtitle.is-2.center-text.redCheck
  color: red

p.subtitle.is-2.center-text.neutral
  color: #0C1D27

p.reason.subtitle.is-2.center-text
  position: relative
  &::after
    display: block
    transition-duration: .07s
    opacity: 0
    content: '更多'
    +center
    font-size: 0.3em
    background-color: #222
    padding: 9px 7px
    width: 70%
    border-radius: 3px
    color: white

.media-content.center-text, .center-text
  text-align: center

.column.is-1
  cursor: pointer
  padding-top: 0
  .menu-label
    cursor: default
  &:hover
    p.reason.subtitle.is-2.center-text
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
