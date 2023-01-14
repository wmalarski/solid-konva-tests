import * as PIXI from "pixi.js";
import { createSignal, onCleanup, onMount } from "solid-js";
import { useWorkspaceContext } from "../../WorkspaceContext";
import { usePixiContext } from "../PixiContext";

export const useDrag = () => {
  const pixi = usePixiContext();
  const workspace = useWorkspaceContext();

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
    pixi.app.stage.on("pointermove", onDragMove);
  };

  const onDragEnd = () => {
    const id = dragId();
    const target = dragTarget();
    if (target && id) {
      pixi.app.stage.off("pointermove", onDragMove);
      workspace.onChange(
        "samples",
        (sample) => sample.id === id,
        "shape",
        "x",
        target.x
      );
      workspace.onChange(
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
    pixi.app.stage.on("pointerup", onDragEnd);
    pixi.app.stage.on("pointerupoutside", onDragEnd);
  });

  onCleanup(() => {
    pixi.app.stage.off("pointerup", onDragEnd);
    pixi.app.stage.off("pointerupoutside", onDragEnd);
  });

  return { onDragStart };
};
