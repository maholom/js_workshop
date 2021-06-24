import { Carousel } from './components/carousel/carousel.js';
import { Day } from './components/day/day.js';

const mainContent = document.querySelector('section.main-content');
const carousel = document.querySelector('app-carousel');
const popup = document.querySelector('pop-up');

window.showLoader = showLoader;
window.hideLoader = hideLoader;

function showLoader() {
  document.body.appendChild(
    document.querySelector('#loaderTemplate').content.cloneNode(true),
  );
}
function hideLoader() {
  document.body.removeChild(document.querySelector('.loader'));
}

function showToaster(success, title, message) {
  const toasterTemplate = document
    .querySelector('#toasterTemplate')
    .content.cloneNode(true);
  const toasterElement = toasterTemplate.querySelector('.toaster');
  toasterElement.addEventListener('click', () =>
    document.body.removeChild(toasterElement),
  );
  toasterElement.classList.add(success ? 'success' : 'error');
  toasterTemplate.querySelector('h1').innerText = title;
  toasterTemplate.querySelector('p').innerText = message;
  document.body.appendChild(toasterTemplate);
  setTimeout(() => {
    try {
      document.body.removeChild(toasterElement);
    } catch (e) {
      console.warn('Toaster already removed');
    }
  }, 3000);
}

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

function showDayModal(dayDate) {
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

    const object = {
      date: dayDate,
    };

    for (let formValue of data) {
      const key = formValue[0];
      const value = formValue[1];
      object[key] = value;
      //object.gender = 'Female'
    }

    showLoader();

    fetch('http://localhost:3000/calendar', {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      hideLoader();
      if (response.status === 200) {
        showToaster(true, 'Data uložena', 'Vaše událost byla uložena.');
        fetch('http://localhost:3000/calendar')
          .then((serverResponse) => serverResponse.text())
          .then((responseText) => {
            const events = JSON.parse(responseText);
            const days = document.querySelectorAll('app-day');
            const eventValues = Object.values(events); //Object.keys - vytahne pole hodnot/klicu z objektu
            //cyklus s iterable
            eventValues.forEach((event) => {
              for (let day of days) {
                const eventDate = new Date(event.date);
                const dayDate = day.date;
                // v pripade ze sa rovna eventDate a dayDate -> nastavit event
                console.log(
                  eventDate.toDateString(),
                  eventDate.toDateString() === dayDate.toDateString(),
                );
              }
            });
          });
      } else {
        showToaster(false, 'Chyba serveru', 'Server není dostupný.');
      }
      console.log(response);
    });

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
  password.innerHTML = `<div class="popupModal">
      <div class="popupContent">
        <p class='clock'></p>
      </div>
    </div>`;
  const popupModal = document.querySelector('.popupModal');
  popupModal.style.display = 'block';
  setTimeout(() => {
    popupModal.style.display = 'none';
  }, 5000);

  function displayTime() {
    let time = new Date().toLocaleTimeString();
    document.querySelector('.clock').textContent = time;
  }
  displayTime();
  const createClock = setInterval(displayTime, 1000);
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
