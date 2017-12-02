<template lang="pug">
  .process
    .conlumns
      .columns
        p.title 「我要投票！」流程
    .conlumns
      .column
</template>

<script>
export default {
  name: 'VoteProcess',
  data () {
    return {
    }
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
