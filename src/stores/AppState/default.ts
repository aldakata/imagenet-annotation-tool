// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AnnotationVersion, Page, TOTAL_SUBMIT_COUNT } from "@constants";
import { parse } from "query-string";
import { AppAtomType } from "./type";

const {
  version = "NO_POINTER_NO_ORIGINAL",
  assignmentId = undefined,
  workerId = undefined,
  hitId = undefined,
  page = "annotator" as Page,
  hitDatasetName = undefined,
  imageNetHitId = undefined,
} = parse(window.location.search);

console.log("AssignmentId:", assignmentId);
console.log("WorkerId:", workerId);
console.log("HitId:", hitId);
console.log("HitDatasetName:", hitDatasetName);
console.log("ImageNetHitId:", imageNetHitId);

const DefaultApp: AppAtomType = {
  error: undefined,
  imageNetClass: {
    id: "",
    wnid: "",
    description: "",
    synset: [],
    wikipedia: "",
    n: 0,
    term: "",
  },
  currentImages: [],
  // debugMode: false,
  debugMode: true,
  version: version as AnnotationVersion,
  assignmentId: assignmentId as string | undefined,
  workerId: workerId as string | undefined,
  page: page as Page,
  submitCount: 1,
  blacklistClasses: [],
  startedAt: new Date().getTime(),
  pageStartedAt: new Date().getTime(),
  totalSubmitCount: TOTAL_SUBMIT_COUNT,
  estimatedTimePage: [],
  isDone: false,
  experimentGroup: -1,
};

export default DefaultApp;
