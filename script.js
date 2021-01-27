let buttonRegister = document.getElementById("registerUserButton")
let buttonEnter = document.getElementById("enterUserButton")
let formRegister = document.getElementById("formRegister")


const register = () => {
    let email = document.getElementById("registerInputEmail").value
    let password = document.getElementById("registerInputPassword").value

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            verify()
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode + errorMessage)
        });

    formRegister.reset()
}


const enter = () => {
    let enterEmail = document.getElementById("enterInputEmail").value
    let enterPassword = document.getElementById("enterInputPassword").value


    firebase.auth().signInWithEmailAndPassword(enterEmail, enterPassword)

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


            // console.log(user)
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
        .then(function() {
            //  info de que se ha enviado un correo
            console.log("Enviando correo...")
        }).catch(function(error) {
            alert(error)
        });
}


let buttonSignOff = document.getElementById("buttonSignOff")
buttonSignOff.addEventListener("click", signOff)
buttonRegister.addEventListener("click", register)
buttonEnter.addEventListener("click", enter)




// Que los inputs se limpien luego de que ingrese.




// User is signed in, see docs for a list of available properties
// https://firebase.google.com/docs/reference/js/firebase.User