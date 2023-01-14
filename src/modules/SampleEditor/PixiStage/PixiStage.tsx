import * as PIXI from "pixi.js";
import { Component, onCleanup, onMount } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { SampleEditorValue } from "../SampleEditor.utils";
import { createZoom } from "./createZoom";
import { ImageSprite } from "./ImageSprite";
import { PixiContextProvider } from "./PixiContext";
import { RectanglesGroup } from "./RectanglesGroup/RectanglesGroup";

type Props = {
  container: HTMLDivElement;
  value: SampleEditorValue;
  onValueChange: SetStoreFunction<SampleEditorValue>;
};

const PixiStage: Component<Props> = (props) => {
  const app = new PIXI.Application({ width: 1000 });
  app.stage.interactive = true;
  app.stage.hitArea = app.screen;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const view = app.view as any as Node;

  onMount(() => {
    props.container.appendChild(view);
  });

  onCleanup(() => {
    props.container.removeChild(view);
  });

  createZoom({ app });

  return (
    <PixiContextProvider app={app} onValueChange={props.onValueChange}>
      <ImageSprite path={props.value.path} />
      <RectanglesGroup samples={props.value.samples} tool={props.value.tool} />
    </PixiContextProvider>
  );
};

export default PixiStage;
