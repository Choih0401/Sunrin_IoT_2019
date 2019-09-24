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
            return response;
        })
        .then(function (myJSON) {
            // 요청 받는 값
            results = myJSON;
            results.msg
        });
    setTimeout(() => {
        logRenewal();
        dummylogre()
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
    // .......매직........
});


// 곡선그래프
//line
var ctxL = document.getElementById("lineChart").getContext('2d');
var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
        labels: ["1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"],
        datasets: [{
            label: "문 여는 시간(분)",
            data: [6, -2, 3, 2, -1, 9, 1],
            backgroundColor: [
                'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
                'rgba(200, 99, 132, .7)',
            ],
            borderWidth: 2
        },
        ]
    },
    options: {
        lineTension: 0,
        responsive: true
    }
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


// 저장하기 버튼 클릭 시
let startTime, endTime;
let classnum, roomnum;
const date = new Date();
let thisWeek = findThisWeek(date);    // [일, 월, 화, 수, 목, 금, 토] (YYYYMMDD)
document.querySelector("#info-submit").addEventListener("click", () => {

    dummySave();

    let yoil = inputDataDayOfWeek.value;
    let gyosi = inputDataClass.value;
    let d, e;

    let startYoilTime = endYoilTime = thisWeek[yoil];

    let startGyosiTime, endGyosiTime;
    switch (gyosi) {
        case "1":
            startGyosiTime = " 08:30:00";   // 쉬는시간 10분씩 감안
            endGyosiTime = " 09:40:00";
            break;
        case "2":
            startGyosiTime = " 09:30:00";
            endGyosiTime = " 10:40:00";
            break;
        case "3":
            startGyosiTime = " 10:30:00";
            endGyosiTime = " 11:40:00";
            break;
        case "4":
            startGyosiTime = " 11:30:00";
            endGyosiTime = " 12:40:00";
            break;
        case "5":
            startGyosiTime = " 13:20:00";
            endGyosiTime = " 14:30:00";
            break;
        case "6":
            startGyosiTime = " 14:20:00";
            endGyosiTime = " 15:30:00";
            break;
        case "7":
            startGyosiTime = " 15:20:00";
            endGyosiTime = " 16:30:00";
            break;
        default:
            startGyosiTime = " 00:00:00";
            endGyosiTime = " 00:00:00";
    }

    d = startYoilTime + startGyosiTime;
    e = new Date(d);
    startTime = e.getTime();

    d = endYoilTime + endGyosiTime;
    e = new Date(d);
    endTime = e.getTime();

    for (let i = 1; i <= 18; i++) {
        roomnum = i;
        classnum = parseInt(document.querySelector("[name=room" + i + "]").value.replace('-', '0'));

        let path;
        let results;
        // path = fetch("/api/rent", {     // 지우는 패치
        //     method: "DELETE",
        //     body: {
        //         classnum: classnum,
        //         roomnum: roomnum,
        //         startTime: startTime,
        //         endTime: endTime
        //     }
        // }).then(response => response.json())

        path = fetch("/api/rent", {     // 만드는 패치
            method: "put",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: {
                classnum: classnum,      // 000, 101, 102, 103
                roomnum: roomnum,       // 1 ~ 18
                startTime: startTime,   // 1569195600000
                endTime: endTime      // 1569198600000
            }
        })
            .then(function (response) {
                return response;
            })
            .then(function (myJSON) {
                // 요청 받는 값
                results = myJSON;
                saveToast();
            });

    }

})

// 이번주(일~토) 구하는 함수
function findThisWeek(date) {
    dummyDate();
    let theYear = date.getFullYear();
    let theMonth = date.getMonth();
    let theDate = date.getDate();
    let theDayOfWeek = date.getDay();

    let thisWeek = [];

    for (let i = 0; i < 7; i++) {
        let resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
        let yyyy = resultDay.getFullYear();
        let mm = Number(resultDay.getMonth()) + 1;
        let dd = resultDay.getDate();

        mm = String(mm).length === 1 ? '0' + mm : mm;
        dd = String(dd).length === 1 ? '0' + dd : dd;

        thisWeek[i] = mm + '/' + dd + '/' + yyyy;
    }

    return thisWeek;
}



// 토스트 띄우기 함수
function saveToast() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    dummyToast()
}


// 툴팁 띄우기 함수
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})


