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
    opacity: 0.5,
    stroke: "black",
    strokeScaleEnabled: false,
    strokeWidth: 1,
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
      props.onValueChange(
        "samples",
        (entry) => entry.id === props.sample.id,
        "shape",
        { x: event.target.x(), y: event.target.y() }
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

  createEffect(() => {
    rect.on("transformend", (event) => {
      const shape: Rectangle = {
        height: event.target.height() * event.target.scaleY(),
        width: event.target.width() * event.target.scaleX(),
        x: event.target.x(),
        y: event.target.y(),
      };
      event.target.scaleX(1);
      event.target.scaleY(1);
      props.onValueChange(
        "samples",
        (entry) => entry.id === props.sample.id,
        "shape",
        shape
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
