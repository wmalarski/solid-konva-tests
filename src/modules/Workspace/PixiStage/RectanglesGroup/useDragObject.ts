import * as PIXI from "pixi.js";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { usePixiContext } from "../PixiContext";

type Props = {
  onDragEnd?: (event: PIXI.FederatedMouseEvent) => void;
  onDragMove?: (event: PIXI.FederatedMouseEvent) => void;
  onDragStart?: (event: PIXI.FederatedMouseEvent) => void;
  sprite: PIXI.DisplayObject;
};

export const useDragObject = (props: Props) => {
  const pixi = usePixiContext();

  const [isDragging, setIsDragging] = createSignal(false);

  const onDragMove = (event: PIXI.FederatedPointerEvent) => {
    props.sprite.parent.toLocal(event.global, undefined, props.sprite.position);
    props.onDragMove?.(event);
  };

  const onPointerDown = (event: PIXI.FederatedMouseEvent) => {
    if (event.button === 2) {
      return;
    }
    setIsDragging(true);
    pixi.app.stage.on("pointermove", onDragMove);
    props.onDragStart?.(event);
  };

  onMount(() => {
    props.sprite.on("pointerdown", onPointerDown);
  });

  onCleanup(() => {
    props.sprite.off("pointerdown", onPointerDown);
  });

  createEffect(() => {
    if (!isDragging()) {
      return;
    }

    const onDragEnd = (event: PIXI.FederatedMouseEvent) => {
      pixi.app.stage.off("pointermove", onDragMove);
      setIsDragging(false);
      props.onDragEnd?.(event);
    };

    onMount(() => {
      pixi.app.stage.on("pointerup", onDragEnd);
      pixi.app.stage.on("pointerupoutside", onDragEnd);
    });

    onCleanup(() => {
      pixi.app.stage.off("pointerup", onDragEnd);
      pixi.app.stage.off("pointerupoutside", onDragEnd);
    });
  });
};
