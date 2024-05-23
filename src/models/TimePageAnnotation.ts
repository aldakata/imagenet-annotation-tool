// ImageNet Annotation Tool - FE
// Copyright (c) 2024-present Albert Catalan.
// MIT License

export interface TimePageAnnotation{
    timeBegin: number;
    timeEnd: number;
    elapsedTime: number;
    pageId: number;
    wnid: string;
    experimentGroup: 0 | 1 | -1;
  }
  