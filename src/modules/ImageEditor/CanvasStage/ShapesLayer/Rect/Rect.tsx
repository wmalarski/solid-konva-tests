import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import { Component, createEffect, onCleanup } from "solid-js";
import { Rectangle } from "~/utils/geometry";
import { Sample } from "../../../ImageEditor.utils";

type Props = {
  layer: Layer;
  sample: Sample;
  onSampleChange: (sample: Sample) => void;
};

export const Rect: Component<Props> = (props) => {
  const rect = new Konva.Rect({
    draggable: true,
    fill: "green",
    stroke: "black",
    strokeWidth: 4,
  });

  createEffect(() => {
    props.layer.add(rect);
  });

  createEffect(() => {
    rect.x(props.sample.shape.x);
  });

  createEffect(() => {
    rect.y(props.sample.shape.y);
  });

  createEffect(() => {
    rect.width(props.sample.shape.width);
  });

  createEffect(() => {
    rect.height(props.sample.shape.height);
  });

  createEffect(() => {
    rect.on("dragend", (event) => {
      const shape: Rectangle = {
        height: event.target.height(),
        width: event.target.width(),
        x: event.target.x(),
        y: event.target.y(),
      };
      props.onSampleChange({ ...props.sample, shape });
    });
  });

  const tr = new Konva.Transformer({
    enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
  });
  tr.nodes([rect]);

  createEffect(() => {
    props.layer.add(tr);
  });

  onCleanup(() => {
    rect.remove();
    tr.remove();
  });

  return null;
};
