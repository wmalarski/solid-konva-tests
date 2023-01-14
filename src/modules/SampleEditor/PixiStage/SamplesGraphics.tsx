import * as PIXI from "pixi.js";
import { Component, onCleanup, onMount } from "solid-js";
import { usePixiContext } from "./PixiContext";
import { Rectangle } from "./Rectangle";

export const SamplesGraphics: Component = () => {
  const ctx = usePixiContext();

  const graphics = new PIXI.Graphics();
  graphics.zIndex = 1;

  onMount(() => {
    ctx.app.stage.addChild(graphics);
  });

  onCleanup(() => {
    ctx.app.stage.removeChild(graphics);
  });

  return (
    <>
      <Rectangle graphics={graphics} />
    </>
  );
};
