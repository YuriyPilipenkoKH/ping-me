import PreviewSection from '../components/settings/PreviewSection';
import ThemesSection from '../components/settings/ThemesSection';

const SettingsPage = () => {

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>
          <ThemesSection/>
          <PreviewSection/>
      </div>
    </div>
  );
}

export default SettingsPage