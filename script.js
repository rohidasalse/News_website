const API_KEY = "85a9c56d28224f80ae92dfc77da27388";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));
async function fetchNews(query) {
    const res = await fetch(`${url} ${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardscontainer = document.getElementById('card-container');
    const cardstemplate = document.getElementById('template-card');
    cardscontainer.innerHTML = '';
    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = cardstemplate.content.cloneNode(true);
        FillDataInCard(cardClone, article)
        cardscontainer.appendChild(cardClone);

    });
}

function FillDataInCard(cardClone, article) {
    const newsimg = cardClone.querySelector('#card-img');
    const newstitle = cardClone.querySelector('#title');
    const newsdate = cardClone.querySelector('#date');
    const newspara = cardClone.querySelector('#para');
    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newspara.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

    newsdate.innerHTML = `${article.source.name}.${date}`;


    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
// const currentSelectedNav = null

function onNavItemClick(id) {
    fetchNews(id);
}
//     const navItems = document.getElementById(id);
//     currentSelectedNav ?ClassList.remove("");
//     currentSelectedNav = navItems;
//     currentSelectedNav.classList.add('active');
// }
const searchbtn = document.getElementById('search-btn');
const searchtxt = document.getElementById('search-txt');
searchbtn.addEventListener("click", () => {
    const query = searchtxt.value;
    if (!query) return;
    fetchNews(query);
});