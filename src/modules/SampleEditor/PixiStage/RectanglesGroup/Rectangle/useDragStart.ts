import * as PIXI from "pixi.js";
import { onCleanup, onMount } from "solid-js";
import { useSelectedId } from "../../../SampleEditor.utils";

type Props = {
  sampleId: string;
  sprite: PIXI.DisplayObject;
  onDragStart: () => void;
};

export const useDragStart = (props: Props) => {
  const { selectedId, setSelectedId } = useSelectedId();

  const onPointerDown = () => {
    if (selectedId() !== props.sampleId) {
      setSelectedId(props.sampleId);
      return;
    }

    // TODO: fix anchor to correct position
    props.onDragStart();
  };

  onMount(() => {
    props.sprite.on("pointerdown", onPointerDown);
  });

  onCleanup(() => {
    props.sprite.off("pointerdown", onPointerDown);
  });
};
