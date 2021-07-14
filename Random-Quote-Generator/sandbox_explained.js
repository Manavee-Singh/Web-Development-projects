
// selecting id from html file
const newQuoteButton = document.querySelector('#js-new-quote');


//tweet button
const twitterButton = document.querySelector('#js-tweet');


// implement function getqoute when action click hppens
newQuoteButton.addEventListener('click', getQuoteFromAPI);

// url of endpoint
const endpoint = 'https://animechan.vercel.app/api/random';

// function getquote
async function getQuoteFromAPI() {

  //if an error occurs in try block, catch block is executed

  try {

    // the simplest use of fetch takes a single argument...the url of the resource we want to fetch and returns a promise

    // a promise represents an eventual success or failure of an operation and await keyword pauses the function till the promise is resolved

    // the response to the fetch keyword is stored in the response variable, if the request is successful we recive 200 OK reponse else request failed
    const response = await fetch(endpoint);



    // if an error occurs here or anywhere control shifts to the catch block


    //*** if response is not 200 ok
    if (!response.ok) {
      //causes control flow to shift to the catch block by throwing error message
      throw Error(response.statusText)
    }

    // we be executed only if response is 200 OK

    // response.json reads the response body to completion and parses the response as JSON

    // we use await here because json returns a promise

    const json = await response.json();

    // // if the promise is resolved successfully , the json object will show in console else catch block will execute
    // // console.log(json)

    // // to console log the value in quote key use dot notation, for full object use console.log(json)
    // console.log(json.anime)
    // console.log(json.character)
    // console.log(json.quote)


    // the displayquote function is being invoked every time we receive a new quote
    displayQuoteOnWebpage(json.quote, json.anime, json.character);


    setTweetButton(json.quote);

  } catch (err) {

    // displays actual error on console for inspection
    console.log(err)

    // displays error message on browser
    alert('Failed to fetch new quote');
  }
}


function displayQuoteOnWebpage(quote, anime, character) {
  const quoteText = document.querySelector('#js-quote-text')
  const animeName = document.querySelector('#js-anime-name');
  const characterName = document.querySelector('#js-character');

  // this replaces the content of quoteText to the anime API quote
  quoteText.textContent = quote;
  animeName.textContent = anime;
  characterName.textContent = "Character: " + character;

}

function setTweetButton(quote) {

  // sets value of href in otherwise blank a tag of twitter
  // set attribute takes two funtions
  twitterButton.setAttribute('href', `https://twitter.com/share?text=${quote} - Anime`);
}

// without this no code until first click of new quote button
getQuoteFromAPI();



