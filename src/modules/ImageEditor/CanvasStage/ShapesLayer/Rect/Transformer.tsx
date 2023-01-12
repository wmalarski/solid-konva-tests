import Konva from "konva";
import { Component, createEffect, onCleanup } from "solid-js";
import { Sample } from "../../../ImageEditor.utils";

const allAnchors = ["top-left", "bottom-left", "bottom-right", "top-right"];

type Props = {
  layer: Konva.Layer;
  rect: Konva.Rect;
  sample: Sample;
  onSampleChange: (sample: Sample) => void;
};

export const Transformer: Component<Props> = (props) => {
  const transformer = new Konva.Transformer({
    borderEnabled: false,
    enabledAnchors: [],
    flipEnabled: false,
    keepRatio: false,
    resizeEnabled: true,
    rotateEnabled: false,
  });

  createEffect(() => {
    transformer.nodes([props.rect]);
    props.layer.add(transformer);
  });

  createEffect(() => {
    transformer.enabledAnchors(props.sample.isSelected ? allAnchors : []);
    transformer.borderEnabled(props.sample.isSelected);
  });

  onCleanup(() => {
    transformer.remove();
  });

  return null;
};
