const buttonRegister = document.getElementById("registerUserButton")
const buttonEnter = document.getElementById("enterUserButton")
const formRegister = document.getElementById("formRegister")
const formEnter = document.getElementById("formEnter")
const modalRegister = document.getElementById("registerModal")
const spinnerDiv = document.getElementById("spinnerDiv")


modalRegister.addEventListener('hidden.bs.modal', (event) => {
    formRegister.reset()
})

const register = () => {

    spinnerDiv.classList.remove("visually-hidden")

    let email = document.getElementById("registerInputEmail").value
    let password = document.getElementById("registerInputPassword").value

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            let modal = bootstrap.Modal.getInstance(modalRegister)
            modal.hide()
            verify()
            spinnerDiv.classList.add("visually-hidden")

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode + errorMessage)
            spinnerDiv.classList.add("visually-hidden")
        });

    formRegister.reset()
}


const enter = () => {
    let enterEmail = document.getElementById("enterInputEmail").value
    let enterPassword = document.getElementById("enterInputPassword").value


    firebase.auth().signInWithEmailAndPassword(enterEmail, enterPassword)
        .then(
            formEnter.reset()
        )
        .catch((error) => {
            var enterErrorCode = error.code;
            var enterErrorMessage = error.message;
            alert(enterErrorMessage)
        });
}


const viewer = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("Existe usuario activo")

            appear(user.emailVerified);


            console.log(user)
                // var uid = user.uid;
        } else {
            console.log("No existe usuario activo")
            disappear()
        }
    });
}
viewer();

const appear = (emailVerified) => {
    if (emailVerified) {
        let contentMsg = document.getElementById("content-msg")
        contentMsg.classList.remove("hidden")
    }

    let contentSignOff = document.getElementById("content-signoff")
    contentSignOff.classList.remove("hidden")
}

const disappear = () => {
    let contentMsg = document.getElementById("content-msg")
    let contentSignOff = document.getElementById("content-signoff")

    contentMsg.classList.add("hidden")
    contentSignOff.classList.add("hidden")

}

const signOff = () => {
    firebase.auth().signOut()
        .then(() => console.log("Saliendo..."))
        .catch((error) => alert(error))
}

const verify = () => {
    var user = firebase.auth().currentUser;
    console.log(user)

    user.sendEmailVerification()
        .then(() => infoVerified())
        .catch((error) => {
            alert(error)
        });
}

const infoVerified = () => {
    let verifiedDiv = document.getElementById("verifiedNotification")
    let message = `
        <strong>Hey!</strong> We have sent you a verification email, please check your mailbox.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `
    verifiedDiv.classList.add("alert-warning")
    verifiedDiv.innerHTML = message;

    setTimeout(() => {
        var bsAlert = new bootstrap.Alert(document.getElementById("verifiedNotification"))
        bsAlert.close()
    }, 3000)
}


let buttonSignOff = document.getElementById("buttonSignOff")
buttonSignOff.addEventListener("click", signOff)
buttonRegister.addEventListener("click", register)
buttonEnter.addEventListener("click", enter)






// User is signed in, see docs for a list of available properties
// https://firebase.google.com/docs/reference/js/firebase.User