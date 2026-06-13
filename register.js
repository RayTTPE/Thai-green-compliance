document.addEventListener("DOMContentLoaded", () => {

    const form =
    document.getElementById("registerForm");

    const registerBtn =
    form.querySelector("button[type='submit']");

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const fullname =
        document.getElementById("fullname")
        .value
        .trim();

        const email =
        document.getElementById("email")
        .value
        .trim()
        .toLowerCase();

        const password =
        document.getElementById("password")
        .value;

        const confirmPassword =
        document.getElementById("confirm-password")
        .value;

        if(!fullname || !email || !password || !confirmPassword){

            Swal.fire({
                icon:"warning",
                title:"กรอกข้อมูลไม่ครบ",
                text:"กรุณากรอกชื่อ อีเมล และรหัสผ่านให้ครบ"
            });

            return;

        }

        if(password.length < 6){

            Swal.fire({
                icon:"warning",
                title:"รหัสผ่านสั้นเกินไป",
                text:"กรุณาใช้รหัสผ่านอย่างน้อย 6 ตัวอักษร"
            });

            return;

        }

        if(password !== confirmPassword){

            Swal.fire({
                icon:"warning",
                title:"รหัสผ่านไม่ตรงกัน",
                text:"กรุณายืนยันรหัสผ่านให้ตรงกัน"
            });

            return;

        }

        try{

            registerBtn.disabled = true;
            registerBtn.textContent = "กำลังสมัคร...";

            const { data, error } =
            await supabaseClient.auth.signUp({

                email:email,
                password:password,

                options:{
                    data:{
                        fullname:fullname
                    }
                }

            });

            if(error){

                let message =
                error.message;

                if(
                    message.toLowerCase().includes("email rate limit") ||
                    message.toLowerCase().includes("rate limit")
                ){

                    message =
                    "ระบบส่งอีเมลยืนยันของ Supabase เกินลิมิตแล้ว กรุณารอสักพักแล้วลองใหม่ หรือปิด Confirm email ชั่วคราวตอนทดสอบ";

                }

                Swal.fire({
                    icon:"error",
                    title:"สมัครสมาชิกไม่สำเร็จ",
                    text:message
                });

                return;

            }

            Swal.fire({
                icon:"success",
                title:"สมัครสมาชิกสำเร็จ",
                text:"กรุณาตรวจสอบอีเมลก่อนเข้าสู่ระบบ",
                confirmButtonText:"ไปหน้าร้านค้า"
            }).then(() => {

                window.location.href =
                "shop.html";

            });

        }
        catch(err){

            Swal.fire({
                icon:"error",
                title:"System Error",
                text:err.message
            });

        }
        finally{

            registerBtn.disabled = false;
            registerBtn.textContent = "Register";

        }

    });

});
