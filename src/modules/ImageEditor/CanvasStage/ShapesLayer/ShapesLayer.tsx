import Konva from "konva";
import type { Stage } from "konva/lib/Stage";
import { Component, createEffect, For } from "solid-js";
import { Sample } from "../../ImageEditor.utils";
import { Image } from "./Image";
import { Rect } from "./Rect/Rect";

type Props = {
  path: string;
  stage?: Stage | undefined;
  samples: Sample[];
  onSampleChange: (sample: Sample) => void;
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
      <Image layer={layer} path={props.path} />
      <For each={props.samples}>
        {(sample) => (
          <Rect
            sample={sample}
            layer={layer}
            onSampleChange={props.onSampleChange}
          />
        )}
      </For>
    </>
  );
};
