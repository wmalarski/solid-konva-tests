import * as PIXI from "pixi.js";
import { onCleanup, onMount } from "solid-js";
import { useSelectedId } from "../../SampleEditor.utils";
import { usePixiContext } from "../PixiContext";

export const useDeselect = () => {
  const ctx = usePixiContext();
  const { setSelectedId } = useSelectedId();

  const onPointerDown = (event: PIXI.FederatedPointerEvent) => {
    if (event.target === ctx.app.stage) {
      setSelectedId();
    }
  };

  onMount(() => {
    ctx.app.stage.on("pointerdown", onPointerDown);
  });

  onCleanup(() => {
    ctx.app.stage.off("pointerdown", onPointerDown);
  });
};
