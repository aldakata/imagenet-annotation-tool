// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AnnotationComponent } from "@components";
import { AppState } from "@stores";
import { capitalize } from "@utils";
import React, { useLayoutEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useHandler from "./AnnotatorPage.handler";
import {
  Container,
  DisplayJSON,
  ErrorText,
  Grid,
  Instruction,
  Loading,
  OverlayLoading,
  SubmitButton,
} from "./AnnotatorPage.style";

const AnnotatorPage = () => {
  const [app, setApp] = useRecoilState(AppState);
  const [finished, setFinished] = useState(false);
  const { state, createHIT, handleError, submitHandler, submitPageAnnotations, term } = useHandler();
  useLayoutEffect(() => {
    createHIT();
    setApp((app) => ({ ...app, startedAt: new Date().getTime() }));
    return () => undefined;
  }, [app.submitCount]);


  if (app.error) {
    return (
      <Container>
        <h1>Error</h1>
        <h2>{app.error}</h2>
      </Container>
    );
  }

  return (
    <Container>
      {/* {console.log(
        "DEBUG AnnotatorPage: imageNetClass.id.length", app.imageNetClass.id.length, 
        "loading?", state.loading, 
        // "workerId" ,app.workerId, 
        "submitCount", app.submitCount, 
        "totalSubmitCount", app.totalSubmitCount,
        "currentImages", app.currentImages,
        // "assignmentId", app.assignmentId
        )} */}
      {app.isDone && (
      <Instruction>
          <div className="term">You are finished!</div>
          <SubmitButton type="button" onClick={submitPageAnnotations}>
          {state.submitting ? "Saving..." : "IMPORTANT: Press this button to submit and consent to the processing of your data."}
          </SubmitButton>
          <div className="italic">
            (: Great job :)
          </div>
          <img src="end.png"/>
        </Instruction>
      )}
      {app.imageNetClass.id.length > 0 && !app.isDone && (

        <Instruction>
          <div className="bold">
            Which of these images contain at least one object of type
          </div>
          <div className="term">{term}</div>
          <div className="italic">
            Definition: {capitalize(app.imageNetClass.description)}
          </div>
          <hr />
          <p className="gray">
            For each of the following images, click the image if it contains at
            least one object of type {term}. Select an image if it contains the
            object regardless of occlusions, other objects, or clutter or text
            in the scene. Only select if images are photographs{" "}
            <strong>(no drawings or paintings)</strong>.
          </p>
          <div>Please make accurate selections!</div>
          <div>
            If you are unsure about the object meaning, please consult the
            following Wikipedia page(s) or google the objects yourself:{" "}
              <div key="url">
                <a href={app.imageNetClass.wikipedia} target="_blank" rel="noreferrer">
                  To Wikipedia 
                  <img
                    src="https://img.icons8.com/material-two-tone/24/000000/external-link.png"
                    alt="External Link"
                  />
                </a>
              </div>
          </div>
          <div>
            If it is impossible to complete a HIT due to missing data or other
            problems, please return the HIT.
          </div>
        </Instruction>
      )}
      {state.loading ? (
        <Loading>
          <span />
          Image Data Loading...
        </Loading>
      ) : app.currentImages?.length === 0 ? (
          <ErrorText>
            <h1>Thanks!</h1>
            <div>:3</div>
        </ErrorText>
      ) : (!app.isDone && (
        <Grid>
          {app.currentImages.map((imageNetImage) => (
            <AnnotationComponent
              key={imageNetImage.id}
              imageNetImage={imageNetImage}
              handleError={handleError}
            />
          ))
          }
        </Grid>)
      )}
      {app.isDone? (<></>
          )
          :
          (
            <SubmitButton type="button" onClick={submitHandler}>
            {state.submitting ? "Submitting..." : "Next"}
            </SubmitButton> 
          )
      }
      {!app.isDone && (<div>
            {app.submitCount} page(s) / {app.totalSubmitCount} pages
        </div>)}

      {state.submitting && (
        <OverlayLoading>
          <div />
        </OverlayLoading>
      )}

      {app.debugMode && (
        <DisplayJSON>
          <code>{JSON.stringify(app)}</code>
        </DisplayJSON>
      )}
    </Container>
  );
};

export default AnnotatorPage;
