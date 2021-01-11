/**
 * Javascript file that allows the user to
 * request lyrics of songs with known song name and artist!
 */

"use strict";

(function() {

  const URL = "https://api.lyrics.ovh/v1/";

  window.addEventListener("load", initialize);

  /**
   * Initializes the button to allow user to find lyrics through
   * the API.
   */
  function initialize() {
    qs('button').addEventListener('click', fetchTheData);
  }

  /**
   * Allows to find appropriate lyrics user has entered and clears
   * previous lyrics of previous searches before displaying new results.
   */
  function fetchTheData() {
    let param = id('artist').value + "/" + id('song').value;
    id('response').innerHTML = "";
    qs('button').disabled = true;

    fetch(URL + param)
      .then(checkStatus)
      .then(response => response.json())
      .then(splitLines)
      .then(processResponse)
      .catch(handleError);
  }

  function splitLines(data) {
    let text = JSON.stringify(data);
    return text.split('\n');
  }
  /**
   * Takes in the data recieved from API and displays onto page,
   * whilst at the same time allowing the user to be able to search
   * for new lyrics again.
   *
   * @param {JSON} data of lyrics recieved
   */
  function processResponse(text) { // success: do something with the response data

    let lyrics = gen("p");
    lyrics.textContent = text;
    id('response').appendChild(lyrics);
    console.log(lyrics);

    let home = document.getElementById('search');
    home.classList.add('hidden');
    let view = document.getElementById('result');
    view.classList.remove('hidden');
    qs('button').disabled = false;
  }

  /**
   * Displays the recieved error message when requesting for data.
   * @param {object} err - message recieved if error in requesting data.
   */
  function handleError(err) {
    let error = gen("p");
    error.textContent = "There was an error with requesting data, please check for typos too!\
    Error from system:" + err;
    id("response").appendChild(error);
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the element created as specified.
   * @param {object} tagName - tagName for HTML
   * @return {object} Created DOM object
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Checks whether or not status recieved is without error.
   * @param {boolean} response - response recieved
   * @returns {object} returns status check
   */
  function checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      throw Error("Error in request: " + response.statusText);
    }
  }

})();
