import * as PIXI from "pixi.js";
import { createSignal, onCleanup, onMount } from "solid-js";
import { usePixiContext } from "./PixiContext";

export const createDragging = () => {
  const ctx = usePixiContext();

  const [dragTarget, setDragTarget] = createSignal<PIXI.DisplayObject>();

  const onDragMove = (event: PIXI.FederatedPointerEvent) => {
    const target = dragTarget();
    if (target) {
      target.parent.toLocal(event.global, undefined, target.position);
    }
  };

  const onDragStart = (target: PIXI.DisplayObject) => {
    setDragTarget(target);
    ctx.app.stage.on("pointermove", onDragMove);
  };

  const onDragEnd = () => {
    const target = dragTarget();
    if (target) {
      ctx.app.stage.off("pointermove", onDragMove);
      target.alpha = 1;
      setDragTarget();
    }
  };

  onMount(() => {
    ctx.app.stage.on("pointerup", onDragEnd);
    ctx.app.stage.on("pointerupoutside", onDragEnd);
  });

  onCleanup(() => {
    ctx.app.stage.off("pointerup", onDragEnd);
    ctx.app.stage.off("pointerupoutside", onDragEnd);
  });

  return { onDragStart };
};
