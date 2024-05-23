// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AnnotationCount } from "@constants";

export interface Image {
  id: string;
  url: string;
  belongsToThisClass: boolean;
  originalUrl?: string;
  isValid?: boolean;
  classID?: string;
  annotationCount?: AnnotationCount;
}
