// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License

// I might not need this.

import { TimePageAnnotation } from "@models";

import { AnnotationStateJSONType} from "@stores";

export default async (annotations: AnnotationStateJSONType[], estimatedTimePage: TimePageAnnotation[], workerID: string | undefined, experimentGroup: 0 | 1 | -1, debug: boolean) => {
  
  
  const annotationsJSON = annotations.map((annotation: AnnotationStateJSONType) => {
    const annotationJSON = {  
        _attributes: {  
          experimentGroup: experimentGroup,
          workerID: workerID,  
          assignmentID: annotation.assignmentId,  
          imageID: annotation.imageID,  
          x: annotation.imageX,  
          y: annotation.imageY,  
          width: annotation.imageWidth,  
          height: annotation.imageHeight,  
          imageWidth: annotation.originalImageWidth,  
          imageHeight: annotation.originalImageHeight,  
          estimateTime: annotation.estimateTime,  
          selected: annotation.selected,
          selectedCount: annotation.selectedCount,
          selectedRecord: annotation.selectedRecord,
          hoveredCount: annotation.hoveredCount,
          hoveredRecord: annotation.hoveredRecord,
          imagePosition: {
            x: annotation.imageX,
            y: annotation.imageY,
          },
          mouseTracking: annotation.mouseTracking.map((point) => ({
            x: point.x,
            y: point.y,
            time: point.time,
          })
        ),
        pointX: annotation.ratioX,
        pointY: annotation.ratioY,

        },
    };
    return annotationJSON;
  });
  console.log("DEBUG", estimatedTimePage)
  const finalJSON = {
    "estimatedTimePage": estimatedTimePage,
    "metadata": annotationsJSON,
  }
  
  const str = JSON.stringify(finalJSON);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], {type: "application/json;charset=utf-8"}); // Create a Blob object from the XML string
  // save the blob to public folder
  const a = document.createElement("a");
  a.download = `${workerID}.json`;
  a.href = URL.createObjectURL(blob);
  a.click();
  return ;
};
  