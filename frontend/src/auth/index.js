
export default {
  user: {
    authenticated: false,
    userVoted: true
  },
  setLocalStorage (iConcernNtuId, token) {
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem('iConcernNtuId', iConcernNtuId)
      localStorage.setItem('electionToken', token)
    }
  },
  logout () {
    localStorage.removeItem('iConcernNtuId')
    localStorage.removeItem('electionToken')
    this.user.authenticated = false
    this.user.userVoted = true
  },
  checkAuth (context) {
    return new Promise((resolve, reject) => {
      let iConcernNtuId = localStorage.getItem('iConcernNtuId')
      let token = localStorage.getItem('electionToken')
      let self = this
      if (iConcernNtuId && token) {
        const VOTED_URL = `https://ntustudents.org//election-api/has_voted.php?iConcernNtuId=${iConcernNtuId}&token=${token}`
        context.$http.get(VOTED_URL).then((response) => {
          self.user.authenticated = true
          let loginInfo = Object.assign({}, JSON.parse(response.body))
          resolve(loginInfo)
        }, (response) => {
          let error = {
            'status': 'failure',
            'error_message': '伺服器出錯，工程師搶修中。'
          }
          let loginInfo = Object.assign({}, error)
          resolve(loginInfo)
        })
      } else {
        let error = {
          'status': 'failure',
          'error_message': '尚未登入，請先登入在進行投票。'
        }
        let loginInfo = Object.assign({}, error)
        resolve(loginInfo)
      }
    })
  },
  userVote (context, voteResult) {
    return new Promise((resolve, reject) => {
      let iConcernNtuId = localStorage.getItem('iConcernNtuId')
      let token = localStorage.getItem('electionToken')
      if (iConcernNtuId && token) {
        const POST_URL = 'https://ntustudents.org//election-api/vote.php'
        let user = {
          'iConcernNtuId': iConcernNtuId,
          'token': token,
          'votes': voteResult
        }
        let postData = Object.assign({}, user)
        context.$http.post(POST_URL, postData).then((response) => {
          resolve('投票成功!謝謝您的參與。')
        }, (response) => {
          resolve('投票失敗，有可能是認証過期，請再重新登入。')
        })
      }
    })
  }
}
