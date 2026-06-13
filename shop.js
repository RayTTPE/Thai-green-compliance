/* =========================
   PRODUCT DATA
========================= */

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const products = [
    {
        id:1,
        name:"White Widow",
        price:300,
        image:"รูป/product1.jpg",
        category:"cultivar",
        badge:"Best Seller",
        description:"Premium medical agriculture cultivar for controlled greenhouse workflow.",
        spec:"Indoor • Controlled Batch"
    },
    {
        id:2,
        name:"Gorilla Glue",
        price:200,
        image:"รูป/product2.jpg",
        category:"cultivar",
        badge:"Premium",
        description:"Selected cultivar slot for professional cultivation catalog presentation.",
        spec:"Greenhouse • Stable Lot"
    },
    {
        id:3,
        name:"Mac",
        price:300,
        image:"รูป/product3.jpg",
        category:"cultivar",
        badge:"Top Grade",
        description:"High-value product profile with clean store-ready product information.",
        spec:"Batch Ready • QA Check"
    },
    {
        id:4,
        name:"Greenhouse Kit 04",
        price:0.01,
        image:"รูป/product4.jpg",
        category:"greenhouse",
        badge:"Demo",
        description:"Professional greenhouse product slot for future equipment listing.",
        spec:"Structure • Farm Setup"
    },
    {
        id:5,
        name:"Climate Module 05",
        price:0.01,
        image:"รูป/product5.jpg",
        category:"greenhouse",
        badge:"Smart Farm",
        description:"Slot for temperature, humidity, airflow or sensor-control equipment.",
        spec:"IoT Ready • Control"
    },
    {
        id:6,
        name:"Growlink System 06",
        price:0.01,
        image:"รูป/product6.jpg",
        category:"greenhouse",
        badge:"Automation",
        description:"Automation-ready product slot for greenhouse control systems.",
        spec:"Mobile Control • API"
    },
    {
        id:7,
        name:"Nutrient Formula 07",
        price:0.01,
        image:"รูป/product7.jpg",
        category:"nutrient",
        badge:"Nutrient",
        description:"Agricultural nutrient product slot with clean quantity ordering.",
        spec:"Formula • Growth Support"
    },
    {
        id:8,
        name:"Root Care 08",
        price:0.01,
        image:"รูป/product8.jpg",
        category:"nutrient",
        badge:"Care",
        description:"Product slot for root-care, soil-care or hydroponic supply.",
        spec:"Root Zone • Support"
    },
    {
        id:9,
        name:"Bloom Support 09",
        price:0.01,
        image:"รูป/product9.jpg",
        category:"nutrient",
        badge:"Growth",
        description:"Future listing for bloom-stage agricultural supply products.",
        spec:"Bloom • Monitoring"
    },
    {
        id:10,
        name:"Compliance Pack 10",
        price:0.01,
        image:"รูป/product10.jpg",
        category:"compliance",
        badge:"GACP",
        description:"Documentation and compliance product slot for professional workflows.",
        spec:"Docs • Traceability"
    },
    {
        id:11,
        name:"QA Record Kit 11",
        price:0.01,
        image:"รูป/product11.jpg",
        category:"compliance",
        badge:"QA",
        description:"Quality assurance slot for inspection, record and traceability products.",
        spec:"QA • Audit Trail"
    },
    {
        id:12,
        name:"Storage Control 12",
        price:0.01,
        image:"รูป/product12.jpg",
        category:"compliance",
        badge:"Storage",
        description:"Controlled storage listing for post-harvest handling support.",
        spec:"Storage • Logistics"
    },
    {
        id:13,
        name:"สินค้า 13",
        price:0.01,
        image:"รูป/product13.jpg",
        category:"cultivar",
        badge:"New",
        description:"Custom product slot ready for real product details.",
        spec:"Catalog Slot"
    },
    {
        id:14,
        name:"สินค้า 14",
        price:0.01,
        image:"รูป/product14.jpg",
        category:"greenhouse",
        badge:"New",
        description:"Custom agriculture equipment slot ready for production data.",
        spec:"Catalog Slot"
    },
    {
        id:15,
        name:"สินค้า 15",
        price:0.01,
        image:"รูป/product15.jpg",
        category:"nutrient",
        badge:"New",
        description:"Custom nutrient product slot ready for production details.",
        spec:"Catalog Slot"
    },
    {
        id:16,
        name:"สินค้า 16",
        price:0.01,
        image:"รูป/product16.jpg",
        category:"compliance",
        badge:"New",
        description:"Custom compliance product slot ready for future listing.",
        spec:"Catalog Slot"
    },
    {
        id:17,
        name:"สินค้า 17",
        price:0.01,
        image:"รูป/product17.jpg",
        category:"greenhouse",
        badge:"New",
        description:"Custom smart farm product slot for future expansion.",
        spec:"Catalog Slot"
    },
    {
        id:18,
        name:"สินค้า 18",
        price:0.01,
        image:"รูป/product18.jpg",
        category:"cultivar",
        badge:"New",
        description:"Custom product slot ready for real inventory information.",
        spec:"Catalog Slot"
    }
];

