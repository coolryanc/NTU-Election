<template lang="pug">
  transition(name="fade")
    .modal(@click="endShow" :class="getClass" v-if="getClass")
      .modal-background
      .modal-card
        header.modal-card-head
          .content
            .title.modal-card-title {{questionTitle}}
        .modal-card-body
          .content
            article.media()
              .media-content
                .content
                  p {{detailReply}}
          button.modal-close.is-large
</template>

<script>
export default {
  name: 'ReplyCube',
  data () {
    return {
    }
  },
  props: {
    detailReply: String,
    getClass: String,
    questionTitle: String
  },
  methods: {
    endShow () {
      this.$emit('endShow')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../../node_modules/bulma/bulma.sass"

@media screen and (max-width: 769px)
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
