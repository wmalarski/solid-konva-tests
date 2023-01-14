import { useI18n } from "@solid-primitives/i18n";
import { Component } from "solid-js";
import { Workspace } from "~/modules/Workspace/Workspace";

const Index: Component = () => {
  const [t] = useI18n();

  return (
    <main class="flex max-h-screen min-h-screen flex-col overflow-hidden p-16">
      <h1 class="text-4xl">{t("index.title")}</h1>
      <Workspace />
    </main>
  );
};

export default Index;
