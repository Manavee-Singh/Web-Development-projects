const newQuoteButton = document.querySelector('#js-new-quote');
const twitterButton = document.querySelector('#js-tweet');

newQuoteButton.addEventListener('click', getQuoteFromAPI);
const endpoint = 'https://animechan.vercel.app/api/random';

async function getQuoteFromAPI() {

    try {
        const response = await fetch(endpoint);
        //if response is not 200 ok
        if (!response.ok) {
            throw Error(response.statusText)
        }
        const json = await response.json();

        displayQuoteOnWebpage(json.quote, json.anime, json.character);
        setTweetButton(json.quote);

    } catch (err) {

        console.log(err);
        alert('Failed to fetch new quote');
    }
}


function displayQuoteOnWebpage(quote, anime, character) {
    const quoteText = document.querySelector('#js-quote-text')
    const animeName = document.querySelector('#js-anime-name');
    const characterName = document.querySelector('#js-character');

    quoteText.textContent = quote;
    animeName.textContent = anime;
    characterName.textContent = "Character: " + character;

}

function setTweetButton(quote) {
    twitterButton.setAttribute('href', `https://twitter.com/share?text=${quote} - Anime`);
}

getQuoteFromAPI();




