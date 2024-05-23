// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
export const IMAGE_NUMBER = process.env.NODE_ENV === "production" ? 48 : 4;
export const TOTAL_SUBMIT_COUNT = 5;
export const NUMBER_OF_WRONG_SAMPLES_PER_CLASS = 7;

export type Page = "annotator" | "admin";

export type AnnotationVersion =
  | "POINTER_ORIGINAL"
  | "NO_POINTER_ORIGINAL"
  | "POINTER_NO_ORIGINAL"
  | "NO_POINTER_NO_ORIGINAL";

export interface AnnotationCount {
  NO_POINTER_NO_ORIGINAL: number;
  NO_POINTER_ORIGINAL: number;
  POINTER_NO_ORIGINAL: number;
  POINTER_ORIGINAL: number;
}
