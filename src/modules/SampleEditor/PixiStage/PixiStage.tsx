import * as PIXI from "pixi.js";
import { Component, onCleanup, onMount } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { SampleEditorValue } from "../SampleEditor.utils";
import { ImageSprite } from "./ImageSprite";

type Props = {
  container: HTMLDivElement;
  value: SampleEditorValue;
  onValueChange: SetStoreFunction<SampleEditorValue>;
};

const PixiStage: Component<Props> = (props) => {
  const app = new PIXI.Application();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const view = app.view as any as Node;

  onMount(() => {
    props.container.appendChild(view);
  });

  onCleanup(() => {
    props.container.removeChild(view);
  });

  return (
    <ImageSprite
      app={app}
      onValueChange={props.onValueChange}
      value={props.value}
    />
  );
};

export default PixiStage;
