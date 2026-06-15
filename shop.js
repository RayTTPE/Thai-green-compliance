/* =========================
   PRODUCT DATA
========================= */

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

console.log("TGC shop.js stock guard final loaded");

const products = [
    {
        id:1,
        name:"White Widow",
        price:300,
        image:"รูป/product1.jpg",
        category:"sativa",
        badge:"Best Seller",
        description:"Premium medical agriculture sativa for controlled hybrid workflow.",
        spec:"Indoor • Controlled Batch",
        stock:45
    },
    {
        id:2,
        name:"Gorilla Glue",
        price:200,
        image:"รูป/product2.jpg",
        category:"sativa",
        badge:"Premium",
        description:"Selected sativa slot for professional cultivation catalog presentation.",
        spec:"Greenhouse • Stable Lot",
        stock:38
    },
    {
        id:3,
        name:"Mac",
        price:300,
        image:"รูป/product3.jpg",
        category:"sativa",
        badge:"Top Grade",
        description:"High-value product profile with clean store-ready product information.",
        spec:"Batch Ready • QA Check",
        stock:32
    },
    {
        id:4,
        name:"Greenhouse Kit 04",
        price:0.01,
        image:"รูป/product4.jpg",
        category:"greenhouse",
        badge:"Demo",
        description:"Professional greenhouse product slot for future equipment listing.",
        spec:"Structure • Farm Setup",
        stock:12
    },
    {
        id:5,
        name:"Climate Module 05",
        price:0.01,
        image:"รูป/product5.jpg",
        category:"greenhouse",
        badge:"Smart Farm",
        description:"Slot for temperature, humidity, airflow or sensor-control equipment.",
        spec:"IoT Ready • Control",
        stock:9
    },
    {
        id:6,
        name:"Growlink System 06",
        price:0.01,
        image:"รูป/product6.jpg",
        category:"hybrid",
        badge:"Automation",
        description:"Automation-ready product slot for hybrid control systems.",
        spec:"Mobile Control • API",
        stock:7
    },
    {
        id:7,
        name:"Nutrient Formula 07",
        price:0.01,
        image:"รูป/product7.jpg",
        category:"hybrid",
        badge:"hybrid",
        description:"Agricultural hybrid product slot with clean quantity ordering.",
        spec:"Formula • Growth Support",
        stock:120
    },
    {
        id:8,
        name:"Root Care 08",
        price:0.01,
        image:"รูป/product8.jpg",
        category:"hybrid",
        badge:"Care",
        description:"Product slot for root-care, soil-care or hydroponic supply.",
        spec:"Root Zone • Support",
        stock:80
    },
    {
        id:9,
        name:"Bloom Support 09",
        price:0.01,
        image:"รูป/product9.jpg",
        category:"sativa",
        badge:"Growth",
        description:"Future listing for bloom-stage agricultural supply products.",
        spec:"Bloom • Monitoring",
        stock:95
    },
    {
        id:10,
        name:"Compliance Pack 10",
        price:0.01,
        image:"รูป/product10.jpg",
        category:"indica",
        badge:"GACP",
        description:"Documentation and indica product slot for professional workflows.",
        spec:"Docs • Traceability",
        stock:18
    },
    {
        id:11,
        name:"QA Record Kit 11",
        price:0.01,
        image:"รูป/product11.jpg",
        category:"indica",
        badge:"QA",
        description:"Quality assurance slot for inspection, record and traceability products.",
        spec:"QA • Audit Trail",
        stock:22
    },
    {
        id:12,
        name:"Storage Control 12",
        price:0.01,
        image:"รูป/product12.jpg",
        category:"indica",
        badge:"Storage",
        description:"Controlled storage listing for post-harvest handling support.",
        spec:"Storage • Logistics",
        stock:16
    },
    {
        id:13,
        name:"สินค้า 13",
        price:0.01,
        image:"รูป/product13.jpg",
        category:"sativa",
        badge:"New",
        description:"Custom product slot ready for real product details.",
        spec:"Catalog Slot",
        stock:30
    },
    {
        id:14,
        name:"สินค้า 14",
        price:0.01,
        image:"รูป/product14.jpg",
        category:"hybrid",
        badge:"New",
        description:"Custom agriculture equipment slot ready for production data.",
        spec:"Catalog Slot",
        stock:11
    },
    {
        id:15,
        name:"สินค้า 15",
        price:0.01,
        image:"รูป/product15.jpg",
        category:"hybrid",
        badge:"New",
        description:"Custom hybrid product slot ready for production details.",
        spec:"Catalog Slot",
        stock:70
    },
    {
        id:16,
        name:"สินค้า 16",
        price:0.01,
        image:"รูป/product16.jpg",
        category:"indica",
        badge:"New",
        description:"Custom indica product slot ready for future listing.",
        spec:"Catalog Slot",
        stock:15
    },
    {
        id:17,
        name:"สินค้า 17",
        price:0.01,
        image:"รูป/product17.jpg",
        category:"hybrid",
        badge:"New",
        description:"Custom smart farm product slot for future expansion.",
        spec:"Catalog Slot",
        stock:8
    },
    {
        id:18,
        name:"สินค้า 18",
        price:0.01,
        image:"รูป/product18.jpg",
        category:"sativa",
        badge:"New",
        description:"Custom product slot ready for real inventory information.",
        spec:"Catalog Slot",
        stock:26
    }
];

