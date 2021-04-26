const header = document.querySelector('header.header-news');
const mainContent = document.querySelector('section.main-content');
const carouselItemCount = 4;
const daysInfoCount = 32;

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
  newsArticle.innerText = newsContents.title; //vytahneme titul z objektu
  return newsArticle;
}

function populateNewsCarousel(news) {
  for (let i = 0; i < carouselItemCount; i++) {
    const newsValue = news[i];
    const newsDiv = createDivForNews(newsValue);
    header.appendChild(newsDiv);
  }
}

fetch('http://localhost:3000/news.json')
  .then((serverResponse) => serverResponse.text())
  .then((responseText) => {
    const data = JSON.parse(responseText);
    populateNewsCarousel(data.articles);
  });
