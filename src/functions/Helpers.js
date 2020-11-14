const JOKES_KEY = "jokes";

function saveJokes(jokes) {
    window.localStorage.setItem(JOKES_KEY, JSON.stringify(jokes));
}

function getSavedJokes() {
    return JSON.parse(window.localStorage.getItem(JOKES_KEY));
}

function getColor(votes) {
    if (votes >= 15) {
      return "#4CAF50";
    } else if (votes >= 12) {
      return "#8BC34A";
    } else if (votes >= 9) {
      return "#CDDC39";
    } else if (votes >= 6) {
      return "#FFEB3B";
    } else if (votes >= 3) {
      return "#FFC107";
    } else if (votes >= 0) {
      return "#FF9800";
    } else {
      return "#f44336";
    }
  }

  function getEmoji(votes) {
    if (votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (votes >= 12) {
      return "em em-laughing";
    } else if (votes >= 9) {
      return "em em-smiley";
    } else if (votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (votes >= 3) {
      return "em em-neutral_face";
    } else if (votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }

  export {saveJokes, getSavedJokes, getColor, getEmoji};