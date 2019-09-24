document.querySelector("#otp-submit").addEventListener("click", () => {
    let path;
    let results;
    let otp = document.querySelector("#otp").value;
    setTimeout(() => {
        document.querySelector("#goHome").click();
    }, 1000);
    
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
            document.querySelector("#goHome").click();
        })
        .then(function (myJSON) {
            // 요청 받는 값
            results = myJSON;
            results.msg
            document.querySelector("#goHome").click();
        });
    
});