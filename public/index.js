let langPack;

/*****/
init();
/*****/

function init() {
  const lang = window.navigator.language;
  
  setTitle(lang);
  setLangPack(lang);
  setEventListener();
  setScrollEasing();
}

function setTitle(l) {
  switch (l) {
    case 'ko':
      document.title = '감우와의 여행...'
      break;

    case 'en':
      document.title = 'Travel With Ganyu...'
      break;

    default:
      document.title = 'Travel With Ganyu...'
  }
}

function setLangPack(l) {
  switch (l) {
    case 'ko':
      langPack = koText;
      break;

    case 'en':
      langPack = enText;
      break;

    default:
      langPack = enText;
  }
}

function setEventListener() {
  const $koBtn = document.querySelector('#ko');
  const $enBtn = document.querySelector('#en');
  const lc = new CustomEvent('langChanged');

  $koBtn.addEventListener('click', koBtnCallback);
  $enBtn.addEventListener('click', enBtnCallback);

  function koBtnCallback() {
    if (langPack.type !== 'ko') {
      langPack = koText;
      window.dispatchEvent(lc);
      setTitle('ko');
    }
  }

  function enBtnCallback() {
    if (langPack.type !== 'en') {
      langPack = enText;
      window.dispatchEvent(lc);
      setTitle('en');
    }
  }
}

function setScrollEasing() {
  const $langChangePart = document.getElementById('lang-change-part');
  $langChangePart.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  const height = document.querySelector('html').clientHeight;

  const downwardEasingInOut = (initial, t) => {
    return initial + height / (1 + Math.E ** (-t + 10));
  }
  const upwardEasingInOut = (initial, t) => {
    return initial - height / (1 + Math.E ** (-t + 10));
  }

  function clickCallback(e) {
    window.removeEventListener('click', clickCallback);

    const current = window.scrollY;
    const pos = current + e.clientY;
    const half = current + height / 2;
    const isLocatedUpside = (current <= pos && pos < half);

    const p = isLocatedUpside ? upwardEasingInOut : downwardEasingInOut;
    let count = 0;
    const ti = setInterval(() => {
      if (count < 30) {
        window.scrollTo(0, p(current, 0.67 * count));
        count++;
      } else if (count === 30) {
        window.scrollTo(0, Math.ceil(p(current, 20)));
        clearInterval(ti);
        window.addEventListener('click', clickCallback);
      }
    }, 30);
  }

  window.addEventListener('click', clickCallback);
}