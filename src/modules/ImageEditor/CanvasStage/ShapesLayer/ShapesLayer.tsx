import Konva from "konva";
import type { Stage } from "konva/lib/Stage";
import { Component, createEffect } from "solid-js";
import { Image } from "./Image";

type Props = {
  path: string;
  stage?: Stage | undefined;
};

export const ShapesLayer: Component<Props> = (props) => {
  const layer = new Konva.Layer({
    draggable: true,
  });

  const rect1 = new Konva.Rect({
    draggable: true,
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
    props.stage?.add(layer);
  });

  createEffect(() => {
    props.stage?.on("contextmenu", (event) => {
      event.evt.preventDefault();
    });
  });

  return <Image layer={layer} path={props.path} />;
};
