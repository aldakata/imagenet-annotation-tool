// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { AnnotationCount } from "@constants";
import { integer } from "aws-sdk/clients/cloudfront";

export interface Class {
  id: string;
  wnid: string;
  synset: string[];
  description: string;
  wikipedia: string;
  n: integer;
  annotationCount?: AnnotationCount;
  term: string;
}
