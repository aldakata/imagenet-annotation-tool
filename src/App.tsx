// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AppState, UserState } from "@stores";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Header from "./components/Header";
import AnnotatorPage from "./pages/AnnotatorPage";
import { Instruction, SubmitButton, TextList } from "@pages/AnnotatorPage/AnnotatorPage.style";
import { Container } from "@components/AnnotationComponent/AnnotationComponent.style";
import {testMail} from "./api/ImageNetAPI/savePageAnnotations";

const App = () => {
  const [app, setApp] = useRecoilState(AppState);
  const user = useRecoilValue(UserState);
  const [begin, setBegin] = useState(false);
  const [coinFlip, setCoinFlip] = useState<0 | 1 | -1>(-1);
  if (coinFlip === -1) {
    setCoinFlip(Math.random()>0.5?1:0);
  }
  //Random value 0 or 1.
  useEffect(() => {
    setApp((app) => ({ ...app, experimentGroup: coinFlip}));
  }, []);
  console.log("COINFLIP " + coinFlip );

  return (
    <>
      {(user.isAdmin || app.page === "admin") && user.id?.length > 0 && (
        <Header />
      )}
      {( begin && app.page === "annotator" ) ? (
        <AnnotatorPage />
      ) : 
      <Container>
        <Instruction>
        <div>
          <div>
            <p>&nbsp;</p>
            <TextList>
              <h1>Please read the instruction carefully (takes less than 3 minutes).</h1>
              <p>This experiment is lead by Albert Catalan Tatjer (albert.catalan-tatjer[at]student.uni-tuebingen.de)</p>
              <p>&nbsp;</p>
              <h2><strong>Instructions</strong></h2>
                <p>- This experiment contains <strong>5 pages</strong> of image selection tasks.</p>
                <p>- Each page contains a task for <strong>1 object class name</strong> and <strong>20 candidate images</strong>.</p>
                <p>- Select <strong>all</strong> images corresponding to the shown object class name.</p>
                <p>- If unsure, you can use the <strong>Wikipedia link</strong>&nbsp;to learn about the object class.</p>
                <p>- When you are done with a page, click <strong>next</strong> and move on to the next page.</p>
                <p>&nbsp;</p>
              </TextList>
            <TextList>
              <h2><strong>Interface</strong></h2>
                <p><img src={"https://hybridsupervision-image-net.s3.us-east-2.amazonaws.com/mturk-readme/selection.png"} width="400" /></p>
                <p>- Selected images will appear with blue borders.</p>
                <p>- If necessary, click on the image again to undo the selection.<br />
                <br />
                <img src={"https://hybridsupervision-image-net.s3.us-east-2.amazonaws.com/mturk-readme/drawing_negative_sample.png"} width="300" />
                <img src={"https://hybridsupervision-image-net.s3.us-east-2.amazonaws.com/mturk-readme/drawing_positive_sample.png"} width="300" /></p>
                <p>- Do not select drawings or paintings.<br />
                &nbsp;</p>
            </TextList>
            {(app.experimentGroup===1 &&
            <TextList><h2><strong>Red pointer</strong></h2><p><img src="https://hybridsupervision-image-net.s3.us-east-2.amazonaws.com/mturk-readme/red_what.png" width="300" /></p><p>- Red pointer indicates the current position of the mouse cursor.</p><p>- Red pointer will be fixed at the position of the image where you click.</p><p>- When you click on the image again to de-select it, the red pointer will also be released.</p><p><img src="https://hybridsupervision-image-net.s3.us-east-2.amazonaws.com/mturk-readme/red_bad.png" width="300" /> <img src="https://hybridsupervision-image-net.s3.us-east-2.amazonaws.com/mturk-readme/red_good.png" width="300" /></p><p>- Try to click on the object of interest.</p><p><img src="https://hybridsupervision-image-net.s3.us-east-2.amazonaws.com/mturk-readme/red_multi.png" width="400" /></p><p>- When there are multiple objects, click on one of them.</p><p>&nbsp;</p></TextList>
            )}
            <TextList>
            <h2><strong><span>Important n</span><span>otes on data collection</span></strong></h2>
              <p>- Albert Catalan Tatjer (albert.catalan-tatjer[at]student.uni-tuebingen.de) is responsible for data processing.</p>
              <p>- The legal basis for processing is personal consent (Art. 6 para. 1 lit. a, Art. 9 para. 2 lit. a DSGVO).</p>
              <p>- The data is completely anonymized and untraceable to the participant.</p>
              <p>- The data is collected exclusively for the purpose of this study and will only be used within this framework.</p>
              <p>- The data will be stored at the University of Tübingen.</p>
              <p>- The data will only be kept for as long as it is required for the above-mentioned purpose.</p>
              <p>- Upon finishing the following tasks, you will choose whether you want to submit your data or not, without any consequences.</p>        
              <p>&nbsp;</p>
            </TextList>
            <TextList>
              <h2><strong>Content warnings</strong></h2>
                <p><span >Some of the images may include sensible contents (e.g. amphibians, insects, and birds).</span></p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
            </TextList>
            <TextList>
              <h2><strong>What is the purpose of the study?</strong></h2>
                <p>This study is part of an effort to research the dataset annotation process, to gain a better understanding of the cost/reward of different annotation approaches.</p>
                <p>&nbsp;</p>
            </TextList>
          </div>
        </div>
        
        </Instruction>
        <SubmitButton type="button" onClick={() => setBegin(true)}>Start
        </SubmitButton>
      </Container>
      // <Container>
      //   <Instruction>
      //     <h1>
      //       THERE IS A SERVER ERROR. PAGE UNAVAILABLE
      //     </h1>
      //     <button onClick={() => testMail() }>Test server?</button>
      //   </Instruction>
      // </Container>
    }
    </>
  );
};

export default App;
