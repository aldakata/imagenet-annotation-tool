// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License
import { ImageNetAnnotation } from "@models";

interface ImageNetAnnotationWithPageCount extends ImageNetAnnotation {
  pageCount: number;
}

interface SearchImageNetAnnotationsRequest {
  hitDatasetName: string;
  imageNetHitID: string;
  workerID: string;
}

export default async (request: SearchImageNetAnnotationsRequest) => {
  const { hitDatasetName, imageNetHitID, workerID } = request;

  const hit: ImageNetAnnotationWithPageCount[] = [] as ImageNetAnnotationWithPageCount[];
  return hit;
};
