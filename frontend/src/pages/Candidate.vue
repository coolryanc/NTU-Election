<template lang="pug">
  TemplateTN
    .columns(v-for="(array, index) in candidates")
      PersonCube(v-for="(item, index) in array" :person_info="item" :key="index")
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
      candidatePerRow: 4
    }
  },
  mounted () {
    this.$http.get('http://localhost:5000/candidates').then((response) => {
      this.candidates = response.body.candidates
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import "../../node_modules/bulma/bulma.sass"
</style>
