import * as PIXI from "pixi.js";
import { Component, onCleanup, onMount } from "solid-js";
import { Rectangle } from "./Rectangle";

type Props = {
  app: PIXI.Application;
};

export const SamplesGraphics: Component<Props> = (props) => {
  const graphics = new PIXI.Graphics();
  graphics.zIndex = 1;

  onMount(() => {
    props.app.stage.addChild(graphics);
  });

  onCleanup(() => {
    props.app.stage.removeChild(graphics);
  });

  return (
    <>
      <Rectangle graphics={graphics} />
    </>
  );
};
