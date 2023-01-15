import * as PIXI from "pixi.js";
import { createEffect, onCleanup, onMount } from "solid-js";
import { Sample } from "../../../Workspace.utils";

type Props = {
  container: PIXI.Container;
  sample: Sample;
};

export const createLabel = (props: Props) => {
  const text = new PIXI.Text("", {
    fontSize: 14,
  });

  onMount(() => {
    props.container.addChild(text);
  });
  onCleanup(() => {
    props.container.removeChild(text);
  });

  createEffect(() => {
    text.text = props.sample.id;
  });

  return text;
};
