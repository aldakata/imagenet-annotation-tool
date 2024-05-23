// ImageNet Annotation Tool - FE
// Copyright (c) 2022-present NAVER Corp.
// MIT License

// Start 
import { Class } from "@models";

export default async (): Promise<Required<Class>[]> => {
  const classes: Required<Class>[] = [];
  await fetch('files.json').then(response => response.json()).then(
    data => { 
      data.array.forEach((element: any) => {
        const e = {} as Required<Class>;
        // console.log('DEBUG element', element);
        e.id = element.id.toString();
        e.wnid = element.wnid;
        e.synset = [element.wnid];
        e.description = element.description;
        e.wikipedia = element.wiki;
        e.n = element.n;
        e.term = element.term;
        e.annotationCount = {
          NO_POINTER_NO_ORIGINAL:0,
          NO_POINTER_ORIGINAL:0,
          POINTER_NO_ORIGINAL:0,
          POINTER_ORIGINAL:0
        }
        classes.push(e);
      });
      // console.log('DEBUG DATA', data);
    });
  // console.log('DEBUG Classes funct', classes)
  return classes;
};

