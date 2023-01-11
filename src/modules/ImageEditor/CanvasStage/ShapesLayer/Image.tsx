import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import type { Shape } from "konva/lib/Shape";
import { Component, createEffect } from "solid-js";
import { getImage } from "~/services/image";

type Props = {
  layer: Layer;
  path: string;
};

export const Image: Component<Props> = (props) => {
  createEffect(() => {
    Konva.Image.fromURL(getImage({ path: props.path }), (darthNode: Shape) => {
      props.layer.add(darthNode);
      darthNode.moveToBottom();
    });
  });
  return null;
};
