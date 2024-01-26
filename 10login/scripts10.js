function validateLogin() {
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");

    var username = usernameInput.value;
    var password = passwordInput.value;

    // 아이디 또는 비밀번호가 비어있는지 확인
    if (username === "" || password === "") {
        // 경고 메시지 표시 및 빨간 테두리 추가
        alert("ID와 비밀번호를 모두 입력해주세요");
        if (username === "") {
            usernameInput.style.border = "1px solid red";
        } else {
            usernameInput.style.border = ""; // 테두리 초기화
        }
        if (password === "") {
            passwordInput.style.border = "1px solid red";
        } else {
            passwordInput.style.border = ""; // 테두리 초기화
        }
    } else {
        // 임의로 지정한 ID와 PW
        var correctUsername = "resatChallenge";
        var correctPassword = "12341234";

        if (username === correctUsername && password === correctPassword) {
            // 로그인 성공
            alert("로그인이 되었습니다");

            // 로그인이 성공하면 다음 화면으로 이동 
            window.location.href = "https://g00u.github.io/RESAT-Challenge/08slidehomepage/slidehomepage.html";
        } else {
            // 로그인 실패
            alert("ID 혹은 PW가 잘못되었습니다");
        }
    }
}
