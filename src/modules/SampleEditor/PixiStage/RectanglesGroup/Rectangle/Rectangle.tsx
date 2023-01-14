import * as PIXI from "pixi.js";
import { Component, createEffect, onCleanup, onMount } from "solid-js";
import { Sample, Tool, useSelectedId } from "../../../SampleEditor.utils";
import { usePixiContext } from "../../PixiContext";
import { useDragStart } from "./useDragStart";

type Props = {
  sample: Sample;
  tool: Tool;
  onDragStart: (target: PIXI.DisplayObject, sampleId: string) => void;
};

export const Rectangle: Component<Props> = (props) => {
  const ctx = usePixiContext();
  const { selectedId } = useSelectedId();

  const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);

  sprite.alpha = 0.3;
  sprite.interactive = true;
  sprite.cursor = "pointer";
  sprite.anchor.set(0.5);

  onMount(() => {
    ctx.app.stage.addChild(sprite);
  });

  onCleanup(() => {
    ctx.app.stage.removeChild(sprite);
  });

  createEffect(() => {
    if (props.tool === "selector") {
      const onDragStart = () => props.onDragStart(sprite, props.sample.id);
      useDragStart({ onDragStart, sampleId: props.sample.id, sprite });
    }
  });

  createEffect(() => {
    sprite.x = props.sample.shape.x;
  });

  createEffect(() => {
    sprite.y = props.sample.shape.y;
  });

  createEffect(() => {
    sprite.height = props.sample.shape.height;
  });

  createEffect(() => {
    sprite.width = props.sample.shape.width;
  });

  createEffect(() => {
    const isSelected = selectedId() === props.sample.id;
    sprite.tint = isSelected ? 0xff0000 : 0x000000;
  });

  createEffect(() => {
    sprite.cursor = props.tool !== "selector" ? "default" : "pointer";
  });

  return null;
};
