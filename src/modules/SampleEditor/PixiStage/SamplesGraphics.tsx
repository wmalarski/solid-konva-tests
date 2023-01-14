import * as PIXI from "pixi.js";
import { Component, For, onCleanup, onMount } from "solid-js";
import { Sample } from "../SampleEditor.utils";
import { usePixiContext } from "./PixiContext";
import { Rectangle } from "./Rectangle";

type Props = {
  samples: Sample[];
};

export const SamplesGraphics: Component<Props> = (props) => {
  const ctx = usePixiContext();

  const graphics = new PIXI.Graphics();

  onMount(() => {
    ctx.app.stage.addChild(graphics);
  });

  onCleanup(() => {
    ctx.app.stage.removeChild(graphics);
  });

  return (
    <For each={props.samples}>{(sample) => <Rectangle sample={sample} />}</For>
  );
};
