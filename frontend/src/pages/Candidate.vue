<template lang="pug">
  TemplateTN
    transition(name="fade")
      .modal(v-if="isClick" @click="showMore()" :class="isClick")
        .modal-background
        .modal-content
          .box
            .media
              .media-left
                figure.image.is-96x96
                  img(:src="get_person_info.image")
              .media-content
                .content
                  p
                    strong.title.is-4 {{get_person_info.name}}
                  .tag.is-primary 現職
                  li(v-for="i in get_person_info.position") {{i}}
                  .tag.is-primary 學歷
                  li(v-for="i in get_person_info.education") {{i}}
                  .tag.is-primary 經歷
                  li(v-for="i in get_person_info.experience") {{i}}
        button.modal-close.is-large
    .columns(v-for="(array, row) in candidates")
      PersonCube(v-for="(item, col) in array" :person_info="item" :key="col" @click.native="showMore(row, col)")
    .columns(v-if="candidates")
      .column
        .content
          .title.is-6
            | 想直接與八位候選人面對面？➜ 關於「
            a(href="https://ntusa.iconcern.tw/candidate_talk.php") 校長，給問嗎？
            | 」候選人座談
    .columns(v-if="candidates")
      .column
        .content
          .title.is-6
            | 候選人對學生事務怎麼說？➜ 關於「
            router-link(to="/interview") 校務議題立場
            | 」
</template>

<script>

import TemplateTN from '@/templates/TemplateTN'
import PersonCube from '@/components/PersonCube'

export default {
  name: 'Candidate',
  components: {
    TemplateTN,
    PersonCube
  },
  data () {
    return {
      candidates: null,
      lenOfCols: Number,
      candidatePerRow: 4,
      isClick: '',
      get_person_info: null
    }
  },
  mounted () {
    this.$http.get('https://ntustudents.org/election-api/deprecated/candidates.php').then((response) => {
      this.candidates = JSON.parse(response.body).candidates
      this.lenOfCols = Math.ceil(this.candidates.length / this.candidatePerRow)
      this.spilitCandidateArray()
    }, (response) => {
      console.log('Error')
    })
  },
  methods: {
    spilitCandidateArray () {
      let returnArray = []
      for (let i = 0, j = this.candidates.length; i < j; i += this.candidatePerRow) {
        let temparray = this.candidates.slice(i, i + this.candidatePerRow)
        returnArray.push(temparray)
      }
      this.candidates = returnArray
    },
    showMore (row = -1, col = -1) {
      if (this.isClick) {
        document.querySelector('html').classList.remove('is-clipped')
        this.isClick = ''
      } else {
        if (row !== -1) {
          this.get_person_info = this.candidates[row][col]
        }
        document.querySelector('html').classList.add('is-clipped')
        this.isClick = 'is-active'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../../node_modules/bulma/bulma.sass"

.modal
  z-index: 999

.fade-enter-active
  animation: show .4s 1

.fade-leave-active
  animation: show .4s reverse

.tag
  margin-top: 16px

@keyframes show
  0%
    opacity: 0.3
    transform: translateY(-5px)
  100%
    opacity: 1
    transform: translateY(0px)
</style>
