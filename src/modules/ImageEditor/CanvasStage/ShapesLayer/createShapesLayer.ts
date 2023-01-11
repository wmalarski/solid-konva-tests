import Konva from "konva";
import type { Stage } from "konva/lib/Stage";
import { createEffect } from "solid-js";

type Props = {
  stage: () => Stage | undefined;
};

export const createShapesLayer = (props: Props) => {
  const layer = new Konva.Layer();

  const rect1 = new Konva.Rect({
    fill: "green",
    height: 50,
    stroke: "black",
    strokeWidth: 4,
    width: 100,
    x: 20,
    y: 20,
  });

  layer.add(rect1);

  createEffect(() => {
    props.stage()?.add(layer);
  });
};