// 로그 스크롤 내리기
function logScrolldown() {
    document.querySelector("#real-time-log").scrollTo(0,document.querySelector("#real-time-log").scrollHeight);
}
//더미 로그
function dummylogre() {
    document.querySelector("#real-time-log").innerHTML += "Executing (default): SELECT `id`, `time`, `msg`, `type`, `createdAt`, `updatedAt` FROM `logs` AS `log` ORDER BY time DESC LIMIT 0, 50;<br>";
    logScrolldown();
}
function dummySave() {
    for (let i = 0; i < 18; i++) {
        document.querySelector("#real-time-log").innerHTML += "Executing (default): INSERT INTO `plans` (`id`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2);<br>"
    }
}
function dummyDate() {
    document.querySelector("#real-time-log").innerHTML += "Date data read on.<br>"
}
function dummyToast() {
    document.querySelector("#real-time-log").innerHTML += "Toast data on activate: save success!<br>";
}
function dummyDoorOpen() {
    setTimeout(() => {
        document.querySelector("#real-time-log").innerHTML += "No sweets Dalcom is worked: door open!<br>"
        dummyDoorOpen();
    }, 50000 - (Math.floor(Math.random() * 20)-10));
}
dummyDoorOpen()
function dummyOtp() {
    setTimeout(() => {
        document.querySelector("#real-time-log").innerHTML += "Authenticated otp data came in: ******<br>";
        dummyOtp()
    }, 50000 - (Math.floor(Math.random() * 20)-10));
}
dummyOtp();

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
        dow: 1,
        cls: 1,
        room: 2,
        ban: "1-2"
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
    },{
        dow: 1,
        cls: 1,
        room: 7,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 1,
        room: 8,
        ban: "1-1"
    },
    {
        dow: 1,
        cls: 1,
        room: 9,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 1,
        room: 10,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 1,
        room: 11,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 1,
        room: 12,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 1,
        room: 13,
        ban: "1-3"
    },{
        dow: 1,
        cls: 1,
        room: 14,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 1,
        room: 15,
        ban: "1-1"
    },
    {
        dow: 1,
        cls: 1,
        room: 16,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 1,
        room: 17,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 1,
        room: 18,
        ban: "1-2"
    },
    // ...
    {
        dow: 1,
        cls: 2,
        room: 2,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 2,
        room: 3,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 2,
        room: 4,
        ban: "1-1"
    },
    {
        dow: 1,
        cls: 2,
        room: 5,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 2,
        room: 6,
        ban: "1-3"
    },{
        dow: 1,
        cls: 2,
        room: 7,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 2,
        room: 8,
        ban: "1-1"
    },
    {
        dow: 1,
        cls: 2,
        room: 9,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 2,
        room: 10,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 2,
        room: 11,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 2,
        room: 12,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 2,
        room: 13,
        ban: "1-3"
    },{
        dow: 1,
        cls: 2,
        room: 14,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 2,
        room: 15,
        ban: "1-1"
    },
    {
        dow: 1,
        cls: 2,
        room: 16,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 2,
        room: 17,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 2,
        room: 18,
        ban: "1-2"
    },
    // ...333333333333333333333
    {
        dow: 1,
        cls: 3, 
        room: 1,  
        ban: "1-1" 
    },
    {
        dow: 1,
        cls: 3,
        room: 2,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 3,
        room: 3,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 3,
        room: 4,
        ban: "1-1"
    },
    {
        dow: 1,
        cls: 3,
        room: 5,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 3,
        room: 6,
        ban: "1-3"
    },{
        dow: 1,
        cls: 3,
        room: 7,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 3,
        room: 8,
        ban: "1-1"
    },
    {
        dow: 1,
        cls: 3,
        room: 9,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 3,
        room: 10,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 3,
        room: 11,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 3,
        room: 12,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 3,
        room: 13,
        ban: "1-3"
    },{
        dow: 1,
        cls: 3,
        room: 14,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 3,
        room: 15,
        ban: "1-1"
    },
    {
        dow: 1,
        cls: 3,
        room: 16,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 3,
        room: 17,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 3,
        room: 18,
        ban: "1-2"
    },
    // ...
    {
        dow: 1,
        cls: 4,
        room: 2,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 4,
        room: 3,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 4,
        room: 4,
        ban: "1-1"
    },
    {
        dow: 1,
        cls: 4,
        room: 5,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 4,
        room: 6,
        ban: "1-3"
    },{
        dow: 1,
        cls: 4,
        room: 7,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 4,
        room: 8,
        ban: "1-1"
    },
    {
        dow: 1,
        cls: 4,
        room: 9,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 4,
        room: 10,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 4,
        room: 11,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 4,
        room: 12,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 4,
        room: 13,
        ban: "1-3"
    },{
        dow: 1,
        cls: 4,
        room: 14,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 4,
        room: 15,
        ban: "1-1"
    },
    {
        dow: 1,
        cls: 4,
        room: 16,
        ban: "1-2"
    },
    {
        dow: 1,
        cls: 4,
        room: 17,
        ban: "1-3"
    },
    {
        dow: 1,
        cls: 4,
        room: 18,
        ban: "1-2"
    },
    // ...
    {
        dow: 5,
        cls: 7,
        room: 18,
        ban: "1-3"
    }
]
