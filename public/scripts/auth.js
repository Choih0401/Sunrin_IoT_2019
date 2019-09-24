document.querySelector("#otp-submit").addEventListener("click", () => {
    let path;
    let results;
    let otp = document.querySelector("#otp").value;
    
    // let x;
    path = fetch("/api/rent", {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: {
            otp: otp
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
            results.msg
        });
});