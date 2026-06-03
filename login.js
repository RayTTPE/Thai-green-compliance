console.log("login.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM Loaded");

    const form = document.getElementById("loginForm");

    console.log("Form =", form);

    if (!form) {
        console.error("ไม่พบ form id='loginForm'");
        return;
    }

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        console.log("Submit Clicked");

        const email =
        document.getElementById("username").value.trim();

        const password =
        document.getElementById("password").value;

        console.log("Email =", email);

        try {

            console.log("Sending Login...");

            const { data, error } =
            await supabaseClient.auth.signInWithPassword({

                email: email,
                password: password

            });

            console.log("Response =", data);
            console.log("Error =", error);

            if (error) {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: error.message
                });

                return;
            }

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Login Successful"
            }).then(() => {

                window.location.href = "shop.html";

            });

        }
        catch (err) {

            console.error(err);

            Swal.fire({
                icon: "error",
                title: "System Error",
                text: err.message
            });

        }

    });

});
