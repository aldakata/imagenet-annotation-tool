// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License

// Maybe I dont need this
import { ImageNetHIT } from "@models";

export default async (hitDatasetName: string, imageNetHitID: string) => {
  const hit: ImageNetHIT = {} as ImageNetHIT;
  hit.id = "test";
  hit.hitDatasetName = "test";
  hit.pages = [{
    pageno: 1, 
    class: {
      id: "0",
      wnid: "n00004475",
      synset: ["n00004475"],
      description: "organism, being",
      wikipedia: ["Organism"]
    },
    images: [
      {
        id: "0",
        url: "public/bernatisme/IMG_0293.jpg"
      }
    ]
  }];

  return hit;
};
