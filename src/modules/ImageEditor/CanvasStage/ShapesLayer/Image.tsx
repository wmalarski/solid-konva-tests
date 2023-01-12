import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import { Component, createEffect, createSignal, onCleanup } from "solid-js";
import { getImage } from "~/services/image";

type Props = {
  layer: Layer;
  path: string;
};

export const Image: Component<Props> = (props) => {
  const [image, setImage] = createSignal<Konva.Image>();

  createEffect(() => {
    const url = getImage({ path: props.path });
    Konva.Image.fromURL(url, (node: Konva.Image) => {
      props.layer.add(node);
      node.moveToBottom();
      setImage(node);
    });
  });

  onCleanup(() => {
    image()?.remove();
  });

  return null;
};
