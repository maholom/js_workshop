<<<<<<< HEAD
import { Carousel } from './components/carousel/carousel.js';
=======
import {Carousel} from './components/carousel/carousel.js';
>>>>>>> da4f7b3f60b8c6578f851c087cf9d7bc8073aba1

const daysInfoCount = 32;
const mainContent = document.querySelector('section.main-content');

<<<<<<< HEAD
fetch('http://localhost:3000/news.json')
  .then((serverResponse) => serverResponse.text())
  .then((responseText) => {
    const data = JSON.parse(responseText);
    const newsCarousel = new Carousel();
    newsCarousel.populateNewsCarousel(data.articles);
  });
=======
fetch('http://localhost:3000/news.json').
    then((serverResponse) => serverResponse.text()).
    then((responseText) => {
      const data = JSON.parse(responseText);
      const newsCarousel = new Carousel();
      newsCarousel.populateNewsCarousel(data.articles);
    });
>>>>>>> da4f7b3f60b8c6578f851c087cf9d7bc8073aba1

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
