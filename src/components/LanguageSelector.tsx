import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'pt-br', name: 'Português (BR)', flag: '🇧🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'zh-tw', name: '繁體中文', flag: '🇹🇼' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
  { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
  { code: 'hy', name: 'Հայերեն', flag: '🇦🇲' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'eu', name: 'Euskera', flag: '🇪🇸' },
  { code: 'bs', name: 'Bosanski', flag: '🇧🇦' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'ca', name: 'Català', flag: '🇪🇸' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' },
  { code: 'tl', name: 'Filipino', flag: '🇵🇭' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'is', name: 'Íslenska', flag: '🇮🇸' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ga', name: 'Gaeilge', flag: '🇮🇪' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'ne', name: 'नेपाली', flag: '🇳🇵' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'sr', name: 'Српски', flag: '🇷🇸' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'cy', name: 'Cymraeg', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
  { code: 'zu', name: 'isiZulu', flag: '🇿🇦' }
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.name}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end">
        <div className="max-h-80 overflow-y-auto">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent transition-colors w-full",
                i18n.language === language.code && "bg-accent"
              )}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="flex-1 text-left">{language.name}</span>
              {i18n.language === language.code && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}