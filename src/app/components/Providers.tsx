'use client';

import { HubspotProvider } from 'next-hubspot';
import createEmotionCache from '@/utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';

export const clientSideEmotionCache = createEmotionCache();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<HubspotProvider>
			<CacheProvider value={clientSideEmotionCache}>{children}</CacheProvider>
		</HubspotProvider>
	);
}
