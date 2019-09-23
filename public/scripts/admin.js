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
let yoil = document.querySelector("#yoil");
let gyosi = document.querySelector("#gyosi");
for (let dowCls of dowClss) {
    dowCls.addEventListener("click", function () {

        switch (dowCls.id.charAt(0)) {    // 요일검사
            case "1":
                yoil.textContent = "월";
                break;
            case "2":
                yoil.textContent = "화";
                break;
            case "3":
                yoil.textContent = "수";
                break;
            case "4":
                yoil.textContent = "목";
                break;
            case "5":
                yoil.textContent = "금";
                break;
            default:
                yoil.textContent = "오류";
                break;
        }
        
        gyosi.textContent = dowCls.id.charAt(1);
    });
}


let pcRoomSchedule = {
	dow1 : {
		cls1 : {
			room1: "1-1",
			room2: "1-1",
			room3: "1-1",
			room4: "정답",
			room5: "1-1",
			room6: "1-1",
			room7: "1-1",
			room8: "1-1",
			room9: "1-1",
			room10: "1-1",
			room11: "1-1",
			room12: "1-1",
			room13: "1-1",
			room14: "1-1",
			room15: "1-1",
			room16: "1-1",
			room17: "1-1",
			room18: "1-1",
		},
		cls2 : {
			room1: "1-1",
			room2: "1-1",
			room3: "1-1",
			room4: "1-1",
			room5: "1-1",
			room6: "1-1",
			room7: "1-1",
			room8: "1-1",
			room9: "1-1",
			room10: "1-1",
			room11: "1-1",
			room12: "1-1",
			room13: "1-1",
			room14: "1-1",
			room15: "1-1",
			room16: "1-1",
			room17: "1-1",
			room18: "1-1"
		},
		cls3 : {
			room1: "1-1",
			room2: "1-1",
			room3: "1-1",
			room4: "1-1",
			room5: "1-1",
			room6: "1-1",
			room7: "1-1",
			room8: "1-1",
			room9: "1-1",
			room10: "1-1",
			room11: "1-1",
			room12: "1-1",
			room13: "1-1",
			room14: "1-1",
			room15: "1-1",
			room16: "1-1",
			room17: "1-1",
			room18: "1-1"
		}
	},
	dow2 : {
		cls1 : {
			room1: "1-1",
			room2: "1-1",
			room3: "1-1",
			room4: "정답",
			room5: "1-1",
			room6: "1-1",
			room7: "1-1",
			room8: "1-1",
			room9: "1-1",
			room10: "1-1",
			room11: "1-1",
			room12: "1-1",
			room13: "1-1",
			room14: "1-1",
			room15: "1-1",
			room16: "1-1",
			room17: "1-1",
			room18: "1-1",
		},
		cls2 : {
			room1: "1-1",
			room2: "1-1",
			room3: "1-1",
			room4: "1-1",
			room5: "1-1",
			room6: "1-1",
			room7: "1-1",
			room8: "1-1",
			room9: "1-1",
			room10: "1-1",
			room11: "1-1",
			room12: "1-1",
			room13: "1-1",
			room14: "1-1",
			room15: "1-1",
			room16: "1-1",
			room17: "1-1",
			room18: "1-1"
		},
		cls3 : {
			room1: "1-1",
			room2: "1-1",
			room3: "1-1",
			room4: "1-1",
			room5: "1-1",
			room6: "1-1",
			room7: "1-1",
			room8: "1-1",
			room9: "1-1",
			room10: "1-1",
			room11: "1-1",
			room12: "1-1",
			room13: "1-1",
			room14: "1-1",
			room15: "1-1",
			room16: "1-1",
			room17: "1-1",
			room18: "1-1"
		}
	},
	dow3 : {
		// ...
	},
	dow4 : {
		// ...
	},
	dow5 : {
		// ...
	}
}