let activeCategory = "all";
let searchTerm = "";
let salesCache = [];
let dashboardLoaded = false;


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

const rankingList =
document.getElementById("rankingList");

const candleChart =
document.getElementById("candleChart");

const salesPieCanvas =
document.getElementById("salesPieChart");

const pieLegend =
document.getElementById("pieLegend");

const bestSellerCount =
document.getElementById("bestSellerCount");

const stockCapacityCount =
document.getElementById("stockCapacityCount");

const dashboardStatus =
document.getElementById("dashboardStatus");


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
    cart = normalizeCart(true);

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

function getSoldById(productId){
    const row = salesCache.find(item => Number(item.product_id) === Number(productId));
    return Number(row?.total_sold) || 0;
}

function normalizeCart(save = true){
    const rawCart = JSON.parse(localStorage.getItem("cart")) || [];
    const merged = [];

    rawCart.forEach(item => {
        const id = Number(item.id);
        const qty = Number(item.qty) || 0;

        if(!id || qty <= 0){
            return;
        }

        const product = products.find(productItem => Number(productItem.id) === id);

        if(!product){
            return;
        }

        const existing = merged.find(row => Number(row.id) === id);

        if(existing){
            existing.qty += qty;
            return;
        }

        merged.push({
            id:product.id,
            name:product.name,
            price:product.price,
            image:product.image,
            stock:product.stock,
            qty:qty
        });
    });

    const clamped = merged
    .map(item => {
        const stock = getStockLimit(item.id);
        const sold = getSoldById(item.id);
        const availableForCart = Math.max(0,stock - sold);

        return {
            ...item,
            qty:Math.min(Number(item.qty) || 0,availableForCart)
        };
    })
    .filter(item => Number(item.qty) > 0);

    if(save){
        localStorage.setItem("cart",JSON.stringify(clamped));
    }

    return clamped;
}

function getCartQtyById(productId){
    cart = normalizeCart(false);

    return cart.reduce((sum,item) => {
        if(Number(item.id) !== Number(productId)){
            return sum;
        }

        return sum + (Number(item.qty) || 0);
    },0);
}

function getStockLimit(productId){
    const product = products.find(item => Number(item.id) === Number(productId));
    return Number(product?.stock) || 0;
}

function getRemainingStock(productId){
    const stock = getStockLimit(productId);
    const sold = getSoldById(productId);
    const inCart = getCartQtyById(productId);

    return Math.max(0, stock - sold - inCart);
}

