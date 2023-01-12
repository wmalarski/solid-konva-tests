import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import { Component, createEffect, onCleanup } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { Rectangle } from "~/utils/geometry";
import { ImageEditorValue, Sample } from "../../ImageEditor.utils";
import { Transformer } from "./Transformer";

type Props = {
  layer: Layer;
  sample: Sample;
  onValueChange: SetStoreFunction<ImageEditorValue>;
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
    rect.draggable(props.sample.isSelected);
  });

  createEffect(() => {
    rect.on("dragend", (event) => {
      const shape: Rectangle = {
        height: event.target.height(),
        width: event.target.width(),
        x: event.target.x(),
        y: event.target.y(),
      };
      props.onValueChange(
        "samples",
        (entry) => entry.id === props.sample.id,
        "shape",
        shape
      );
    });
  });

  createEffect(() => {
    rect.on("click", () => {
      if (props.sample.isSelected) {
        return;
      }

      props.onValueChange(
        "samples",
        (entry) => entry.id === props.sample.id,
        "isSelected",
        true
      );
      props.onValueChange(
        "samples",
        (entry) => entry.id !== props.sample.id,
        "isSelected",
        false
      );
    });
  });

  onCleanup(() => {
    rect.remove();
  });

  return (
    <Transformer
      layer={props.layer}
      onValueChange={props.onValueChange}
      rect={rect}
      sample={props.sample}
    />
  );
};
