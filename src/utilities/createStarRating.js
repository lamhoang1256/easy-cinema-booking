export const createStarRating = (score) => {
  let rating = "";
  if (score % 2 === 0) {
    for (let i = 0; i < score / 2; i++) {
      rating += "<ion-icon name='star'></ion-icon>";
    }
  } else {
    for (let i = 0; i < Math.floor(score / 2); i++) {
      rating += "<ion-icon name='star'></ion-icon>";
    }
    rating += "<ion-icon name='star-half'></ion-icon>";
  }
  return rating;
};
