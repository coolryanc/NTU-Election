<template lang="pug">
  TemplateTN
    .columns
      .column.is-3
      .column.is-1(v-for="(item, index) in candidates" :key="index")
        .media
          .media-content
            p.title.is-5 {{item.name}}
            p.subtitle.is-6 @{{item.e_name}}
      .column
    .columns(v-for="(item, index) in problems" :key="index")
      .column.is-3 {{item.description}}
      .column.is-1(v-for="(v, v_index) in item.vote" :key="v_index") {{v}}
      .column
        .button.is-primary 查看完整回覆
</template>

<script>

import TemplateTN from '@/templates/TemplateTN'

export default {
  name: 'Landing',
  components: {
    TemplateTN
  },
  data () {
    return {
      candidates: null,
      problems: null
    }
  },
  mounted () {
    this.$http.get('http://localhost:5000/problems').then((response) => {
      this.candidates = response.body.candidates
      this.problems = response.body.problems
    }, (response) => {
      console.log('Error')
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import "../../node_modules/bulma/bulma.sass"
</style>
