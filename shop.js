/* =========================
   PRODUCT DATA
========================= */

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const products = [
    {
        id:1,
        name:"White widow",
        price:300,
        image:"รูป/product1.jpg"
    },
    {
        id:2,
        name:"Gorilla Glue",
        price:200,
        image:"รูป/product2.jpg"
    },
    {
        id:3,
        name:"Mac",
        price:300,
        image:"รูป/product3.jpg"
    },
    {
        id:4,
        name:"สินค้า 4",
        price:0.01,
        image:"รูป/product4.jpg"
    },
    {
        id:5,
        name:"สินค้า 5",
        price:0.01,
        image:"รูป/product5.jpg"
    },
    {
        id:6,
        name:"สินค้า 6",
        price:0.01,
        image:"รูป/product6.jpg"
    },
    {
        id:7,
        name:"สินค้า 7",
        price:0.01,
        image:"รูป/product7.jpg"
    },
    {
        id:8,
        name:"สินค้า 8",
        price:0.01,
        image:"รูป/product8.jpg"
    },
    {
        id:9,
        name:"สินค้า 9",
        price:0.01,
        image:"รูป/product9.jpg"
    },
    {
        id:10,
        name:"สินค้า 10",
        price:0.01,
        image:"รูป/product10.jpg"
    },
    {
        id:11,
        name:"สินค้า 11",
        price:0.01,
        image:"รูป/product11.jpg"
    },
    {
        id:12,
        name:"สินค้า 12",
        price:0.01,
        image:"รูป/product12.jpg"
    },
    {
        id:13,
        name:"สินค้า 13",
        price:0.01,
        image:"รูป/product13.jpg"
    },
    {
        id:14,
        name:"สินค้า 14",
        price:0.01,
        image:"รูป/product14.jpg"
    },
    {
        id:15,
        name:"สินค้า 15",
        price:0.01,
        image:"รูป/product15.jpg"
    },
    {
        id:16,
        name:"สินค้า 16",
        price:0.01,
        image:"รูป/product16.jpg"
    },
    {
        id:17,
        name:"สินค้า 17",
        price:0.01,
        image:"รูป/product17.jpg"
    },
    {
        id:18,
        name:"สินค้า 18",
        price:0.01,
        image:"รูป/product18.jpg"
    }
];


/* =========================
   DOM
========================= */

const loginForm =
document.getElementById("loginForm");

const userBox =
document.getElementById("userBox");

const userEmail =
document.getElementById("userEmail");

const logoutBtn =
document.getElementById("logoutBtn");

const menuToggle =
document.getElementById("menuToggle");

const navMenu =
document.getElementById("navMenu");


/* =========================
   LOAD PRODUCTS
========================= */

function loadProducts(){

    const container =
    document.getElementById("products");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `

        <div class="project-card">

            <div class="project-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="project-info">

                <h3>${product.name}</h3>

                <p>
                    ราคา :
                    <strong>${product.price}</strong>
                    บาท
                </p>

                <label>
                    จำนวน
                </label>

                <br>

                <input
                    class="qty-input"
                    type="number"
                    id="qty-${product.id}"
                    value="1"
                    min="1"
                >

                <br>

                <button
                    class="btn"
                    type="button"
                    onclick="addToCart(${product.id})"
                >
                    เพิ่มลงตะกร้า
                </button>

            </div>

        </div>

        `;

    });

}


/* =========================
   ADD TO CART
   ทุกคนกดสินค้าได้ ไม่ต้อง Login
========================= */

function addToCart(productId){

    const product =
    products.find(item => item.id === productId);

    if(!product){
        alert("ไม่พบสินค้า");
        return;
    }

    const qtyInput =
    document.getElementById("qty-" + productId);

    const qty =
    parseInt(qtyInput.value);

    if(!qty || qty < 1){
        alert("กรุณาใส่จำนวนสินค้าให้ถูกต้อง");
        qtyInput.value = 1;
        return;
    }

    cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const existing =
    cart.find(item => item.id === productId);

    if(existing){

        existing.qty += qty;

    }else{

        cart.push({
            id:product.id,
            name:product.name,
            price:product.price,
            qty:qty
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(
        product.name +
        " จำนวน " +
        qty +
        " ชิ้น ถูกเพิ่มลงตะกร้าแล้ว"
    );

}

window.addToCart = addToCart;


/* =========================
   AUTH UI
========================= */

async function updateAuthUI(){

    if(typeof supabaseClient === "undefined"){
        console.error("ไม่พบ supabaseClient ตรวจสอบไฟล์ supabase.js");
        return;
    }

    const {
        data:{ user },
        error
    } =
    await supabaseClient.auth.getUser();

    if(error){
        console.error(error);
    }

    if(user){

        loginForm.style.display =
        "none";

        userBox.style.display =
        "flex";

        userEmail.textContent =
        user.email;

    }else{

        loginForm.style.display =
        "flex";

        userBox.style.display =
        "none";

        userEmail.textContent =
        "";

        document.getElementById("loginPassword").value =
        "";

    }

}


/* =========================
   LOGIN
========================= */

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
    document.getElementById("loginEmail")
    .value
    .trim();

    const password =
    document.getElementById("loginPassword")
    .value;

    if(!email || !password){

        alert("กรุณากรอก Email และ Password");

        return;

    }

    const {
        error
    } =
    await supabaseClient.auth.signInWithPassword({
        email:email,
        password:password
    });

    if(error){

        alert(
            "Login ไม่สำเร็จ : " +
            error.message
        );

        return;

    }

    alert("Login สำเร็จ");

    await updateAuthUI();

});


/* =========================
   LOGOUT
========================= */

logoutBtn.addEventListener("click", async () => {

    await supabaseClient.auth.signOut();

    alert("Logout สำเร็จ");

    await updateAuthUI();

});


/* =========================
   AUTH STATE CHANGE
========================= */

supabaseClient.auth.onAuthStateChange(() => {
    updateAuthUI();
});


/* =========================
   MOBILE MENU
========================= */

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", async () => {

    loadProducts();

    await updateAuthUI();

});
