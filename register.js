document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
        document.getElementById("email").value.trim();

        const password =
        document.getElementById("password").value;

        try {

            const { data, error } =
            await supabaseClient.auth.signUp({

                email: email,
                password: password

            });

            if (error) {

                Swal.fire({
                    icon: "error",
                    title: "สมัครสมาชิกไม่สำเร็จ",
                    text: error.message
                });

                return;
            }

            Swal.fire({
                icon: "success",
                title: "สมัครสมาชิกสำเร็จ",
                text: "กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี"
            });

        }
        catch (err) {

            Swal.fire({
                icon: "error",
                title: "System Error",
                text: err.message
            });

        }

    });

});
