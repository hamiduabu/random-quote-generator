/**
 * Returns a pseudo random index value from an array
 * @param {array} arr An array to get random index from
 * @return {number} A pseudo random index from the given array
 */
function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}
