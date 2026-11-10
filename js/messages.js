const MESSAGES = {
  loading: "Loading weather...",
  apiKeyEmpty: "API key is empty. Open js/config.js.",
  apiKeyWrong: "API key is wrong or not active yet.",
  cityNotFound: "City not found. Check the spelling.",
  weeklyFailed: "Weekly forecast could not be loaded.",
  unknown: "Something went wrong. Try again.",
};


function getStatusMessage(status) {
  if (status === 401) return MESSAGES.apiKeyWrong;
  if (status === 404) return MESSAGES.cityNotFound;
  return MESSAGES.unknown;
}