// 비밀번호 확인
document.querySelector("#user-confirm-password").addEventListener("focusout", function () {
    if (document.querySelector("#user-password").value != document.querySelector("#user-confirm-password").value) {
        document.querySelector("#user-confirm-password").classList.add("shake");
        // document.querySelector("#user-confirm-password").focus();
        function inconsistencyToast() {
            var x = document.querySelector("#inconsistency-toast");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }
        inconsistencyToast();
        setTimeout(function () {
            document.querySelector("#user-confirm-password").classList.remove("shake");
        }, 1000);
    }
})


document.querySelector("#user-confirm-password").addEventListener("keyup", function () {
    if (document.querySelector("#user-password").value == document.querySelector("#user-confirm-password").value) {
        document.querySelector('#register-submit').disabled = false;
    } else {
        document.querySelector('#register-submit').disabled = true;
    }
});