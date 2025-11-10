let isLoginMode = true; // true = đăng nhập, false = đăng ký

function toggleMode() {
  const title = document.getElementById("form-title");
  const actionBtn = document.getElementById("actionBtn");
  const switchText = document.querySelector(".switch");
  const msg = document.getElementById("message");
  msg.textContent = "";
  msg.style.color = "red";

  if (isLoginMode) {
    title.textContent = "Tạo tài khoản";
    actionBtn.textContent = "Đăng ký";
    switchText.textContent = "Đã có tài khoản? Đăng nhập";
  } else {
    title.textContent = "Đăng nhập";
    actionBtn.textContent = "Đăng nhập";
    switchText.textContent = "Chưa có tài khoản? Tạo ngay";
  }

  isLoginMode = !isLoginMode;
}

function handleAction() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("message");

  if (!username || !password) {
    msg.textContent = "Vui lòng nhập đầy đủ thông tin!";
    return;
  }

  if (isLoginMode) {
    // Kiểm tra tài khoản admin mặc định
    if (username === "admin" && password === "123") {
      localStorage.setItem("loggedInUser", username);
      msg.style.color = "green";
      msg.textContent = "Đăng nhập thành công!";
      window.location.href = "index1.html"; // chuyển đến trang home
      return;
    }

    // Đăng nhập tài khoản đã lưu trong localStorage
    const savedPass = localStorage.getItem("user_" + username);
    if (savedPass && savedPass === password) {
      localStorage.setItem("loggedInUser", username);
      msg.style.color = "green";
      msg.textContent = "Đăng nhập thành công!";
      window.location.href = "index1.html";
    } else {
      msg.style.color = "red";
      msg.textContent = "Sai tài khoản hoặc mật khẩu!";
    }
  } else {
    // Tạo tài khoản mới
    if (localStorage.getItem("user_" + username)) {
      msg.textContent = "Tên tài khoản đã tồn tại!";
    } else {
      localStorage.setItem("user_" + username, password);
      msg.style.color = "green";
      msg.textContent = "Đăng ký thành công! Hãy đăng nhập.";
      toggleMode(); // tự chuyển về chế độ đăng nhập
    }
  }
}
