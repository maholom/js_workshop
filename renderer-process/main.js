import { Carousel } from './components/carousel/carousel.js';
import { Day } from './components/day/day.js';

const mainContent = document.querySelector('section.main-content');
const carousel = document.querySelector('app-carousel');

fetch('http://localhost:3000/news.json')
  .then((serverResponse) => serverResponse.text())
  .then((responseText) => {
    const data = JSON.parse(responseText);
    carousel.populateNewsCarousel(data.articles);
  });

const currentDate = new Date();
const maxDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0,
).getDate();

for (let i = 1; i <= maxDate; i++) {
  const dayDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    i,
  );
  mainContent.appendChild(new Day(dayDate));
}

const modalContainer = document.querySelector('.modal-container');
const buttonOpenModal = document.getElementById('open-modal');

buttonOpenModal.addEventListener('click', () => {
  modalContainer.hidden = false;
});

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
