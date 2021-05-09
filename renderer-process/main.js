import { Carousel } from './components/carousel/carousel.js';
const daysInfoCount = 32;
const mainContent = document.querySelector('section.main-content');

fetch('http://localhost:3000/news.json')
  .then((serverResponse) => serverResponse.text())
  .then((responseText) => {
    const data = JSON.parse(responseText);
    new Carousel().articles = data.articles;
    Carousel().populateNewsCarousel(
      data.articles,
      Carousel().carouselItemStart,
    );
  });

function populateDaysInfo() {
  for (let i = 1; i < daysInfoCount; i++) {
    const day = document.createElement('div');
    day.classList.add('main-content_day');
    day.innerHTML = [i];
    mainContent.appendChild(day);
  }
}
populateDaysInfo();

/*function populateNewsCarousel(news, startAt) {
  header.innerText = '';
  for (let i = startAt; i < startAt + carouselItemCount; i++) {
    const newsValue = news[i];
    const newsDiv = new NewsArticle().createDivForNews(newsValue);
    header.appendChild(newsDiv);
  }
  checkButtonsVisibility(articles, carouselItemCount, carouselItemStart);
}

const buttonLeft = document.querySelector('#carousel-button-left');
const buttonRight = document.querySelector('#carousel-button-right');

buttonLeft.addEventListener('click', () => {
  carouselItemStart--;
  populateNewsCarousel(articles, carouselItemStart);
});

buttonRight.addEventListener('click', () => {
  carouselItemStart++;
  populateNewsCarousel(articles, carouselItemStart);
});

function checkButtonsVisibility(
  articles,
  carouselItemCount,
  carouselItemStart,
) {
  buttonRight.hidden = carouselItemStart >= articles.length - carouselItemCount;
  buttonLeft.hidden = carouselItemStart === 0;
  return;
}*/