let activeCategory = "all";
let searchTerm = "";


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

const productSearch =
document.getElementById("productSearch");

const cartCount =
document.getElementById("cartCount");

const cartMiniCount =
document.getElementById("cartMiniCount");

const toast =
document.getElementById("toast");


/* =========================
   UTILS
========================= */

function escapeHTML(value){
    return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function formatPrice(value){
    const price = Number(value) || 0;

    if(price < 1){
        return price.toFixed(2);
    }

    return price.toLocaleString();
}

function notify(message,type = "success"){
    if(!toast){
        alert(message);
        return;
    }

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    clearTimeout(window.__toastTimer);

    window.__toastTimer = setTimeout(() => {
        toast.className = "toast";
    },2600);
}

function updateCartCount(){
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    const count = cart.reduce((sum,item) => {
        return sum + (Number(item.qty) || 0);
    },0);

    if(cartCount){
        cartCount.textContent = count;
    }

    if(cartMiniCount){
        cartMiniCount.textContent = count;
    }
}

function getFilteredProducts(){
    return products.filter(product => {
        const matchCategory =
        activeCategory === "all" || product.category === activeCategory;

        const keyword =
        `${product.name} ${product.category} ${product.description} ${product.spec}`
        .toLowerCase();

        const matchSearch =
        keyword.includes(searchTerm.toLowerCase());

        return matchCategory && matchSearch;
    });
}


/* =========================
   LOAD PRODUCTS
========================= */

function loadProducts(){

    const container =
    document.getElementById("products");

    const filteredProducts =
    getFilteredProducts();

    if(!container){
        return;
    }

    if(filteredProducts.length === 0){
        container.innerHTML = `
        <div class="empty-products">
            <span>🌱</span>
            <h3>ไม่พบสินค้าที่ค้นหา</h3>
            <p>ลองเปลี่ยนหมวดหมู่หรือคำค้นหาใหม่นะงับ</p>
        </div>
        `;
        return;
    }

    container.innerHTML = "";

    filteredProducts.forEach((product,index) => {

        container.innerHTML += `

        <article class="project-card reveal-product" style="--delay:${index * 55}ms">

            <div class="project-image">
                <img
                src="${escapeHTML(product.image)}"
                alt="${escapeHTML(product.name)}"
                onerror="this.closest('.project-image').classList.add('image-missing'); this.remove();">

                <div class="image-shade"></div>
                <span class="product-badge">${escapeHTML(product.badge)}</span>
            </div>

            <div class="project-info">

                <div class="product-topline">
                    <span class="product-category">${escapeHTML(product.category)}</span>
                    <span class="product-spec">${escapeHTML(product.spec)}</span>
                </div>

                <h3>${escapeHTML(product.name)}</h3>

                <p class="product-desc">
                    ${escapeHTML(product.description)}
                </p>

                <div class="price-row">
                    <span>ราคา</span>
                    <strong>${formatPrice(product.price)} บาท</strong>
                </div>

                <div class="buy-row">
                    <div class="qty-wrap">
                        <label for="qty-${product.id}">จำนวน</label>

                        <div class="qty-control">
                            <button type="button" onclick="stepQty(${product.id}, -1)">−</button>
                            <input
                            class="qty-input"
                            type="number"
                            id="qty-${product.id}"
                            value="1"
                            min="1">
                            <button type="button" onclick="stepQty(${product.id}, 1)">+</button>
                        </div>
                    </div>

                    <button
                    class="btn add-btn"
                    type="button"
                    onclick="addToCart(${product.id})">
                        เพิ่มลงตะกร้า
                    </button>
                </div>

            </div>

        </article>

        `;

    });

}


/* =========================
   QTY STEP
========================= */

function stepQty(productId,step){
    const qtyInput =
    document.getElementById("qty-" + productId);

    if(!qtyInput) return;

    const current =
    parseInt(qtyInput.value) || 1;

    qtyInput.value =
    Math.max(1,current + step);
}

window.stepQty = stepQty;


/* =========================
   ADD TO CART
========================= */

function addToCart(productId){

    const product =
    products.find(item => item.id === productId);

    if(!product){
        notify("ไม่พบสินค้า","error");
        return;
    }

    const qtyInput =
    document.getElementById("qty-" + productId);

    const qty =
    parseInt(qtyInput.value);

    if(!qty || qty < 1){
        notify("กรุณาใส่จำนวนสินค้าให้ถูกต้อง","error");
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
            image:product.image,
            qty:qty
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    notify(
        `${product.name} จำนวน ${qty} ชิ้น ถูกเพิ่มลงตะกร้าแล้ว`,
        "success"
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

        document.body.classList.add("is-logged-in");

    }else{

        loginForm.style.display =
        "flex";

        userBox.style.display =
        "none";

        userEmail.textContent =
        "";

        document.body.classList.remove("is-logged-in");

        const passwordInput =
        document.getElementById("loginPassword");

        if(passwordInput){
            passwordInput.value = "";
        }

    }

}


/* =========================
   LOGIN
========================= */

if(loginForm){
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
            notify("กรุณากรอก Email และ Password","error");
            return;
        }

        const submitBtn =
        loginForm.querySelector("button[type='submit']");

        submitBtn.disabled = true;
        submitBtn.textContent = "Logging in...";

        const { error } =
        await supabaseClient.auth.signInWithPassword({
            email:email,
            password:password
        });

        submitBtn.disabled = false;
        submitBtn.textContent = "Login";

        if(error){
            notify("Login ไม่สำเร็จ : " + error.message,"error");
            return;
        }

        notify("Login สำเร็จ","success");

        await updateAuthUI();

    });
}


