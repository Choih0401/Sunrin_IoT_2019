// 로그 리뉴얼 함수
function logRenewal() {
    let path;
    let results;
    // let x;
    path = fetch("/api/log", {
        method: "get",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
    .then(function (response) {
        // x = JSON.parse(response);
        // return x.json();
        return response.json();
    })
    .then(function (myJSON) {
        // 요청 받는 값
        results = myJSON;
        alert(results.msg);
    });
    setTimeout(() => {
        logRenewal();
    }, 1000);
}

// 로그 리뉴얼 시작
setTimeout(() => {
    logRenewal();
}, 1000);




// 셀렉트박스 선택 시
let graphRoom = document.querySelector("#graph-room");
graphRoom.addEventListener("change", function () {
    // 그래프 바뀜
    document.querySelector("#admin-graph-board > .d-block").classList.remove("d-block");
    document.querySelector("#graph-room" + room.value).classList.add("d-block");
});




// 시간표 설정 클릭
const timetableButton = document.querySelector("#timetable-button");    // 시간표 버튼
let timetable = document.querySelector("#timetable");    // 시간표 창
let timetableBackground = document.querySelector("#timetable-background");     // 시간표 뒷배경
timetableButton.addEventListener("click", function () {
    timetable.classList.add("show");
    timetableBackground.classList.add("show");
});
// 시간표 바깥쪽 클릭
timetableBackground.addEventListener("click", function () {
    timetable.classList.remove("show");
    timetableBackground.classList.remove("show");
});


// ㅇ요일 ㅇ교시 클릭
let dowClss = document.querySelectorAll(".dow-cls");
let yoilTitle = document.querySelector("#yoil-title");
let gyosiTitle = document.querySelector("#gyosi-title");
let inputDataDayOfWeek = document.querySelector("#day-of-week");
let inputDataClass = document.querySelector("#class");

for (let dowCls of dowClss) {
    dowCls.addEventListener("click", function () {    // 시간표 설정 창 안의 [n교시]를 클릭했을 때
        let yoil = dowCls.id.charAt(0);
        let gyosi = dowCls.id.charAt(1);

        switch (yoil) {    // 요일 검사 및 행동
            case "1":
                yoilTitle.textContent = "월";
                break;
            case "2":
                yoilTitle.textContent = "화";
                break;
            case "3":
                yoilTitle.textContent = "수";
                break;
            case "4":
                yoilTitle.textContent = "목";
                break;
            case "5":
                yoilTitle.textContent = "금";
                break;
            default:
                yoilTitle.textContent = "오류";
                break;
        }
        inputDataDayOfWeek.value = yoil;

        gyosiTitle.textContent = gyosi;
        inputDataClass.value = gyosi;

        let yoilGyosiFiltered = pcRoomSchedule.filter(schedule => schedule.dow == yoil && schedule.cls == gyosi);    // 요일, 교시 필터
        for (let room = 1; room <= 18; room++) {
            let roomElement = document.querySelector("[name=room" + room + "]");
            for (let ban = 1; ban <= 3; ban++) {
                let banElement = roomElement.querySelector(`[value="1-${ban}"]`);

                let roomBanFiltered = yoilGyosiFiltered.filter(schedule => schedule.room == room && schedule.ban == "1-" + ban);

                if (roomBanFiltered.length == 1) {
                    banElement.selected = true;
                } else {
                    //
                }
            }
        }

    });
}


let pcRoomSchedule = [
    {
        dow: 1,     /* Day of week(☆요일)의 앞글자를 따서 dow임.
                     * dow: 1은 월요일, dow: 2는 화요일, dow: 5는 금요일.
                     * 1~5의 값만 들어감.
                     */

        cls: 1,     /* class(교시)를 줄여서 cls임.
                     * cls: 1은 1교시, cls: 2는 2교시, cls: 7은 7교시.
                     * 1~7의 값만 들어감.
                     */

        room: 1,    /* room(컴퓨터 ☆실)을 말함.
                     * room: 1은 컴퓨터 1실, room: 2는 컴퓨터 2실, room: 18은 컴퓨터 18실.
                     * 1~18의 값만 들어감.
                     */

        ban: "1-1"  /* HacknyeonBan(학년 반)을 줄여서 ban임.
                     * ban: "1-1"은 1학년 1반, ban: "1-2"은 1학년 2반, ban: "1-3"은 1학년 3반.
                     * 총 3개밖에 안들어감(1-1, 1-2, 1-3). 나머지는 금방 만들 수 있으나 쓸모없는 데이터가 커지므로 생략.
                     */
    },
    {
        dow: 1,    // 월요일의
        cls: 1,    // 1교시에
        room: 2,    // 컴퓨터 2실은
        ban: "1-2"    // 1학년 2반이 사용합니다. 라는 의미
    },
    {
        dow: 1,
        cls: 1,
        room: 3,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 1,
        room: 4,
        ban: "1-1"
    },
    {
        dow: 1,
        cls: 1,
        room: 5,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 1,
        room: 6,
        ban: "1-3"
    },
    // ...
    {
        dow: 5,
        cls: 7,
        room: 18,
        ban: "1-3"
    }
]
