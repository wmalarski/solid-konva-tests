import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import type { Shape } from "konva/lib/Shape";
import { getImage } from "~/services/image";

type Props = {
  layer: Layer;
  path: string;
};

export const createImage = (props: Props) => {
  Konva.Image.fromURL(getImage({ path: props.path }), (darthNode: Shape) => {
    props.layer.add(darthNode);
    darthNode.moveToBottom();
  });
};
