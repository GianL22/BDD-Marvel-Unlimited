import type { AppProps } from 'next/app'

import { NextUIProvider } from '@nextui-org/react'
import { useSSR } from '@nextui-org/react'

import { ApolloProvider } from '@apollo/client'

import { ThemeProvider } from 'next-themes'
import { darkTheme, lightTheme } from '../themes'
import { useApollo } from '@/hooks/useApollo'
import { AuthProvider, ProfileProvider } from '@/context'

function App({ Component, pageProps }: AppProps) {
  const { isBrowser } = useSSR()
  const client = useApollo();
  return (
    isBrowser && (
      <ApolloProvider client={client}>
        <AuthProvider>
          <ProfileProvider>
            <ThemeProvider
              defaultTheme='system'
              attribute='class'
              value={{
                light: lightTheme.className,
                dark: darkTheme.className
              }}
              >
              <NextUIProvider>
                  <Component {...pageProps} />
              </NextUIProvider>
            </ThemeProvider>
          </ProfileProvider>
        </AuthProvider>
      </ApolloProvider>
    )
  )
}

export default App
