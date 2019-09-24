let rooms = document.querySelectorAll(".room");    // 컴퓨터실
let btnOpens = document.querySelectorAll(".btn-open");    // 열기 버튼
let segyero = document.querySelector("#segyero");    // 세계로

// 컴퓨터실 객체 클릭
for (let room of rooms) {
    room.addEventListener("click", function () {
        if (room.classList.contains("open")) {
            room.classList.remove("open");
        } else {
            room.classList.add("open");
        }
    })
}

// 열림 버튼 클릭 시
for (let btnOpen of btnOpens) {
    btnOpen.addEventListener("click", function () {
        
    })
}


// 세계로 클릭 시
segyero.addEventListener("click", function () {

})

document.querySelector("#segyero-submit").addEventListener("click", () => {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
})



