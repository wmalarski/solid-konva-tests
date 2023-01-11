import { Rectangle } from "~/utils/geometry";

export type Sample = {
  id: string;
  shape: Rectangle;
};

export type ImageEditorValue = {
  path: string;
  tool: "selector" | "drag" | "creator";
  samples: Sample[];
};
