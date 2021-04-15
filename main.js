const header = document.querySelector('header.header-news');

const someDiv = document.createElement('div');

someDiv.innerHTML = `<a href='google.com'>Click Me</a>`;

someDiv.classList.add('ad-banner');

header.appendChild(someDiv);
