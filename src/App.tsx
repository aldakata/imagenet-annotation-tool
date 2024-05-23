// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AppState, UserState } from "@stores";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Header from "./components/Header";
import AnnotatorPage from "./pages/AnnotatorPage";
import { Instruction, SubmitButton } from "@pages/AnnotatorPage/AnnotatorPage.style";
import { Container } from "@components/AnnotationComponent/AnnotationComponent.style";




const App = () => {
  const [app, setApp] = useRecoilState(AppState);
  const user = useRecoilValue(UserState);
  const [begin, setBegin] = useState(false);
  
  //Random value 0 or 1.
  const coinFlip: 0|1 = Math.random()>0.5?1:0;
  useEffect(() => {
    setApp((app) => ({ ...app, experimentGroup: coinFlip}));
  }, []);
  console.log("COINFLIP " + coinFlip );

  return (
    <>
      {(user.isAdmin || app.page === "admin") && user.id?.length > 0 && (
        <Header />
      )}
      {( begin && app.page === "annotator") ? (
        <AnnotatorPage />
      ) : 
      <Container>
        <Instruction>
          <div className="bold">Welcome to the experiment</div>
          <div className="gray">
            You will now be given a keyword and a series of images to classify.
            For each of the following images <strong>click the image if it contains the object</strong>, regardless of
            occlusions, other objects, or clutter or text in the scene.
          </div>
        {(app.experimentGroup===1 &&
          <div className="gray">
            Additionally, when selecting an image, please <strong>click on the object of interest</strong>.
          </div>
        )}
        </Instruction>
        <SubmitButton type="button" onClick={() => setBegin(true)}>Start
        </SubmitButton>
      </Container>
      }
    </>
  );
};

export default App;
