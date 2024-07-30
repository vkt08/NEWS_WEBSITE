const API_KEY = "4c9928fad82747a08e6d1077ef2f01ba";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Technology"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();//pbject
    console.log(data);
    bindData(data.articles);
    
    //collection of each news desciption-->data.articles 
    
}




function bindData(articles) {
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";
    //TO SHOW DATA ON THE WEBSEITE
    articles.forEach((article) => {
    //IF THE ARTICLES HAS NOT IMGES THEN WE RETURN 
        if (!article.urlToImage) return;
        //ELSE
        //so we are making deep copy of the template content in cardclone
        const cardClone = newsCardTemplate.content.cloneNode(true);
        //this will populate the cardclone with articles
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

//this is function of populating the single card 
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0, 60)}...`;
    newsDesc.innerHTML = `${article.description.slice(0, 150)}...`;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/KOLKATA" })

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})