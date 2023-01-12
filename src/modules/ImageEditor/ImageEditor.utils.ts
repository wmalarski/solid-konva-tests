import { Rectangle } from "~/utils/geometry";

export type Sample = {
  id: string;
  shape: Rectangle;
  isSelected: boolean;
};

export type ImageEditorValue = {
  path: string;
  tool: "selector" | "drag" | "creator";
  samples: Sample[];
};
