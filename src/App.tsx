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
          <div className="bold">This is a scientific experiment</div>
          <div className="gray">
          We are asking you to take part in a scientific study. You will find everything you need to know about the study in this information sheet for participants.
          Please read this information carefully. If you have any questions, please do not hesitate to contact us.
          This study is planned and conducted by Albert Catalan Tatjer (albert.catalan-tatjer[at]student.uni-tuebingen.de).
          Participation in the study is voluntary. If you do not wish to participate or if you later withdraw your consent, you will not suffer any disadvantages as a result.
          </div>
          <div className="bold">What is the purpose of the study?</div>
          <div className="gray"> 
            This study is part of an effort to research the dataset annotation process,
            to gain a better understanding of the cost/reward of different annotation approached.
          </div>
          <div className="bold">What is the study process?</div>
          <div className="gray">
            You will be presented with a <strong>keyword</strong>, a brief description, and a <strong>series of images</strong>. 
            Your task to click on the images that contain objects related to the keyword, regardless of
            occlusions, other objects, or clutter or text in the scene.
          </div>
          {(app.experimentGroup===1 &&
          <div className="gray">
            When selecting an image, please <strong>click on the object of interest</strong> within the image.
          </div>
        )}
          <div className="bold">How long will it take?</div>
          <div className="gray">
            The study will take approximately <strong>5 minutes</strong>.
          </div>
          <div className="bold">On data protection</div>
          <div className="gray">
          In this study, Albert Catalan Tatjer (albert.catalan-tatjer[at]student.uni-tuebingen.de) is responsible for data processing. 
          The legal basis for processing is personal consent (Art. 6 para. 1 lit. a, Art. 9 para. 2 lit. a DSGVO). 
          The data is completely anonymized and untraceable to the participant. The data is be collected exclusively for the purpose of this study described above and will only be used within this framework.
          The data will be stored at the Tübingen AI Center, University of Tübingen (Maria-von-Linden-Str. 6, 72076 Tübingen).
          We only keep the data for as long as it is required for the above-mentioned purpose. The data will be deleted at the latest after 10 years after the study.
          We do not transfer the collected data to other institutions in Germany, the EU, or to a third country outside the EU or to an international organization.
          Consent to the processing of your data is voluntary. Upon finishing the following tasks, you will choose whether you want to submit your data or not, without any consequences.
          You also have the right to complain to any data protection supervisory authority. You can find a list of the supervisory authorities in Germany at: 
          {/* insert link */}
          <a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html">https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html</a>
          </div>
        
        </Instruction>
        <SubmitButton type="button" onClick={() => setBegin(true)}>Start
        </SubmitButton>
      </Container>
      }
    </>
  );
};

export default App;
