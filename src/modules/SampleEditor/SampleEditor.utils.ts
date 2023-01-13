import { Rectangle } from "~/utils/geometry";

export type Sample = {
  id: string;
  shape: Rectangle;
  isSelected: boolean;
};

export type SampleEditorValue = {
  path: string;
  tool: "selector" | "creator";
  samples: Sample[];
};