/* =========================
   LOGOUT
========================= */

if(logoutBtn){
    logoutBtn.addEventListener("click", async () => {

        await supabaseClient.auth.signOut();

        notify("Logout สำเร็จ","success");

        await updateAuthUI();

    });
}


/* =========================
   AUTH STATE CHANGE
========================= */

if(typeof supabaseClient !== "undefined"){
    supabaseClient.auth.onAuthStateChange(() => {
        updateAuthUI();
    });
}


/* =========================
   MOBILE MENU
========================= */

if(menuToggle && navMenu){
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
        });
    });
}


/* =========================
   FILTER / SEARCH
========================= */

function setupFilters(){
    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");
            activeCategory = button.dataset.category || "all";
            loadProducts();
        });
    });

    if(productSearch){
        productSearch.addEventListener("input", () => {
            searchTerm = productSearch.value.trim();
            loadProducts();
        });
    }
}


/* =========================
   CONTACT POPUP
========================= */

function setupContactPopup(){

    const shopContactBtn =
    document.getElementById("shopContactBtn");

    const shopContactModal =
    document.getElementById("shopContactModal");

    const shopContactClose =
    document.getElementById("shopContactClose");

    const shopLineBtn =
    document.getElementById("shopLineBtn");

    const shopLineModal =
    document.getElementById("shopLineModal");

    const shopLineClose =
    document.getElementById("shopLineClose");

    function openModal(modal){
        if(!modal) return;

        modal.classList.add("show");
        modal.setAttribute("aria-hidden","false");
        document.body.style.overflow = "hidden";
    }

    function closeModal(modal){
        if(!modal) return;

        modal.classList.remove("show");
        modal.setAttribute("aria-hidden","true");
        document.body.style.overflow = "";
    }

    if(shopContactBtn){
        shopContactBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            navMenu.classList.remove("active");
            openModal(shopContactModal);
        });
    }

    if(shopContactClose){
        shopContactClose.addEventListener("click",()=>{
            closeModal(shopContactModal);
        });
    }

    if(shopLineBtn){
        shopLineBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            closeModal(shopContactModal);
            openModal(shopLineModal);
        });
    }

    if(shopLineClose){
        shopLineClose.addEventListener("click",()=>{
            closeModal(shopLineModal);
        });
    }

    [shopContactModal, shopLineModal].forEach(modal=>{
        if(!modal) return;

        modal.addEventListener("click",(e)=>{
            if(e.target === modal){
                closeModal(modal);
            }
        });
    });

    document.addEventListener("keydown",(e)=>{
        if(e.key === "Escape"){
            closeModal(shopContactModal);
            closeModal(shopLineModal);
        }
    });

}


/* =========================
   CURSOR GLOW
========================= */

function setupCursorGlow(){
    const cursorGlow =
    document.getElementById("cursorGlow");

    if(!cursorGlow){
        return;
    }

    window.addEventListener("pointermove",(e)=>{
        cursorGlow.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}


/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", async () => {

    loadProducts();
    setupFilters();
    setupContactPopup();
    setupCursorGlow();
    updateCartCount();

    await updateAuthUI();

});
