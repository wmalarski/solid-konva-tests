import Konva from "konva";
import { Component, createEffect, For } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { ImageEditorValue, Sample } from "../../ImageEditor.utils";
import { Image } from "./Image";
import { Rect } from "./Rect/Rect";

type Props = {
  path: string;
  stage?: Konva.Stage | undefined;
  samples: Sample[];
  onSampleChange: (sample: Sample) => void;
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

  return (
    <>
      <Image
        layer={layer}
        onValueChange={props.onValueChange}
        path={props.path}
      />
      <For each={props.samples}>
        {(sample) => (
          <Rect
            layer={layer}
            onSampleChange={props.onSampleChange}
            onValueChange={props.onValueChange}
            sample={sample}
          />
        )}
      </For>
    </>
  );
};