function getSalesRows(){
    return products.map(product => {
        const sold = getSoldById(product.id);
        const stock = Number(product.stock) || 0;
        const remaining = Math.max(0, stock - sold);
        const percent = stock > 0 ? Math.min(100, Math.round((sold / stock) * 100)) : 0;

        return {
            ...product,
            sold,
            stock,
            remaining,
            percent
        };
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

        const sold = getSoldById(product.id);
        const inCart = getCartQtyById(product.id);
        const stock = Number(product.stock) || 0;
        const remaining = Math.max(0, stock - sold - inCart);
        const usedPercent = stock > 0 ? Math.min(100, Math.round(((sold + inCart) / stock) * 100)) : 0;
        const isSoldOut = remaining <= 0;

        container.innerHTML += `

        <article class="project-card reveal-product ${isSoldOut ? "sold-out" : ""}" style="--delay:${index * 55}ms">

            <div class="project-image">
                <img
                src="${escapeHTML(product.image)}"
                alt="${escapeHTML(product.name)}"
                onerror="this.closest('.project-image').classList.add('image-missing'); this.remove();">

                <div class="image-shade"></div>
                <span class="product-badge">${isSoldOut ? "Out of Stock" : escapeHTML(product.badge)}</span>
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

                <div class="inventory-box">
                    <div class="inventory-row">
                        <span>ขายแล้ว ${sold.toLocaleString()} ชิ้น</span>
                        <strong>เหลือ ${remaining.toLocaleString()} / ${stock.toLocaleString()}</strong>
                    </div>
                    <div class="stock-meter" aria-label="stock meter">
                        <span style="width:${usedPercent}%"></span>
                    </div>
                </div>

                <div class="buy-row">
                    <div class="qty-wrap">
                        <label for="qty-${product.id}">จำนวน</label>

                        <div class="qty-control">
                            <button type="button" ${isSoldOut ? "disabled" : ""} onclick="stepQty(${product.id}, -1)">−</button>
                            <input
                            class="qty-input"
                            type="number"
                            id="qty-${product.id}"
                            value="${isSoldOut ? 0 : 1}"
                            min="${isSoldOut ? 0 : 1}"
                            max="${Math.max(0,remaining)}"
                            data-product-id="${product.id}"
                            oninput="clampQtyInput(${product.id}, this, true)"
                            onchange="clampQtyInput(${product.id}, this, true)"
                            ${isSoldOut ? "disabled" : ""}>
                            <button type="button" ${isSoldOut ? "disabled" : ""} onclick="stepQty(${product.id}, 1)">+</button>
                        </div>
                    </div>

                    <button
                    class="btn add-btn"
                    type="button"
                    ${isSoldOut ? "disabled" : ""}
                    onclick="addToCart(${product.id})">
                        ${isSoldOut ? "สินค้าหมด" : "เพิ่มลงตะกร้า"}
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

    if(!qtyInput || qtyInput.disabled) return;

    const product =
    products.find(item => Number(item.id) === Number(productId));

    if(!product) return;

    const max =
    getRemainingStock(productId);

    if(max <= 0){
        qtyInput.value = 0;
        notify(`${product.name} สินค้าหมดแล้ว`,"error");
        loadProducts();
        return;
    }

    const currentRaw = parseInt(qtyInput.value);
    const current = Number.isFinite(currentRaw) && currentRaw > 0 ? currentRaw : 1;
    const target = current + step;

    if(step > 0 && target > max){
        qtyInput.value = max;
        notify(`${product.name} เหลือให้เพิ่มได้อีก ${max.toLocaleString()} ชิ้น`,"error");
        shakeProductCard(productId);
        return;
    }

    if(step < 0 && target < 1){
        qtyInput.value = 1;
        notify(`จำนวนต่ำสุดคือ 1 ชิ้น`,"error");
        return;
    }

    qtyInput.value = Math.max(1,Math.min(max,target));
}

function clampQtyInput(productId,input,showNotify = false){
    if(!input || input.disabled) return;

    const product =
    products.find(item => Number(item.id) === Number(productId));

    if(!product) return;

    const max =
    getRemainingStock(productId);

    if(max <= 0){
        input.value = 0;
        if(showNotify){
            notify(`${product.name} สินค้าหมดแล้ว`,"error");
        }
        loadProducts();
        return;
    }

    if(input.value === ""){
        return;
    }

    let value = parseInt(input.value);

    if(!Number.isFinite(value) || value < 1){
        input.value = 1;
        if(showNotify){
            notify(`จำนวนต่ำสุดคือ 1 ชิ้น`,"error");
        }
        return;
    }

    if(value > max){
        input.value = max;
        if(showNotify){
            notify(`${product.name} เหลือให้เพิ่มได้อีก ${max.toLocaleString()} ชิ้น`,"error");
            shakeProductCard(productId);
        }
        return;
    }

    input.value = value;
}

function shakeProductCard(productId){
    const input = document.getElementById("qty-" + productId);
    const card = input ? input.closest(".project-card") : null;

    if(!card){
        return;
    }

    card.classList.remove("stock-warning");
    void card.offsetWidth;
    card.classList.add("stock-warning");

    setTimeout(() => {
        card.classList.remove("stock-warning");
    },520);
}

window.stepQty = stepQty;
window.clampQtyInput = clampQtyInput;


/* =========================
   ADD TO CART
========================= */

function addToCart(productId){

    const product =
    products.find(item => Number(item.id) === Number(productId));

    if(!product){
        notify("ไม่พบสินค้า","error");
        return;
    }

    const qtyInput =
    document.getElementById("qty-" + productId);

    if(!qtyInput || qtyInput.disabled){
        notify(`${product.name} สินค้าหมดแล้ว`,"error");
        loadProducts();
        return;
    }

    clampQtyInput(productId,qtyInput,false);

    const qty =
    parseInt(qtyInput.value);

    if(!qty || qty < 1){
        notify("กรุณาใส่จำนวนสินค้าให้ถูกต้อง","error");
        qtyInput.value = 1;
        return;
    }

    cart = normalizeCart(true);

    const stock = getStockLimit(productId);
    const sold = getSoldById(productId);
    const inCart = getCartQtyById(productId);
    const remaining = Math.max(0,stock - sold - inCart);

    if(remaining <= 0){
        notify(`${product.name} สินค้าหมดแล้ว`,"error");
        loadProducts();
        return;
    }

    if(qty > remaining){
        notify(`${product.name} เหลือให้เพิ่มได้อีก ${remaining.toLocaleString()} ชิ้น`,"error");
        qtyInput.value = remaining;
        shakeProductCard(productId);
        return;
    }

    const existing =
    cart.find(item => Number(item.id) === Number(productId));

    if(existing){
        existing.qty = Number(existing.qty || 0) + qty;
    }else{
        cart.push({
            id:product.id,
            name:product.name,
            price:product.price,
            image:product.image,
            stock:product.stock,
            qty:qty
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();
    loadProducts();

    notify(
        `${product.name} จำนวน ${qty} ชิ้น ถูกเพิ่มลงตะกร้าแล้ว`,
        "success"
    );

}

window.addToCart = addToCart;


/* =========================
   SALES DASHBOARD
========================= */

async function loadSalesDashboard(){

    if(!rankingList && !candleChart && !salesPieCanvas){
        return;
    }

    if(dashboardStatus){
        dashboardStatus.textContent = "กำลังโหลดข้อมูลยอดขาย...";
    }

    if(typeof supabaseClient === "undefined"){
        salesCache = [];
        renderSalesDashboard();
        return;
    }

    const { data,error } =
    await supabaseClient
    .from("product_sales")
    .select("product_id, product_name, total_sold, updated_at")
    .order("total_sold",{ ascending:false });

    if(error){
        console.error("SALES DASHBOARD ERROR",error);
        salesCache = [];

        if(dashboardStatus){
            dashboardStatus.textContent = "ยังโหลด product_sales ไม่ได้ แสดงข้อมูลสินค้าเป็น 0 ก่อน";
        }

        renderSalesDashboard();
        return;
    }

    salesCache = data || [];
    dashboardLoaded = true;

    if(dashboardStatus){
        dashboardStatus.textContent = "ข้อมูลยอดขายอัปเดต Real-time";
    }

    normalizeCart(true);
    updateCartCount();
    renderSalesDashboard();
    loadProducts();
}

function renderSalesDashboard(){
    const rows = getSalesRows()
    .sort((a,b) => b.sold - a.sold || a.id - b.id);

    renderRankingList(rows.slice(0,8));
    renderCandleChart(rows);
    renderPieChart(rows);

    const totalSold = rows.reduce((sum,item) => sum + item.sold,0);
    const totalStock = rows.reduce((sum,item) => sum + item.stock,0);

    if(bestSellerCount){
        bestSellerCount.textContent = totalSold.toLocaleString();
    }

    if(stockCapacityCount){
        stockCapacityCount.textContent = totalStock.toLocaleString();
    }
}

function renderRankingList(rows){
    if(!rankingList) return;

    rankingList.innerHTML = rows.map((item,index) => {
        const remaining = Math.max(0,item.stock - item.sold);

        return `
        <div class="ranking-item">
            <div class="rank-no">#${index + 1}</div>
            <div class="rank-body">
                <strong>${escapeHTML(item.name)}</strong>
                <span>${escapeHTML(item.category)} • เหลือ ${remaining.toLocaleString()} / ${item.stock.toLocaleString()}</span>
            </div>
            <div class="rank-sold">
                <strong>${item.sold.toLocaleString()}</strong>
                <span>sold</span>
            </div>
        </div>
        `;
    }).join("");
}

function renderCandleChart(rows){
    if(!candleChart) return;

    const maxStock = Math.max(...rows.map(item => item.stock),1);

    candleChart.innerHTML = rows.map(item => {
        const soldPercent = item.stock > 0 ? Math.min(100,(item.sold / item.stock) * 100) : 0;
        const wickPercent = Math.max(18,(item.stock / maxStock) * 100);
        const bodyHeight = Math.max(6,soldPercent);
        const bodyClass = soldPercent >= 80 ? "danger" : soldPercent >= 55 ? "hot" : "safe";

        return `
        <div class="candle-item" title="${escapeHTML(item.name)} ขายแล้ว ${item.sold}/${item.stock}">
            <div class="candle-stage">
                <span class="candle-wick" style="height:${wickPercent}%"></span>
                <span class="candle-body ${bodyClass}" style="height:${bodyHeight}%"></span>
            </div>
            <strong>${item.sold}</strong>
            <small>${escapeHTML(item.name)}</small>
        </div>
        `;
    }).join("");
}

function renderPieChart(rows){
    if(!salesPieCanvas) return;

    const ctx = salesPieCanvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const size = 300;

    salesPieCanvas.width = size * dpr;
    salesPieCanvas.height = size * dpr;
    salesPieCanvas.style.width = size + "px";
    salesPieCanvas.style.height = size + "px";

    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,size,size);

    const topRows = rows.filter(item => item.sold > 0).slice(0,8);
    const otherSold = rows.slice(8).reduce((sum,item) => sum + item.sold,0);
    const chartRows = otherSold > 0
    ? [...topRows,{ name:"Other", sold:otherSold, category:"other" }]
    : topRows;

    const total = chartRows.reduce((sum,item) => sum + item.sold,0);
    const center = size / 2;
    const radius = 112;
    const inner = 58;
    const colors = ["#b4f903","#166ae8","#ffc800","#e70deb","#ff4400","#00ffff","#fff200","#005129","#0004ff"];

    ctx.beginPath();
    ctx.arc(center,center,radius,0,Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.055)";
    ctx.fill();

    if(total <= 0){
        ctx.beginPath();
        ctx.arc(center,center,radius,0,Math.PI * 2);
        ctx.strokeStyle = "rgba(108,255,143,0.22)";
        ctx.lineWidth = 28;
        ctx.stroke();

        ctx.fillStyle = "#6CFF8F";
        ctx.font = "800 24px Poppins";
        ctx.textAlign = "center";
        ctx.fillText("0",center,center - 4);
        ctx.fillStyle = "#9fb3a9";
        ctx.font = "700 12px Poppins";
        ctx.fillText("sales",center,center + 18);

        if(pieLegend){
            pieLegend.innerHTML = `<div class="legend-empty">ยังไม่มีข้อมูลยอดขาย</div>`;
        }

        return;
    }

    let start = -Math.PI / 2;

    chartRows.forEach((item,index) => {
        const slice = (item.sold / total) * Math.PI * 2;
        const end = start + slice;

        ctx.beginPath();
        ctx.moveTo(center,center);
        ctx.arc(center,center,radius,start,end);
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();

        start = end;
    });

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(center,center,inner,0,Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = "#6CFF8F";
    ctx.font = "800 25px Poppins";
    ctx.textAlign = "center";
    ctx.fillText(total.toLocaleString(),center,center - 4);
    ctx.fillStyle = "#9fb3a9";
    ctx.font = "700 12px Poppins";
    ctx.fillText("sold",center,center + 18);

    if(pieLegend){
        pieLegend.innerHTML = chartRows.map((item,index) => `
            <div class="pie-legend-item">
                <span style="background:${colors[index % colors.length]}"></span>
                <strong>${escapeHTML(item.name)}</strong>
                <em>${item.sold.toLocaleString()}</em>
            </div>
        `).join("");
    }
}

function setupSalesRealtime(){
    if(typeof supabaseClient === "undefined" || !supabaseClient.channel){
        return;
    }

    supabaseClient
    .channel("product-sales-dashboard")
    .on(
        "postgres_changes",
        { event:"*", schema:"public", table:"product_sales" },
        () => {
            loadSalesDashboard();
        }
    )
    .subscribe();
}


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

    await loadSalesDashboard();
    setupSalesRealtime();

    await updateAuthUI();

});
