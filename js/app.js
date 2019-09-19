window.onload = function() {
/**
   * Calls getRandomIndex on quotes
   * to obtain a pseudo random index number,
   * used to obtain random quote phrases, author and tags
   * @return {string[]} An array with two string elements
   * containing randomly concatenated
   * quote strings, author and quote tag
   */
  function generateQuote() {
    const randomIndex = getRandomIndex(quotes.categories);
    const randomQuoteAuthor = quoteAuthors[randomIndex];
    const randomQuote = quoteStatements[randomIndex];
    const randomTag = quotes.quoteTags.tags[randomIndex];
    const quoteTypeSelected = document
        .querySelector('.quote-type-container input:checked')
        .getAttribute('value');

    let quoteType = randomQuote;
    let quoteAuthorType = randomQuoteAuthor;
    let quoteTag = randomTag;

    if (quoteTypeSelected === 'food') {
      quoteType = quotes.foodQuotes;
      quoteAuthorType = quotes.foodQuoteAuthors;
      quoteTag = quotes.quoteTags.foodTag();
    }
    if (quoteTypeSelected === 'fashion') {
      quoteType = quotes.fashionQuotes;
      quoteAuthorType = quotes.fashionQuoteAuthors;
      quoteTag = quotes.quoteTags.fashionTag();
    }
    if (quoteTypeSelected === 'shelter') {
      quoteType = quotes.shelterQuotes;
      quoteAuthorType = quotes.shelterQuoteAuthors;
      quoteTag = quotes.quoteTags.shelterTag();
    }

    return [
      `${
        quoteType.firstSentenceFragment[
            getRandomIndex(quoteType.firstSentenceFragment)
        ]
      } ${
        quoteType.middleSentenceFragment[
            getRandomIndex(quoteType.middleSentenceFragment)
        ]
      } ${
        quoteType.lastSentenceFragment[
            getRandomIndex(quoteType.lastSentenceFragment)
        ]
      }`,
      `${
        quoteAuthorType.firstName[getRandomIndex(quoteAuthorType.firstName)]
      } ${
        quoteAuthorType.lastName[getRandomIndex(quoteAuthorType.lastName)]
      }, ${quoteTag}`,
    ];
  }

  /**
   * Creates required HTMLElements
   * with appropriate styling and
   * assigning appropriate textContent
   * @return {documentFragment} A document object
   * containing the document structure for the quotes
   */
  function generateBlockQuotes() {
    const numberOfQuotes = Number(
        document
            .querySelector('.quote-number-container input:checked')
            .getAttribute('value')
    );
    const documentFragment = document.createDocumentFragment();
    for (let i = 0; i < numberOfQuotes; i += 1) {
      const [quote, author] = generateQuote();

      const blockQuote = document.createElement('blockquote');
      const colorTypeIndex = getRandomIndex(colors.colorType());
      const randomColorIndex = getRandomIndex(
          colors.colorType()[colorTypeIndex]
      );
      const randomBackground = colors.colorType()[colorTypeIndex][
          randomColorIndex
      ];
      blockQuote.style.backgroundColor = randomBackground;

      const paragraph = document.createElement('p');
      paragraph.textContent = quote;
      blockQuote.appendChild(paragraph);

      const footer = document.createElement('footer');
      footer.textContent = author;
      blockQuote.appendChild(footer);

      documentFragment.appendChild(blockQuote);
    }
    return documentFragment;
  }

  /**
   * Calls {@link generateBlockQuotes} and
   * Inserts the documentFragment to the DOM
   * with basic animation
   * @return {void}
   */
  function appendBlockQuotes() {
    const quoteBody = document.querySelector('#quote-body');
    quoteBody.appendChild(generateBlockQuotes());
    const blockQuotes = document.querySelectorAll('blockquote');
    blockQuotes.forEach((blockQuote) => {
      blockQuote.classList.add('hide-blockquote');

      setTimeout(() => {
        blockQuote.classList.remove('hide-blockquote');
        blockQuote.classList.add('show-blockquote');
      }, 0);

      setTimeout(() => {
        const blockQuoteBackgroundColor = blockQuote.style.backgroundColor;
        if (colors.lighterColors.includes(blockQuoteBackgroundColor)) {
          blockQuote.style.color = colors.darkFontColor;
        } else {
          blockQuote.style.color = colors.lightFontColor;
        }
      }, 100);
    });
  }

  /**
   * Removes blockquotes from the DOM
   * @return {void}
   */
  function clearQuotes() {
    document
        .querySelectorAll('blockquote')
        .forEach((blockquote) => blockquote.remove());
  }

  /**
   * IIFE
   * Styles radio buttons when checked
   * @return {void}
   */
  (function styleInputsWhenChecked() {
    const inputs = document.querySelectorAll('input');
    const changeState = () => {
      inputs.forEach((input) => {
        if (input.checked === true) {
          input.parentElement.classList.add('checked');
        } else {
          input.parentElement.classList.remove('checked');
        }
      });
    };
    changeState();
    inputs.forEach((input) => {
      input.addEventListener('click', () => {
        changeState();
      });
    });
  })();

  /**
   * Adds event listeners to buttons
   * for generating and removing quotes
   * @return {void}
   */
  document.addEventListener('click', (event) => {
    const displayId = document.querySelector('#display-quotes');
    const clearId = document.querySelector('#remove-quotes');
    if (event.target === displayId) {
      appendBlockQuotes();
    }
    if (event.target === clearId) {
      clearQuotes();
    }
  });
};
