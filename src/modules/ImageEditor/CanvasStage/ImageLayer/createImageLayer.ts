import Konva from "konva";
import type { Shape } from "konva/lib/Shape";
import type { Stage } from "konva/lib/Stage";
import { createEffect } from "solid-js";
import { getImage } from "~/services/image";

type Props = {
  stage: () => Stage | undefined;
  path: string;
};

export const createImageLayer = (props: Props) => {
  const layer = new Konva.Layer();

  Konva.Image.fromURL(getImage({ path: props.path }), (darthNode: Shape) => {
    layer.add(darthNode);
  });

  createEffect(() => {
    props.stage()?.add(layer);
    layer.moveToBottom();
  });
};
