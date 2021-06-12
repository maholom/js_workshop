import { Carousel } from './components/carousel/carousel.js';
import { Day } from './components/day/day.js';

const mainContent = document.querySelector('section.main-content');
const carousel = document.querySelector('app-carousel');
const popup = document.querySelector('pop-up');

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

function showDayModal() {
  const template = document.querySelector('#modal-template');
  const modal = template.content.cloneNode(true);
  const closeAction = () => {
    const child = document.querySelector('section.modal-container');
    document.body.removeChild(child);
  };
  modal.querySelector('#close-modal').addEventListener('click', closeAction);
  const cancelButton = modal.querySelector('#cancel-button');

  cancelButton.addEventListener('click', closeAction);

  modal.querySelector('#save-button').addEventListener('click', () => {
    const formRef = document.querySelector('#modal-form');
    const formData = new FormData(formRef);
    const data = formData.entries();
    const object = {};
    for (let formValue of data) {
      const key = formValue[0];
      const value = formValue[1];
      object[key] = value;
      //object.gender = 'Female'
    }

    const isHoliday = formData.get('isHolidayControl') === 'on';
  });
  document.body.appendChild(modal);

  const checkbox = document.querySelector('#limitAttendeesByGender');
  const row = document.querySelector('#genderSelectRow');
  checkbox.addEventListener('change', (event) => {
    if (event.target.checked) {
      row.classList.remove('hidden');
    } else {
      row.classList.add('hidden');
    }
  });

  let contactsArray;
  fetch('http://localhost:3000/contacts')
    .then((serverResponse) => serverResponse.text())
    .then((responseText) => {
      contactsArray = JSON.parse(responseText);
      createOptions(contactsArray);
    });

  const radioButtons = document.querySelectorAll('#genderSelectRow > input');
  for (let radio of radioButtons) {
    radio.addEventListener('change', () => {
      const formRef = document.querySelector('#modal-form');
      const formData = new FormData(formRef);
      const gender = formData.get('gender');
      const filteredContacts = contactsArray.filter((contact) => {
        return contact.gender === gender;
      });
      createOptions(filteredContacts);
    });
  }
}

function createOptions(contactsArray) {
  const select = document.querySelector('#eventAttendees');
  //select.innerHTML = '<option value=""></option>';

  const oldOptions = document.querySelectorAll('generated-option');

  oldOptions.forEach((opt) => {
    select.removeChild(opt);
  });

  contactsArray.forEach((it) => {
    const option = document.createElement('option');
    option.setAttribute('value', it.id);
    option.innerText = `${it.first_name} ${it.last_name}`;
    select.appendChild(option);
    option.classList.add('generated-option');
  });
}

window.showModal = showDayModal;

const password = document.querySelector('#password');

let keyPressed = '';
document.addEventListener('keydown', (keyboardEvent) => {
  keyPressed += keyboardEvent.key;
  if (keyPressed.includes('time')) {
    showDateModal();
    keyPressed = '';
  }
});

const showDateModal = () => {
  const popupTime = new Date().toLocaleTimeString();

  password.innerHTML = `<div class="popupModal">
      <div class="popupContent">
        <p>${popupTime}</p>
      </div>
    </div>`;
  const popupModal = document.querySelector('.popupModal');
  popupModal.style.display = 'block';
  setTimeout(() => {
    popupModal.style.display = 'none';
  }, 5000);
};

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
const buttonRight = document.querySelector('#carousel-button-rig, ht');

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
