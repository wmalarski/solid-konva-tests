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
  onSamplesChange: (samples: Sample[]) => void;
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

  const handleSampleChange = (sample: Sample, index: number) => {
    const samples = [...props.samples];
    samples.splice(index, 1, sample);
    props.onSamplesChange(samples);
  };

  createEffect(() => {
    console.log("SAMPLES", props.samples.length);
  });

  return (
    <>
      <Image layer={layer} path={props.path} />
      <For each={props.samples}>
        {(sample, index) => (
          <Rect
            index={index()}
            sample={sample}
            layer={layer}
            onSampleChange={handleSampleChange}
          />
        )}
      </For>
    </>
  );
};
