import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { VideoEditor } from "~/modules/VideoEditor/VideoEditor";

const Index: Component = () => {
  const [t] = useI18n();

  return (
    <main class="flex min-h-screen flex-col p-16">
      <h1 class="text-4xl">{t("index.title")}</h1>
      <VideoEditor />
    </main>
  );
};

export default Index;
