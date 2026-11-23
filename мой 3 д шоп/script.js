const OWNER_TELEGRAM = "mukham_2010"; // Telegram владельца без @
const ADMIN_LOGIN = "salih";
const ADMIN_PASSWORD = "mukham"; // Замени на свой пароль перед публикацией
let adminLoggedIn = false;
let pendingDeleteId = null;
const DEFAULT_IMAGE = "images/hero-3d.svg";
const starterProducts = [
 {id:1,titleRu:"Flexi Shark",titleUz:"Flexi Akula",price:50000,category:"toys",image:"https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=900&q=80",descRu:"Гибкая фигурка акулы. Отличный небольшой подарок.",descUz:"Bukiluvchan akula figurkasi. Ajoyib sovg‘a."},
 {id:2,titleRu:"Органайзер",titleUz:"Organayzer",price:35000,category:"home",image:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",descRu:"Удобная вещь для порядка на рабочем столе.",descUz:"Ish stolini tartibli saqlash uchun qulay buyum."},
 {id:3,titleRu:"Изделие на заказ",titleUz:"Buyurtma asosida",price:0,category:"custom",image:"https://images.unsplash.com/photo-1631556097152-c39479bbff0c?auto=format&fit=crop&w=900&q=80",descRu:"Есть своя идея? Обсудим модель, цвет и размер.",descUz:"O‘z g‘oyangiz bormi? Model, rang va o‘lchamni muhokama qilamiz."}
];
const translations = {
 ru:{navShop:"Магазин",navAbout:"Обо мне",navContacts:"Контакты",catalog:"Каталог",heroEyebrow:"ИДЕИ, КОТОРЫЕ МОЖНО ПОТРОГАТЬ",heroTitle:'Печатаем<br><span>твои идеи.</span>',heroText:"Уникальные изделия, полезные мелочи и необычные подарки, созданные на 3D-принтере.",seeProducts:"Смотреть товары",aboutProject:"О проекте",heroNote:"Изготовление на заказ · Ташкент",madeWithCare:"Сделано с заботой",madeWithCareSub:"Деталь за деталью",shopEyebrow:"ВЫБИРАЙ СВОЁ",shopTitle:"Наши изделия",shopSub:"Найди готовую вещь или закажи свой вариант.",all:"Все",toys:"Игрушки",homeGoods:"Для дома",custom:"На заказ",manageProducts:"Управление товарами",addProduct:"Добавить товар",adminHint:"Товары сохраняются в этом браузере на этом устройстве.",uploadPhoto:"Или загрузить фото",saveProduct:"Сохранить товар",adminWarning:"Важно: это локальное управление для начала. Чтобы товары были видны всем посетителям, позже подключим базу данных и админ-панель.",empty:"Пока здесь нет товаров. Добавь первый товар через управление.",aboutEyebrow:"НЕМНОГО ОБО МНЕ",aboutTitle:'От идеи<br>до готовой вещи',aboutText:"Привет! Это PRINT LAB — небольшая мастерская 3D-печати. Здесь появляются интересные модели, полезные аксессуары и подарки. Можно выбрать готовое изделие или обсудить индивидуальный заказ.",pointOne:"Продуманный дизайн",pointTwo:"Аккуратная печать",pointThree:"Идеи на заказ",editAbout:"Изменить текст и фото ↗",customTitle:"Не нашёл нужное?<br>Создадим вместе.",customText:"Расскажи, что хочешь напечатать. Обсудим форму, цвет и детали в Telegram.",customButton:"Обсудить идею",contactEyebrow:"ДАВАЙ НА СВЯЗИ",contactTitle:"Есть вопрос?",contactSub:"Оставь заявку — Telegram обязателен, чтобы мы могли ответить.",orderHeading:"Заявка на заказ",orderSub:"Заполни форму, и она откроет Telegram с готовым сообщением.",yourName:"Твоё имя",chooseProduct:"Что хочешь заказать?",quantity:"Количество",details:"Комментарий / пожелания",formError:"Проверь Telegram: нужен формат @username.",sendOrder:"Продолжить в Telegram",privacy:"Нажимая кнопку, ты откроешь Telegram и сам отправишь подготовленное сообщение.",footerText:"Создаём вещи, которые радуют.",orderThis:"Заказать это изделие",editAboutTitle:"Настроить раздел «Обо мне»",aboutPhotoUrl:"Ссылка на фото",saveChanges:"Сохранить изменения",noPhoto:"Фото не указано",currency:"сум",view:"Подробнее",delete:"Удалить",categoryNames:{toys:"Игрушки",home:"Для дома",custom:"На заказ"}},
 uz:{navShop:"Do‘kon",navAbout:"Men haqimda",navContacts:"Aloqa",catalog:"Katalog",heroEyebrow:"USHLAB KO‘RISH MUMKIN BO‘LGAN G‘OYALAR",heroTitle:'G‘oyalaringizni<br><span>chop etamiz.</span>',heroText:"3D printerda yaratilgan noyob buyumlar, foydali aksessuarlar va noodatiy sovg‘alar.",seeProducts:"Mahsulotlarni ko‘rish",aboutProject:"Loyiha haqida",heroNote:"Buyurtma asosida · Toshkent",madeWithCare:"Mehr bilan tayyorlangan",madeWithCareSub:"Har bir detal muhim",shopEyebrow:"O‘ZINGIZGA YOQQANINI TANLANG",shopTitle:"Mahsulotlarimiz",shopSub:"Tayyor mahsulotni tanlang yoki o‘z variantingizga buyurtma bering.",all:"Barchasi",toys:"O‘yinchoqlar",homeGoods:"Uy uchun",custom:"Buyurtma asosida",manageProducts:"Mahsulotlarni boshqarish",addProduct:"Mahsulot qo‘shish",adminHint:"Mahsulotlar ushbu qurilma brauzerida saqlanadi.",uploadPhoto:"Yoki rasm yuklang",saveProduct:"Mahsulotni saqlash",adminWarning:"Muhim: hozircha bu boshqaruv faqat shu brauzerda ishlaydi. Keyin barcha tashrif buyuruvchilar ko‘rishi uchun ma’lumotlar bazasi va admin panel qo‘shamiz.",empty:"Hozircha mahsulot yo‘q. Boshqaruv orqali birinchi mahsulotni qo‘shing.",aboutEyebrow:"MEN HAQIMDA",aboutTitle:'G‘oyadan<br>tayyor mahsulotgacha',aboutText:"Salom! Bu PRINT LAB — kichik 3D bosib chiqarish ustaxonasi. Bu yerda qiziqarli modellar, foydali aksessuarlar va sovg‘alar yaratiladi. Tayyor mahsulotni tanlashingiz yoki maxsus buyurtmani muhokama qilishingiz mumkin.",pointOne:"O‘ylangan dizayn",pointTwo:"Sifatli chop etish",pointThree:"Maxsus g‘oyalar",editAbout:"Matn va rasmni o‘zgartirish ↗",customTitle:"Kerakli narsani topmadingizmi?<br>Birga yaratamiz.",customText:"Nimani chop ettirmoqchi ekaningizni ayting. Shakl, rang va tafsilotlarni Telegramda muhokama qilamiz.",customButton:"G‘oyani muhokama qilish",contactEyebrow:"BOG‘LANAMIZ",contactTitle:"Savolingiz bormi?",contactSub:"So‘rov qoldiring — javob berishimiz uchun Telegram majburiy.",orderHeading:"Buyurtma so‘rovi",orderSub:"Formani to‘ldiring, Telegram tayyor xabar bilan ochiladi.",yourName:"Ismingiz",chooseProduct:"Nimaga buyurtma bermoqchisiz?",quantity:"Miqdori",details:"Izoh / istaklar",formError:"Telegramni tekshiring: @username formatida bo‘lishi kerak.",sendOrder:"Telegramda davom etish",privacy:"Tugmani bosganda Telegram ochiladi va tayyor xabarni o‘zingiz yuborasiz.",footerText:"Quvonch ulashadigan buyumlar yaratamiz.",orderThis:"Shu mahsulotga buyurtma berish",editAboutTitle:"Men haqimda bo‘limini sozlash",aboutPhotoUrl:"Rasm havolasi",saveChanges:"O‘zgarishlarni saqlash",noPhoto:"Rasm ko‘rsatilmagan",currency:"so‘m",view:"Batafsil",delete:"O‘chirish",categoryNames:{toys:"O‘yinchoqlar",home:"Uy uchun",custom:"Buyurtma asosida"}}
};
let lang="ru", activeFilter="all", selectedProduct=null;
let products=JSON.parse(localStorage.getItem("printlab_products")||"null")||starterProducts;
let aboutData=JSON.parse(localStorage.getItem("printlab_about")||"null")||{};
const $=s=>document.querySelector(s);
const money=n=>Number(n)===0?(lang==="ru"?"По запросу":"Kelishiladi"):new Intl.NumberFormat(lang==="ru"?"ru-RU":"uz-UZ").format(n)+" "+translations[lang].currency;
function saveProducts(){localStorage.setItem("printlab_products",JSON.stringify(products));}
function renderProducts(){
 const t=translations[lang], grid=$("#productGrid");
 const shown=products.filter(p=>activeFilter==="all"||p.category===activeFilter);
 grid.innerHTML=shown.map(p=>`<article class="product-card">
  <div class="product-image" data-open="${p.id}"><img src="${p.image||DEFAULT_IMAGE}" alt="${escapeHtml(lang==="ru"?p.titleRu:p.titleUz)}" onerror="this.src='${DEFAULT_IMAGE}'"><span class="product-tag">${t.categoryNames[p.category]||t.categoryNames.custom}</span>${adminLoggedIn ? `<button class="delete-product" data-delete="${p.id}" title="${t.delete}">×</button>` : ""}</div>
  <div class="product-info"><h3>${escapeHtml(lang==="ru"?p.titleRu:p.titleUz)}</h3><p>${escapeHtml(lang==="ru"?p.descRu:p.descUz)}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="view-product" data-open="${p.id}">${t.view} ↗</button></div></div></article>`).join("");
 $("#emptyState").classList.toggle("hidden",shown.length!==0);
 $("#cartCount").textContent=products.length;
 $("#orderProduct").innerHTML=`<option value="">—</option>`+products.map(p=>`<option value="${escapeHtml(lang==="ru"?p.titleRu:p.titleUz)}">${escapeHtml(lang==="ru"?p.titleRu:p.titleUz)}</option>`).join("");
}
function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function applyLanguage(){
 document.documentElement.lang=lang;
 document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(translations[lang][k])el.innerHTML=translations[lang][k];});
 $("#langToggle").textContent=lang==="ru"?"UZ":"RU";
 if(aboutData[lang])$(".about-copy>p:not(.eyebrow)").textContent=aboutData[lang];
 renderProducts();
}
function openProduct(id){const p=products.find(x=>x.id===id);if(!p)return;selectedProduct=p;$("#dialogImage").src=p.image||DEFAULT_IMAGE;$("#dialogTitle").textContent=lang==="ru"?p.titleRu:p.titleUz;$("#dialogDesc").textContent=lang==="ru"?p.descRu:p.descUz;$("#dialogPrice").textContent=money(p.price);$("#productDialog").showModal();}
$("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
$("#productGrid").addEventListener("click",e=>{const del=e.target.closest("[data-delete]");if(del){e.stopPropagation();if(!adminLoggedIn)return;pendingDeleteId=Number(del.dataset.delete);$("#loginError").classList.add("hidden");$("#adminLoginForm").elements.adminPassword.value="";$("#adminLoginDialog").showModal();return;}const open=e.target.closest("[data-open]");if(open)openProduct(Number(open.dataset.open));});
$("#dialogClose").onclick=()=>$("#productDialog").close();
$("#dialogOrder").onclick=()=>{if(selectedProduct)$("#orderProduct").value=lang==="ru"?selectedProduct.titleRu:selectedProduct.titleUz;$("#productDialog").close();$("#contacts").scrollIntoView({behavior:"smooth"});};
$("#adminToggle").onclick=()=>{
  if(adminLoggedIn){$("#adminPanel").classList.toggle("hidden");}
  else{$("#adminLoginDialog").showModal();}
};
$("#loginClose").onclick=()=>{pendingDeleteId=null;$("#adminLoginForm").reset();$("#adminLoginDialog").close();};
$("#adminLoginForm").addEventListener("submit",e=>{
  e.preventDefault();
  const d=new FormData(e.currentTarget);
  if(d.get("adminLogin")===ADMIN_LOGIN && d.get("adminPassword")===ADMIN_PASSWORD){
    $("#adminLoginDialog").close();
    $("#loginError").classList.add("hidden");
    e.currentTarget.reset();
    if(pendingDeleteId!==null){
      const idToDelete=pendingDeleteId;
      pendingDeleteId=null;
      products=products.filter(p=>p.id!==idToDelete);
      saveProducts();
      renderProducts();
    }else{
      adminLoggedIn=true;
      $("#adminPanel").classList.remove("hidden");
      renderProducts();
    }
  }else{
    $("#loginError").classList.remove("hidden");
  }
});
$("#adminLogout").onclick=()=>{
  adminLoggedIn=false;
  $("#adminPanel").classList.add("hidden");
  renderProducts();
};
$("#closeAdmin").onclick=()=>$("#adminPanel").classList.add("hidden");
$("#productForm").addEventListener("submit",e=>{e.preventDefault();const f=e.currentTarget, d=new FormData(f), file=d.get("photoFile");const add=image=>{products.unshift({id:Date.now(),titleRu:d.get("titleRu"),titleUz:d.get("titleUz"),price:Number(d.get("price")),category:d.get("category"),image:image||d.get("image")||DEFAULT_IMAGE,descRu:d.get("descRu")||"",descUz:d.get("descUz")||""});saveProducts();renderProducts();f.reset();};if(file&&file.size){const r=new FileReader();r.onload=()=>add(r.result);r.readAsDataURL(file);}else add("");});
$("#langToggle").onclick=()=>{lang=lang==="ru"?"uz":"ru";applyLanguage();};
$("#menuBtn").onclick=()=>document.querySelector(".site-header nav").classList.toggle("open");
$("#orderForm").addEventListener("submit",e=>{
 e.preventDefault();const f=e.currentTarget,d=new FormData(f),tg=String(d.get("telegram")).trim();
 if(!/^@[A-Za-z0-9_]{5,32}$/.test(tg)){$("#formError").classList.remove("hidden");return;}
 $("#formError").classList.add("hidden");
 const msg=`PRINT LAB — ${lang==="ru"?"НОВЫЙ ЗАПРОС":"YANGI BUYURTMA"}%0A${encodeURIComponent(lang==="ru"?"Имя":"Ism")}: ${encodeURIComponent(d.get("customerName"))}%0ATelegram: ${encodeURIComponent(tg)}%0A${encodeURIComponent(lang==="ru"?"Товар":"Mahsulot")}: ${encodeURIComponent(d.get("product")||"—")}%0A${encodeURIComponent(lang==="ru"?"Количество":"Miqdori")}: ${encodeURIComponent(d.get("quantity"))}%0A${encodeURIComponent(lang==="ru"?"Пожелания":"Izoh")}: ${encodeURIComponent(d.get("details")||"—")}`;
 const owner=OWNER_TELEGRAM.replace(/^@/,"");
 if(owner==="YOUR_TELEGRAM_USERNAME"){alert(lang==="ru"?"Сначала укажи свой Telegram username в файле script.js (OWNER_TELEGRAM).":"Avval script.js faylida Telegram username kiriting (OWNER_TELEGRAM).");return;}
 window.open(`https://t.me/${owner}?text=${msg}`,"_blank","noopener");
});
$("#editAbout").onclick=()=>{const f=$("#aboutForm");f.elements.aboutRu.value=aboutData.ru||translations.ru.aboutText;f.elements.aboutUz.value=aboutData.uz||translations.uz.aboutText;f.elements.aboutPhoto.value=aboutData.image||"";$("#aboutDialog").showModal();};
$("#aboutClose").onclick=()=>$("#aboutDialog").close();
$("#aboutForm").addEventListener("submit",e=>{e.preventDefault();const f=e.currentTarget,d=new FormData(f),file=d.get("aboutFile");const save=image=>{aboutData={ru:d.get("aboutRu"),uz:d.get("aboutUz"),image:image||d.get("aboutPhoto")||aboutData.image||""};localStorage.setItem("printlab_about",JSON.stringify(aboutData));$(".about-copy>p:not(.eyebrow)").textContent=aboutData[lang];if(aboutData.image)$("#aboutImage").src=aboutData.image;$("#aboutDialog").close();};if(file&&file.size){const r=new FileReader();r.onload=()=>save(r.result);r.readAsDataURL(file);}else save("");});
if(aboutData.image)$("#aboutImage").src=aboutData.image;
applyLanguage();
