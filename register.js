document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const registerBtn = document.getElementById("registerBtn");
  const btnText = registerBtn?.querySelector(".btn-text");

  const fullnameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  if (!form) return;

  const showAlert = (icon, title, text) => {
    Swal.fire({
      icon,
      title,
      text,
      confirmButtonColor: "#2e7d32",
      background: "#fbfff9",
      color: "#173326"
    });
  };

  const setLoading = (isLoading) => {
    if (!registerBtn) return;

    registerBtn.disabled = isLoading;
    registerBtn.classList.toggle("loading", isLoading);

    if (btnText) {
      btnText.textContent = isLoading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก";
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!fullname || !email || !password || !confirmPassword) {
      showAlert("warning", "กรอกข้อมูลไม่ครบ", "กรุณากรอกชื่อ อีเมล รหัสผ่าน และยืนยันรหัสผ่านให้ครบถ้วน");
      return;
    }

    if (!isValidEmail(email)) {
      showAlert("warning", "รูปแบบอีเมลไม่ถูกต้อง", "กรุณาตรวจสอบอีเมลอีกครั้ง เช่น example@email.com");
      return;
    }

    if (password.length < 6) {
      showAlert("warning", "รหัสผ่านสั้นเกินไป", "กรุณาตั้งรหัสผ่านอย่างน้อย 6 ตัวอักษร");
      return;
    }

    if (password !== confirmPassword) {
      showAlert("error", "รหัสผ่านไม่ตรงกัน", "กรุณากรอกรหัสผ่านและยืนยันรหัสผ่านให้ตรงกัน");
      return;
    }

    if (typeof supabaseClient === "undefined") {
      showAlert("error", "ไม่พบการเชื่อมต่อ Supabase", "กรุณาตรวจสอบไฟล์ supabase.js ว่าเชื่อมต่อถูกต้องแล้ว");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullname
          }
        }
      });

      if (error) {
        showAlert("error", "สมัครสมาชิกไม่สำเร็จ", error.message);
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ",
        text: "กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี แล้วกลับมาเข้าสู่ระบบอีกครั้ง",
        confirmButtonColor: "#2e7d32",
        background: "#fbfff9",
        color: "#173326"
      });

      form.reset();
      window.location.href = "shop.html";
    }
    catch (err) {
      showAlert("error", "System Error", err.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
    finally {
      setLoading(false);
    }
  });
});
