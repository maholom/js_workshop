import { Carousel } from './components/carousel/carousel.js';
import { Day } from './components/day/day.js';

const daysInfoCount = 32;
const mainContent = document.querySelector('section.main-content');
const carousel = document.querySelector('app-carousel');

fetch('http://localhost:3000/news.json')
  .then((serverResponse) => serverResponse.text())
  .then((responseText) => {
    const data = JSON.parse(responseText);
    carousel.populateNewsCarousel(data.articles);
  });

function populateDaysInfo() {
  for (let i = 1; i < daysInfoCount; i++) {
    mainContent.appendChild(new Day(i));
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
