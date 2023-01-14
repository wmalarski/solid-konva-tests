import * as PIXI from "pixi.js";
import { createSignal, onCleanup, onMount } from "solid-js";
import { usePixiContext } from "../PixiContext";

export const useDrag = () => {
  const ctx = usePixiContext();

  const [dragId, setDragId] = createSignal<string>();
  const [dragTarget, setDragTarget] = createSignal<PIXI.DisplayObject>();

  const onDragMove = (event: PIXI.FederatedPointerEvent) => {
    const target = dragTarget();
    if (target) {
      target.parent.toLocal(event.global, undefined, target.position);
    }
  };

  const onDragStart = (target: PIXI.DisplayObject, sampleId: string) => {
    setDragId(sampleId);
    setDragTarget(target);
    ctx.app.stage.on("pointermove", onDragMove);
  };

  const onDragEnd = () => {
    const id = dragId();
    const target = dragTarget();
    if (target && id) {
      ctx.app.stage.off("pointermove", onDragMove);
      ctx.onValueChange(
        "samples",
        (sample) => sample.id === id,
        "shape",
        "x",
        target.x
      );
      ctx.onValueChange(
        "samples",
        (sample) => sample.id === id,
        "shape",
        "y",
        target.y
      );
      setDragId();
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
