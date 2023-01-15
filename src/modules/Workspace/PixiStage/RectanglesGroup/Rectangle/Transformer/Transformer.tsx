import * as PIXI from "pixi.js";
import { Component, onCleanup, onMount } from "solid-js";
import { Sample, Tool } from "../../../../Workspace.utils";

type Props = {
  container: PIXI.Container;
  sample: Sample;
  tool: Tool;
};

export const Transformer: Component<Props> = (props) => {
  const anchor = new PIXI.Sprite(PIXI.Texture.WHITE);

  anchor.alpha = 0.3;
  anchor.interactive = true;
  anchor.cursor = "pointer";
  anchor.anchor.set(0.5);
  anchor.width = 10;
  anchor.height = 10;

  onMount(() => {
    props.container.addChild(anchor);
  });

  onCleanup(() => {
    props.container.removeChild(anchor);
  });

  return null;
};
