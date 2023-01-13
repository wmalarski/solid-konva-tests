import * as PIXI from "pixi.js";
import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { getImage } from "~/services/image";
import { SampleEditorValue } from "../SampleEditor.utils";

type Props = {
  container: HTMLDivElement;
  value: SampleEditorValue;
  onValueChange: SetStoreFunction<SampleEditorValue>;
};

const PixiStage: Component<Props> = (props) => {
  const app = new PIXI.Application();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const view = app.view as any as Node;

  createEffect(() => {
    props.container.appendChild(view);
  });

  onCleanup(() => {
    props.container.removeChild(view);
  });

  const [bunny, setBunny] = createSignal<PIXI.Sprite>();

  createEffect(() => {
    PIXI.Assets.load(getImage({ path: props.value.path })).then((value) => {
      const sprite = new PIXI.Sprite(value);

      sprite.x = app.renderer.width / 2;
      sprite.y = app.renderer.height / 2;

      // Rotate around the center
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;

      // Add the bunny to the scene we are building
      app.stage.addChild(sprite);

      setBunny(sprite);

      return;
    });
  });

  const update = () => {
    const sprite = bunny();
    if (!sprite) {
      return;
    }
    sprite.rotation += 0.01;
  };

  onMount(() => {
    app.ticker.add(update);
  });

  onCleanup(() => {
    app.ticker.remove(update);
  });

  return null;
};

export default PixiStage;
