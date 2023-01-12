import Konva from "konva";
import { Component, createEffect, createSignal, onCleanup } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { getImage } from "~/services/image";
import { ImageEditorValue } from "../../ImageEditor.utils";

type Props = {
  layer: Konva.Layer;
  path: string;
  onValueChange: SetStoreFunction<ImageEditorValue>;
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

  createEffect(() => {
    image()?.on("click", () => {
      props.onValueChange("samples", () => true, "isSelected", false);
    });
  });

  onCleanup(() => {
    image()?.remove();
  });

  return null;
};
