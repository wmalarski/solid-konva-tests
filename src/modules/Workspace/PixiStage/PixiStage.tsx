import * as PIXI from "pixi.js";
import { Component, onCleanup, onMount } from "solid-js";
import { SampleEditorValue } from "../Workspace.utils";
import { ImageSprite } from "./ImageSprite";
import { PixiContextProvider } from "./PixiContext";
import { RectanglesGroup } from "./RectanglesGroup/RectanglesGroup";
import { useZoom } from "./useZoom";

type Props = {
  container: HTMLDivElement;
  value: SampleEditorValue;
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

  useZoom({ app });

  return (
    <PixiContextProvider app={app}>
      <ImageSprite path={props.value.path} />
      <RectanglesGroup samples={props.value.samples} tool={props.value.tool} />
    </PixiContextProvider>
  );
};

export default PixiStage;
