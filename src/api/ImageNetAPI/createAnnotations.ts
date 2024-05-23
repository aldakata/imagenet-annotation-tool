// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AnnotationVersion } from "@constants";
import { AnnotationsStateType } from "@stores";

var fs = require('fs');


export default async (
  annotations: AnnotationsStateType,
  extraData: {
    annotatorID: string;
    version: AnnotationVersion;
    workerID?: string;
    assignmentID?: string;
    hitID?: string;
  }
) => {
  const dir = "public/annotations/"+extraData.assignmentID;
  
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  const { annotatorID, version, workerID, assignmentID, hitID } = extraData;

  const body = {
    annotations: annotations.map((annotation) => ({
      selectedCount: annotation.selectedCount,
      hoveredCount: annotation.hoveredCount,
      selected: annotation.selected,
      mousePoint: {
        x: annotation.ratioX,
        y: annotation.ratioY,
      },
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
      })),
      annotatorID,
      workerID,
      assignmentID,
      hitID,
      imageID: annotation.imageID,
      version,
    })),
  };
  // TODO Write as xml locally.
  console.log("Annotations: ", body);
};
