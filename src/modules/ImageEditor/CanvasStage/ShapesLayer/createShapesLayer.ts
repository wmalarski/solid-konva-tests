import Konva from "konva";
import type { Stage } from "konva/lib/Stage";
import { createEffect } from "solid-js";
import { createImage } from "./createImageLayer";

type Props = {
  path: string;
  stage: () => Stage | undefined;
};

export const createShapesLayer = (props: Props) => {
  const layer = new Konva.Layer({
    draggable: true,
  });

  const rect1 = new Konva.Rect({
    fill: "green",
    height: 50,
    stroke: "black",
    strokeWidth: 4,
    width: 100,
    x: 20,
    y: 20,
    draggable: true,
  });

  createImage({
    layer,
    path: props.path,
  });

  layer.add(rect1);

  createEffect(() => {
    props.stage()?.add(layer);
  });

  createEffect(() => {
    props.stage()?.on("contextmenu", (event) => {
      event.evt.preventDefault();
    });
  });
};
