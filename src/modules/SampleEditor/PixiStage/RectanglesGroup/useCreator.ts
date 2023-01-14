import * as PIXI from "pixi.js";
import { createSignal, onCleanup, onMount } from "solid-js";
import { Sample, useSelectedId } from "../../SampleEditor.utils";
import { usePixiContext } from "../PixiContext";

export const useCreator = () => {
  const ctx = usePixiContext();
  const { setSelectedId } = useSelectedId();

  const [drawTarget, setDrawTarget] = createSignal<PIXI.Sprite>();

  const onDragMove = (event: PIXI.FederatedPointerEvent) => {
    const target = drawTarget();
    if (target) {
      const [x1, x2] = [event.global.x, target.x].sort((a, b) => a - b);
      const [y1, y2] = [event.global.y, target.y].sort((a, b) => a - b);

      target.x = x1;
      target.y = y1;
      target.width = x2 - x1;
      target.height = y2 - y1;
    }
  };

  const onPointerDown = (event: PIXI.FederatedPointerEvent) => {
    const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    sprite.x = event.globalX;
    sprite.y = event.globalY;
    sprite.width = 0;
    sprite.height = 0;

    ctx.app.stage.addChild(sprite);
    ctx.app.stage.on("pointermove", onDragMove);

    setDrawTarget(sprite);
  };

  const onDragEnd = () => {
    const target = drawTarget();
    if (target) {
      ctx.app.stage.off("pointermove", onDragMove);
      ctx.app.stage.removeChild(target);

      setDrawTarget();

      const newSample: Sample = {
        id: `${Math.random()}`,
        shape: {
          height: target.height,
          width: target.width,
          x: target.x + target.width / 2,
          y: target.y + target.height / 2,
        },
      };

      setSelectedId(newSample.id);

      ctx.onValueChange("samples", (samples) => [...samples, newSample]);
      ctx.onValueChange("tool", "selector");
    }
  };

  onMount(() => {
    ctx.app.stage.on("pointerdown", onPointerDown);
    ctx.app.stage.on("pointerup", onDragEnd);
    ctx.app.stage.on("pointerupoutside", onDragEnd);
  });

  onCleanup(() => {
    ctx.app.stage.off("pointerdown", onPointerDown);
    ctx.app.stage.off("pointerup", onDragEnd);
    ctx.app.stage.off("pointerupoutside", onDragEnd);
  });

  return null;
};
