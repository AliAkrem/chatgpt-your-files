import { NavigationProgress } from '@mantine/nprogress'
import React from 'react'

export default function FilesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavigationProgress  />

            {children}
        </>
    )
}
