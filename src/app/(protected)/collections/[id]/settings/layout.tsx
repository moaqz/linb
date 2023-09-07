import { SettingsSidebar } from "@/features/collections/components";

function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-[auto_1fr]">
      <SettingsSidebar collectionId={params.id} />
      {children}
    </div>
  );
}

export default SettingsLayout;
