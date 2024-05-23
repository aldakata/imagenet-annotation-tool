// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { Class, Image } from "@models";
import { NUMBER_OF_WRONG_SAMPLES_PER_CLASS } from "@constants";

function shuffle(array: Image[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
export default (imageNetClass: Class) => {

  const images: Image[] = [];

  for (let i=0; i<imageNetClass.n; i++) {
    const image = {} as Image;
    image.id = i.toString();
    image.url = `${imageNetClass.wnid}/${i}`
    image.belongsToThisClass = i>NUMBER_OF_WRONG_SAMPLES_PER_CLASS;

    images.push(image);
  }
  // const shuffledArray = images.sort((a, b) => Math.random());
  shuffle(images);
  console.log("DEBUG", images)
  return images;
};