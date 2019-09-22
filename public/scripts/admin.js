// 로그 리뉴얼 함수
function logRenewal() {
    let path;
    let results;
    path = fetch("/api/logs/", {    // 요청 보낼 주소 값 넣어야함
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
            // 요청 보내는 곳
            "asdf": "요청"
        })
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (myJSON) {
        // 요청 받는 값
        results = myJSON;
        
    });
    setTimeout(() => {
        logRenewal();
    }, 1000);
}

// 로그 리뉴얼 시작
setTimeout(() => {
    // logRenewal();
}, 1000);




// 셀렉트박스 선택 시
let room = document.querySelector("#segyero-room");
room.addEventListener("change", function () {
    // 그래프 바뀜
    document.querySelector("#admin-graph-board > .d-block").classList.remove("d-block");
    document.querySelector("#room-" + room.value).classList.add("d-block");
})




// 시간표 설정 클릭
let timetableButton = document.querySelector("#timetable-button");
let timetable = document.querySelector("#timetable");
let timetableBackground = document.querySelector("#timetable-background");
timetableButton.addEventListener("click", function () {
    timetable.classList.add("show");
    timetableBackground.classList.add("show");
})
// 시간표 바깥쪽 클릭
timetableBackground.addEventListener("click", function () {
    timetable.classList.remove("show");
    timetableBackground.classList.remove("show");
})