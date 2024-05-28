// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License

// I might not need this.

import { TimePageAnnotation } from "@models";

import { AnnotationStateJSONType} from "@stores";
import formData from 'form-data';
import Mailgun from 'mailgun.js';


export const testMail = (
) => {
  let messageParams = {
      from: `TEST <genie@${process.env.DOMAIN}>`,
      to: ["albert.catalan-tatjer@student.uni-tuebingen.de"],
      subject: `TEST`,
      text: "TES|T",
      
  };

  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({username: 'api', key: process.env.REACT_APP_API_KEY || 'key-yourkeyhere', url: 'https://api.mailgun.net'});
  mg.messages.create(
    process.env.REACT_APP_DOMAIN || "sandbox.mailgun.org", 
    messageParams
  ).then(
      (msg: any) => {
          console.log("MSG sent?", msg);
      }
  ).catch((err: any) => console.log(err)); // logs any error
  return;
};

const sendMail = (
    workerId: string | undefined, file: string
) => {
    let success = false;
    let messageParams = {
        from: `ANNOTATION <genie@${process.env.DOMAIN}>`,
        to: ["albert.catalan-tatjer@student.uni-tuebingen.de"],
        subject: `${workerId}`,
        text: "Another sample",
        attachment: {data: file, filename: `${workerId}.json`},
        
    };

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({username: 'api', key: process.env.REACT_APP_API_KEY || 'key-yourkeyhere', url: 'https://api.mailgun.net'});
    mg.messages.create(
      process.env.REACT_APP_DOMAIN || "sandbox.mailgun.org", 
      messageParams
    ).then(
        (msg: any) => {
            console.log("MSG sent?", msg);
            success = true;
        }
    ).catch(
      (err: any) => {
        console.log(err)
        success = false;
      }
    ); // logs any error
    return success;
};

export const downloadMail = (workerId: string | undefined, file: string) => {
  const bytes = new TextEncoder().encode(file);
  const blob = new Blob([bytes], {type: "application/json;charset=utf-8"}); // Create a Blob object from the XML string
  // save the blob to public folder
  const a = document.createElement("a");
  a.download = `${workerId}.json`;
  a.click();
  return a.href = URL.createObjectURL(blob);

}

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

  const str : string = JSON.stringify(finalJSON);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], {type: "application/json;charset=utf-8"}); // Create a Blob object from the XML string
  // save the blob to public folder
  const a = document.createElement("a");
  a.download = `${workerID}.json`;
  return sendMail(workerID, str);
};
  