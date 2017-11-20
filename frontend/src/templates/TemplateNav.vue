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
            <a class="nav-link" href="http://140.117.68.62/">
              <img src="https://ntusa.iconcern.tw/img/forum.png">&nbsp;校長，給問？
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <img src="https://ntusa.iconcern.tw/img/vote.png">&nbsp;我要投票
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://ntusa.iconcern.tw/videoRecord.php">
              <img src="https://ntusa.iconcern.tw/img/video.png">&nbsp;新聞影音
            </a>
          </li>
          <li class="nav-item hidden-lg-up"><a class="nav-link" href="https://ntusa.iconcern.tw/login_info?callbackURL=URL_HERE"><img src="https://ntusa.iconcern.tw/img/setting.png">&nbsp;登入</a></li>
          <li class="nav-item hidden-md-down">
            <a href="https://ntusa.iconcern.tw/about.php">
              <img style="margin-top:-21px;height: 60px;" src="https://ntusa.iconcern.tw/img/iConcenr_info.png">
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TemplateNav',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
