// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import {
  createAnnotations,
  createImageNetAnnotation,
  getClasses,
  getImageNetHit,
  getImages,
  insertPage,
  savePageAnnotations,
} from "@api";
import { useBeforeUnload } from "@hooks";
import { Image, Class, TimePageAnnotation } from "@models";
import { AnnotationsState, AppState, ImageNetState, UserState, AnnotationStateJSONType} from "@stores";
import {
  capitalize,
  generateUUID,
  replaceImageNetImagesWithoutError,
} from "@utils";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  chooseOneOfClasses,
  chooseSomeOfImages,
  projectAnnotationsForImageNet,
  makeid,
} from "./AnnotatorPage.utils";


const useHandler = () => {
  const [annotationsCache, setAnnotationsCache] = useState<AnnotationStateJSONType[]>([]);
  const user = useRecoilValue(UserState);
  const [app, setApp] = useRecoilState(AppState);
  const annotations = useRecoilValue(AnnotationsState);
  const [imageNetState, setImageNetState] = useRecoilState(ImageNetState);
  const [state, setState] = useState({
    loading: true,
    submitting: false,
    error: null,
    finished: false,
  });
  useBeforeUnload(true);

  const handleError = useCallback(
    async (errorImage: Image) => {
      setApp((prevState) => {
        const updatedImageNetImages = replaceImageNetImagesWithoutError(
          app.currentImages,
          app.currentImages,
          errorImage
        );
        return {
          ...prevState,
          imageNetImages: updatedImageNetImages,
        };
      });
    },
    [setApp]
  );

  const createHIT = useCallback(async () => {
    if (
      typeof app.workerId === "undefined"
    ) {
      const workerid = makeid();

      setApp((prevState) => ({
        ...prevState,
        workerId: workerid,
      }));
    }
    const tpa = {
      pageId: app.submitCount - 1,
      timeBegin: -1,
      timeEnd: -1,
      elapsedTime: -1,
      wnid: "",
      experimentGroup: app.experimentGroup,
    } as TimePageAnnotation;

    try {
      setState((state) => ({ ...state, loading: true }));
      setApp((app) => ({ ...app, currentImages: [] }));

      const allClasses: Required<Class>[] = await getClasses();
      const current_class: Class = allClasses[app.submitCount - 1];
      const images: Image[] = getImages(current_class);

      tpa.wnid = current_class.wnid;

      setApp((app) => ({
        ...app, 
        imageNetClass: allClasses[app.submitCount - 1],
        currentImages: images,
        startedAt: new Date().getTime(),
        assignmentId: current_class.wnid,
      }));

    } 
    catch (error: any) {
      setState((state) => ({
        ...state,
        error: error?.response?.data?.error ?? error.message,
      }));
      // console.log("DEBUG CATCH ",error?.response?.data?.error ?? error.message);
    }
    finally {
      setState((state) => ({ ...state, loading: false }));
      tpa.timeBegin = new Date().getTime();
      if (!app.isDone) {
        setApp((app) => ({ 
          ...app, 
          estimatedTimePage: [...app.estimatedTimePage, tpa] 
        }))
  
      }

      // console.log("DEBUG createHIT called again, with value: ", app.submitCount, i);
    }
  }, [app, app.imageNetClass, app.submitCount])

  const submitHandler = useCallback(  async () => {
    // Write the metadata to the corresponding xml.
    // Feed next class and images to the app.
    // console.log("DEBUG app.submitcount < app.totalSubmitCount", app.submitCount, app.totalSubmitCount);
    window.scrollTo(0, 0);
    setState((state) => ({ ...state, submitting: true }));
    try{
      const idx = app.estimatedTimePage.length - 1;
      const now = new Date().getTime();
      var tpa = {} as TimePageAnnotation;
      tpa.pageId = app.estimatedTimePage[idx].pageId;
      tpa.timeBegin = app.estimatedTimePage[idx].timeBegin;
      tpa.timeEnd = now;
      tpa.elapsedTime = now - app.estimatedTimePage[idx].timeBegin;
      tpa.wnid = app.estimatedTimePage[idx].wnid;
      tpa.experimentGroup = app.experimentGroup;
      // console.log("DEBUG tpa", tpa);

      annotations.map((annotation) =>{
        setAnnotationsCache((annotationsCache) => [...annotationsCache, {...annotation, assignmentId: app.assignmentId}]);
      })
      console.log("DEBUG annotationsCache", annotationsCache);
      if (app.submitCount >= app.totalSubmitCount){
        setApp((app) => ({
          ...app,
          isDone: true,
          estimatedTimePage: [...app.estimatedTimePage.slice(0,-1), tpa]
        }));
        
      }
      else{
        setApp((app) => ({
          ...app,
          submitCount: app.submitCount + 1,
          estimatedTimePage: [...app.estimatedTimePage.slice(0,-1), tpa]
        }));


      }
    }catch (error: any) {
      alert(error ?? "Unknown error");
    }finally{
      console.log("DEBUG page time", app.estimatedTimePage);
      setState((state) => ({ ...state, submitting: false }));

    }
  }, [app, annotations, user]);

  const submitPageAnnotations = (async () => {
    window.scrollTo(0, 0);
    try {
      setApp((app) => ({
        ...app,
        currentImages: [] }));
      setState((state) => ({ ...state, submitting: true }));
      savePageAnnotations(annotationsCache , app.estimatedTimePage, app.workerId, app.experimentGroup, app.debugMode)
    } catch (error: any) {
      alert(error ?? "Unknown error");
    }finally{
      setState((state) => ({ ...state, submitting: false, finished: true}));
    }
  });

  const term = 
    useMemo(() => {
      return capitalize(app.imageNetClass?.term ?? "");
    },
    [app.imageNetClass]
  );

  return {
    state,
    createHIT,
    handleError,
    submitHandler,
    submitPageAnnotations,
    term,
  };
};

export default useHandler;
