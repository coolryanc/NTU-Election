<template>
  <div class="bootstrap-iso menu-iso">
    <nav class="navbar navbar-toggleable-md navbar-light forumTopMenu">
      <button class="navbar-toggler navbar-toggler-right" id="menuBtn" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a href="https://ntusa.iconcern.tw/index.php">
        <div class="imgLogo">
          <img class="canIAskLogo" src="https://ntusa.iconcern.tw/img/canIAsk.png">
        </div>
      </a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <img src="https://ntusa.iconcern.tw/img/profile.png">&nbsp;候選人簡介
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/interview">
              <img src="https://ntusa.iconcern.tw/img/issue.png">&nbsp;校務議題立場
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://140.117.68.86/">
              <img src="https://ntusa.iconcern.tw/img/forum.png">&nbsp;校長，給問？
            </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to='/vote'>
              <img src="https://ntusa.iconcern.tw/img/vote.png">&nbsp;我要投票
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://ntusa.iconcern.tw/videoRecord.php">
              <img src="https://ntusa.iconcern.tw/img/video.png">&nbsp;新聞影音
            </a>
          </li>
          <li v-if="!ntuId" class="nav-item hidden-lg-up" @click="redirect()"><a class="nav-link"><img src="https://ntusa.iconcern.tw/img/setting.png">&nbsp;登入</a></li>
          <li class="nav-item hidden-md-down">
            <a href="https://ntusa.iconcern.tw/about_iConcern.php">
              <img style="margin-top:-21px;height: 60px;" src="https://ntusa.iconcern.tw/img/iConcenr_info.png">
            </a>
          </li>
          <li v-if="!ntuId" class="nav-item hidden-md-down" @click="redirect()">
            <a class="nav-link">
              <img src="https://ntusa.iconcern.tw/img/login_image.png" style="height: 28px;">
            </a>
					</li>
          <li v-if="ntuId" class="nav-item hidden-md-down" @click="logOut()">
            <div class="userBtn dropDown">
              {{ntuId.substring(0,1).toUpperCase()}}{{ntuId.substring(1,3)}}
            </div>
					</li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  name: 'TemplateNav',
  data () {
    return {
      ntuId: ''
    }
  },
  mounted () {
    let iConcernNtuId = localStorage.getItem('iConcernNtuId')
    let token = localStorage.getItem('electionToken')
    if (iConcernNtuId && token) {
      const VOTED_URL = `https://ntustudents.org//election-api/has_voted.php?iConcernNtuId=${iConcernNtuId}&token=${token}`
      this.$http.get(VOTED_URL).then((response) => {
        let loginInfo = JSON.parse(response.body)
        if (loginInfo.status === 'success') {
          this.ntuId = iConcernNtuId
          auth.user.authenticated = true
          auth.user.userVoted = loginInfo.data.has_voted
        } else {
          auth.user.authenticated = false
        }
      })
    }
  },
  methods: {
    redirect () {
      let URL = 'https://ntusa.iconcern.tw/login_info.php?callbackURL=https://ntustudents.org/election-api/login.php&redirect_to='
      URL += `https://ntustudents.org/election/#${this.$route.fullPath}`
      window.location = URL
    },
    logOut () {
      let self = this
      let logootPromise = auth.logout(this)
      logootPromise.then(() => {
        localStorage.removeItem('iConcernNtuId')
        localStorage.removeItem('electionToken')
        self.ntuId = ''
        window.location = `https://ntustudents.org/election/#${self.$route.fullPath}`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../sass/common"
.userBtn
  cursor: pointer
  width: 50px
  height: 50px
  background-color: #7BC2A4
  border-radius: 999px
  line-height: 50px
  text-align: center
  font-weight: bold
  color: white
  position: relative
  &:hover
    &::after
      content: '登出'
      position: absolute
      color: #222
      width: 60px
      font-size: 1.2em
  &::before
    content: ''
    width: 37px
    height: 37px
    border: solid 3px white
    border-radius: 999px
    +center

</style>
