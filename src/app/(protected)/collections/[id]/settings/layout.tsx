import SettingsSidebar from "@/components/settings-sidebar";

function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-[auto_1fr]">
      <SettingsSidebar id={params.id} />
      {children}
    </div>
  );
}

export default SettingsLayout;
