const header = document.querySelector(
  'header.header-news > div.header-news__container',
);
const mainContent = document.querySelector('section.main-content');
const carouselItemCount = 2;
const daysInfoCount = 32;
let carouselItemStart = 0;
let articles;

function populateDaysInfo() {
  for (let i = 1; i < daysInfoCount; i++) {
    const day = document.createElement('div');
    day.classList.add('main-content_day');
    day.innerHTML = [i];
    mainContent.appendChild(day);
  }
}
populateDaysInfo();

function createDivForNews(newsContents) {
  const newsArticle = document.createElement('div');
  newsArticle.classList.add('news-article');
  newsArticle.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), transparent), url(${newsContents.image})`;

  const title = document.createElement('span');
  title.classList.add('news-article__title');
  newsArticle.appendChild(title);
  title.innerText = newsContents.title; //vytahneme titul z objektu
  return newsArticle;
}

function populateNewsCarousel(news, startAt) {
  header.innerText = '';
  for (let i = startAt; i < startAt + carouselItemCount; i++) {
    const newsValue = news[i];
    const newsDiv = createDivForNews(newsValue);
    header.appendChild(newsDiv);
  }
}

fetch('http://localhost:3000/news.json')
  .then((serverResponse) => serverResponse.text())
  .then((responseText) => {
    const data = JSON.parse(responseText);
    articles = data.articles;
    populateNewsCarousel(data.articles, carouselItemStart);
  });

const buttonLeft = document.querySelector('#carousel-button-left');
const buttonRight = document.querySelector('#carousel-button-right');

buttonLeft.addEventListener('click', () => {
  carouselItemStart++;
  populateNewsCarousel(articles, carouselItemStart);
});
buttonRight.addEventListener('click', () => {
  carouselItemStart--;
  populateNewsCarousel(articles, carouselItemStart);
});
