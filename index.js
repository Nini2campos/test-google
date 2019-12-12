const apiKey = 'AIzaSyB4A0PqOqDxnQgd_GtAUkpZbtrqHY_Z97Y' // Id app Google
const clientId = '820539662856-njlnjf3un54ajsi7vlpap3511iebnpfd.apps.googleusercontent.com' // Id Client Google

const displayUser = document.getElementById('user')
const displayName = document.getElementById('name')
const btnLogin = document.getElementById('login')
const btnLogout = document.getElementById('logout')

let auth
let user

function initGAuth () {
  auth = gapi.auth2.getAuthInstance()
  auth.isSignedIn.listen(loginStatus)
  loginStatus()
}

function loginStatus () {
  const isSignedIn = auth.isSignedIn.get()
  if (isSignedIn) {

    user = auth.currentUser.get()

    const idToken = user.getAuthResponse().id_token

    const xhr = new XMLHttpRequest() //prépare une requête AJAX qu'on envoie vers Google.php qu'on a fait.
    xhr.onreadystatechange = function(){
      if (this.readyState===4) {
        console.log(this.response)
      }
    }
    xhr.open('POST', 'google.php', true)
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded") // type d'envoi = json
    xhr.send(`id_token=${idToken}`)

    displayUser.style.display = 'block'
    document.getElementById('name').
    textContent = user.getBasicProfile().getName()
    btnLogin.style.display = 'none'
    btnLogout.style.display = 'block'
  } else {
    user = null
    displayUser.style.display = 'none'
    btnLogin.style.display = 'block'
    btnLogout.style.display = 'none'
  }
  console.log(user)
}

function loginGoogle () {
  auth.signIn()
}

function logoutGoogle () {
  auth.signOut().then(() => {
    auth.disconnect()
    auth.isSignedIn.set(null)
    loginStatus()
  });
}

if (typeof gapi === 'object' && gapi.load) {
  gapi.load('client', () => {
    gapi.client.init({
      apiKey: apiKey,
      clientId: clientId,
      scope: 'profile',
    }).
    then(initGAuth)
  })
}
