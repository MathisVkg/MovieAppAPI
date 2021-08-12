
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
let pageNumber = 1;
let cardsTag = document.getElementById("cardsTag");
let stockData;
let count;
let card;
let cardTitle;
let cardScore;
let cardImg;
let divTitle;
let cardDes;
// let cardsTagSearch = document.getElementById("cardsTagSearch");
// let searchTag = document.getElementById("searchTag");


// searchTag.addEventListener("click", () => {
//     stockValue = document.getElementById("searchValue").value;
//     console.log(stockValue);
// })


function getMovie() {
    fetch(APIURL + pageNumber)
    .then((res) => res.json())
    .then((data) => {
        stockData = data;
         for(count = 0; count < 20; count++) {
            card = document.createElement("div");
            cardTitle = document.createElement("p");
            cardScore = document.createElement("p");
            cardImg = document.createElement("img");
            divTitle = document.createElement("div");
            cardDes = document.createElement("p");
            divTitle.classList.add("nameFlex");
            
            card.classList.add("cardMovie");
            cardTitle.innerHTML = data.results[count].title;
            cardTitle.classList.add("movieTitle");

            if(data.results[count].poster_path === null) {
                cardImg.src = "";
            } else {
                cardImg.src = IMGPATH + data.results[count].poster_path;
                cardImg.classList.add("imgMovie");
            }
            
            cardDes.classList.add("description");
            cardDes.innerHTML = data.results[count].overview;


            card.appendChild(cardImg);
            card.appendChild(divTitle);
            card.appendChild(cardDes);
            divTitle.appendChild(cardTitle);
            divTitle.appendChild(cardScore);
            cardsTag.appendChild(card);
            getScore();
            getID();
        }
        pageCheck();
    });
}

function getScore() {
    let cardScore = document.createElement("p");
    cardScore.innerHTML = stockData.results[count].vote_average;
    if(stockData.results[count].vote_average < 3) {
        cardScore.classList.add("movieScore1");
    } else if (stockData.results[count].vote_average <= 6 && stockData.results[count].vote_average > 3) {
        cardScore.classList.add("movieScore2");
    } else if (stockData.results[count].vote_average <= 10 && stockData.results[count].vote_average > 6) {
        cardScore.classList.add("movieScore3");
    }
    divTitle.appendChild(cardScore);
}

function getID() {
    let idFlex = document.createElement("div");
    let cardId = document.createElement("p");
    let cardLang = document.createElement("p");
    idFlex.classList.add("idFlex");
    cardId.classList.add("cardId");
    cardLang.classList.add("cardLang");

    cardId.innerHTML = "ID: " + stockData.results[count].id;
    cardLang.innerHTML = stockData.results[count].original_language;

    idFlex.appendChild(cardId);
    idFlex.appendChild(cardLang);
    card.appendChild(idFlex);
}


function pageCheck() {
    if(pageNumber != 20) {
        pageNumber++;   
        getMovie();
    } else {
        return;
    }
}


getMovie();