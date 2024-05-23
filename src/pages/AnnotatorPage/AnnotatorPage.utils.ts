// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { searchImageNetAnnotation } from "@api";
import { IMAGE_NUMBER } from "@constants";
import { Class, Image, ImageNetHIT } from "@models";
import { AnnotationsStateType, AppStateType } from "@stores";
import { getRandomElement } from "@utils";

export const makeid = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 7) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const chooseOneOfClasses = (classes: 
  Required<Class>[], 
  app: AppStateType
): Required<Class> => {
  console.log("DEBUG submitcount",app.submitCount);


  return classes[app.submitCount-1];
};


const shuffle = <T extends any>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};



export const chooseSomeOfImages = (
  images: Required<Image>[],
  app: AppStateType
): Required<Image>[] => {
  const { version } = app;
  const candidates = shuffle(images).sort(
    (a, b) => a.annotationCount[version] - b.annotationCount[version]
  );
  return candidates.slice(0, IMAGE_NUMBER);
};

export const generateDefaultAnnotation = (image: Image) => ({
  id: image.id,
  estimateTime: 0,
  hoveredCount: 0,
  imageWidth: 0,
  imageHeight: 0,
  mousePoint: { x: 0, y: 0 },
  selectedCount: 0,
  selected: false,
  imagePosition: { x: 0, y: 0 },
  mouseTracking: [],
});

export const projectAnnotationsForImageNet = (
  annotations: AnnotationsStateType
) => {
  return annotations.map((annotation) => ({
    selected: annotation.selected,
    selectedCount: annotation.selectedCount,
    selectedRecord: annotation.selectedRecord,
    hoveredCount: annotation.hoveredCount,
    hoveredRecord: annotation.hoveredRecord,
    imagePosition: {
      x: annotation.imageX,
      y: annotation.imageY,
    },
    imageWidth: annotation.imageWidth,
    imageHeight: annotation.imageHeight,
    originalImageWidth: annotation.originalImageWidth,
    originalImageHeight: annotation.originalImageHeight,
    estimateTime: annotation.estimateTime,
    mouseTracking: annotation.mouseTracking.map((point) => ({
      x: point.x,
      y: point.y,
      time: point.time,
    })),
    imageID: annotation.imageID as string,
  }));
};
