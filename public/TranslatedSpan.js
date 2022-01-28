class TranslatedSpan extends HTMLElement {
  constructor() {
    super();

    const $root = this.attachShadow({ mode: 'open' });
    const $span = document.createElement('span');
    const $style = document.createElement('style');

    $root.$ref = $span;
    
    $style.textContent = `
      span {
        margin: 0;
        border: 0;
        box-sizing: border-box;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
      }
    `;

    $root.appendChild($style);
    $root.appendChild($span);

    window.addEventListener('langChanged', this.updateTextContent.bind(this));
  }

  connectedCallback() {
    this.updateTextContent();

    if (this.getAttribute('deco') === 'true') {
      const $refStyle = this.shadowRoot.$ref.style;

      $refStyle.textDecoration = 'underline';
      $refStyle.color = 'blue';
      $refStyle.cursor = 'pointer';
      $refStyle.textUnderlineOffset = '2px';
    }
  }

  updateTextContent() {
    const $ref = this.shadowRoot.$ref;
    const src = this.getAttribute('src');
    const textData = getTextData(src);
    
    $ref.innerHTML = textData;
  }
}

customElements.define('translated-span', TranslatedSpan);

function getTextData(src) {
  const sliced = src.split('.');
  let count = 0;
  let text = langPack[sliced[count]];

  while (typeof text !== 'string') {
    count++;
    text = text[sliced[count]];
  }

  return text;
}