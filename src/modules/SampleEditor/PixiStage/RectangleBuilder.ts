import * as PIXI from "pixi.js";
import { Component, createSignal, onCleanup, onMount } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import {
  Sample,
  SampleEditorValue,
  Tool,
  useSelectedId,
} from "../SampleEditor.utils";
import { usePixiContext } from "./PixiContext";

type Props = {
  tool: Tool;
  onValueChange: SetStoreFunction<SampleEditorValue>;
};

export const RectangleBuilder: Component<Props> = (props) => {
  const ctx = usePixiContext();
  const { setSelectedId } = useSelectedId();

  const [drawTarget, setDrawTarget] = createSignal<PIXI.Sprite>();

  const onDragMove = (event: PIXI.FederatedPointerEvent) => {
    const target = drawTarget();
    if (target) {
      target.parent.toLocal(event.global, undefined, target.position);
    }
  };

  const onPointerDown = (event: PIXI.FederatedPointerEvent) => {
    if (props.tool !== "creator") {
      return;
    }

    const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    sprite.x = event.globalX;
    sprite.y = event.globalY;
    sprite.width = 100;
    sprite.height = 100;

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

      props.onValueChange("samples", (samples) => [...samples, newSample]);
      props.onValueChange("tool", "selector");

      setSelectedId(newSample.id);
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
