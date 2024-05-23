// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AnnotationVersion, Page } from "@constants";
import { Class, Image, TimePageAnnotation } from "@models";
import { isDocument } from "@testing-library/user-event/dist/utils";


export interface AppAtomType {
  error?: string;
  imageNetClass: Class;
  currentImages: Image[];
  debugMode: boolean;
  version: AnnotationVersion;
  assignmentId: string | undefined;
  workerId: string | undefined;
  page: Page;
  blacklistClasses: string[];
  startedAt: number;
  pageStartedAt: number;
  submitCount: number;
  totalSubmitCount: number;
  estimatedTimePage: TimePageAnnotation[];
  isDone: boolean;
  experimentGroup: -1 | 0 | 1;  // -1: Not set yet.
                                // 0: No queue on wether to click on the object at hand.
                                // 1: Queue given.
}

export interface AppSelectorType extends AppAtomType {
  enableShowPoint: boolean;
  enableBlur: boolean;
  isForImageNetHIT: boolean;
}
