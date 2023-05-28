import { Switch, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import { HalfMoon, SunLight } from 'iconoir-react';

export const ThemeSwitcher = () => {
    const { setTheme } = useNextTheme();
    const { isDark } = useTheme();
    return (
        <Switch
            checked={isDark}
            bordered
            size="xl"
            onChange={e => setTheme(e.target.checked ? 'dark' : 'light')}
            iconOn= {<HalfMoon  />}
            iconOff={<SunLight  />}
        />
    )
}