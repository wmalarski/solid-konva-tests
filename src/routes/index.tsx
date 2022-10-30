import { useI18n } from "@solid-primitives/i18n";
import { Component, lazy, Show } from "solid-js";
import { isServer } from "solid-js/web";

const CanvasCard = lazy(() => import("~/modules/CanvasCard/CanvasCard"));

const Index: Component = () => {
  const [t] = useI18n();

  return (
    <main class="flex min-h-screen flex-col p-16">
      <h1 class="text-4xl">{t("index.title")}</h1>
      <section class="border-base-300 flex grow flex-col border-2">
        <Show when={!isServer}>
          <CanvasCard />
        </Show>
      </section>
    </main>
  );
};

export default Index;
