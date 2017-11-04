<template lang="pug">
  router-link.column(:to="{name: 'candidate_detail', params:{detail: person_info}}")
    .card
      .card-image
        figure.image.is-1by1
          img.circle(:src="person_info.image" :alt="person_info.name")
      .card-content
        .content {{person_info.name}}
</template>

<script>
export default {
  name: 'PersonCube',
  data () {
    return {
    }
  },
  props: {
    person_info: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../../node_modules/bulma/bulma.sass"

.card
  cursor: pointer
  transition: .2s
  &:hover
    transform: translate(-3px, -3px)
    box-shadow: 2px 2px 8px 1px rgba(black, 0.2)

.circle
  border-radius: 100%

</style>
