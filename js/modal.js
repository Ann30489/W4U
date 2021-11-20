const modalLinks = document.querySelectorAll('.c-contact-btn__button');
const body = document.querySelector('body');
// For lock fixed elements without scroll
const lockPadding = document.querySelectorAll('.js-lock-padding')

let unlock = true;
const timeout = 800;

if (modalLinks.length > 0) {
  for (let index = 0; index < modalLinks.length; index++) {
    const modalLink = modalLinks[index];
    modalLink.addEventListener('click', function (e) {
      const modalName = modalLink.getAttribute('href').replace('#', '');
      const currentName = document.getElementById(modalName);
      modalOpen(currentName);
      e.preventDefault(); 
    });
  }
}
const modalCloseLink = document.querySelectorAll(".c-contact__close");
if (modalCloseLink.length > 0) {
  for (let index = 0; index < modalCloseLink.length; index++) {
    const elem = modalCloseLink[index];
    elem.addEventListener('click', function(e) {
      modalClose(elem.closest('.c-contact'));
      e.preventDefault();
    });
  }
}
function modalOpen(currentName) {
  if (currentName && unlock) {
    const modalActive = document.querySelector(".c-contact.c-contact--open");
    if (modalActive) {
      modalClose(modalActive, false);
    } 
		else {
      bodyLock();
    }
    currentName.classList.add("c-contact--open");
    currentName.addEventListener("click", function(e) {
      // Close modal on dark bg
      if (!e.target.closest(".c-contact__wrapper")) {
        modalClose(e.target.closest(".c-contact"));
      }
    });
  }
}
function modalClose(modalActive, doUnlock = true) {
  if (unlock) {
    modalActive.classList.remove('c-contact--open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}
// Remove global scroll
function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.container').offsetWidth + 'px';
  // if fixed elements > 0, get all elements padding right
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  // body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');
  unlock = false;
  // For open again after animation without error scroll
  setTimeout(function () {
    unlock = true;
  }, timeout);
}
// For unlock with timeout
function bodyUnLock() {
  setTimeout(function () {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = '0px';
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout)
}

// Close modal with ESC
document.addEventListener('keydown', function(e) {
  if (e.which === 27) {
    const modalActive = document.querySelector('.c-contact.c-contact--open');
    modalClose(modalActive);
  }
});