import Konva from "konva";
import { Component, createEffect, For } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { ImageEditorValue } from "../../ImageEditor.utils";
import { Image } from "./Image";
import { Rect } from "./Rect";

type Props = {
  stage?: Konva.Stage | undefined;
  value: ImageEditorValue;
  onValueChange: SetStoreFunction<ImageEditorValue>;
};

export const ShapesLayer: Component<Props> = (props) => {
  const layer = new Konva.Layer({
    draggable: true,
  });

  createEffect(() => {
    props.stage?.add(layer);
  });

  createEffect(() => {
    props.stage?.on("contextmenu", (event) => {
      event.evt.preventDefault();
    });
  });

  // const [newShape, setNewShape] = createSignal<Konva.Rect>();

  createEffect(() => {
    // const existingRect = newShape();

    layer.on("click", (event) => {
      if (props.value.tool !== "creator") {
        return;
      }

      const newRect = new Konva.Rect({
        fill: "green",
        opacity: 0.5,
        stroke: "black",
        strokeScaleEnabled: false,
        strokeWidth: 1,
        x: event.evt.x,
        y: event.evt.y,
      });

      layer.add(newRect);

      // setNewShape(newRect);
    });
  });

  // createEffect(() => {});

  return (
    <>
      <Image
        layer={layer}
        onValueChange={props.onValueChange}
        path={props.value.path}
      />
      <For each={props.value.samples}>
        {(sample) => (
          <Rect
            layer={layer}
            onValueChange={props.onValueChange}
            sample={sample}
            value={props.value}
          />
        )}
      </For>
    </>
  );
};
