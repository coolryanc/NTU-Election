<template lang="pug">
  .column
    .card
      .card-image
        figure.image.is-4by3
          img(:src="person_info.image" :alt="person_info.name")
      .card-content
        .media
          .media-content
            p.title.is-4 {{person_info.name}}
        .content
          p.menu-label 現職
          .media(v-for="(p, index) in person_info.position")
            .media-content
              p.title.is-6 {{p.split(' ')[0]}}
              p.subtitle.is-6 {{p.split(' ')[1]}}
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
  animation: rise .5s 1
  &:hover
    transform: translate(-2px, -2px)
    box-shadow: 2px 2px 8px 1px rgba(black, 0.2)

.is-narrow
  padding-right: 0

.subtitle
  color: rgba(0, 0, 0, 0.4)
  padding-top: 9px

.content
  min-height: 240px

p.menu-label
  display: inline-block
  padding: 2px 0
  border-bottom: solid 3px $primary

@keyframes rise
  0%
    opacity: 0
    transform: translateY(-5px)
  100%
    opacity: 1
    transform: translateY(0px)

</style>
