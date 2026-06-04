"use client";

import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const YouTubeIcon = (props: IconProps) => (
    <svg viewBox="0 0 28 24" fill="currentColor" aria-label="YouTube" {...props}>
        <path d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.9 2.5 12 2.5 12 2.5h0s-4.9 0-8.2.3c-.5.1-1.5.1-2.4 1C.7 4.5.5 6.2.5 6.2S.2 8.1.2 10v1.9c0 1.9.3 3.8.3 3.8s.2 1.7.9 2.4c.9.9 2.1.9 2.6 1 1.9.2 8 .3 8 .3s4.9 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.3-1.9.3-3.8V10c0-1.9-.3-3.8-.3-3.8zM9.7 14.6V7.9l6.4 3.3-6.4 3.4z" />
    </svg>
);

const FacebookIcon = (props: IconProps) => (
    <svg viewBox="0 0 28 24" fill="currentColor" aria-label="Facebook" {...props}>
        <path d="M22 12.1C22 6.6 17.5 2 12 2S2 6.6 2 12.1C2 17 5.7 21 10.4 22v-7.1H7.8v-2.8h2.6V9.9c0-2.6 1.6-4 3.9-4 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6v1.9h2.9l-.5 2.8h-2.4V22C18.3 21 22 17 22 12.1z" />
    </svg>
);

const TwitterIcon = (props: IconProps) => (
    <svg viewBox="0 0 28 24" fill="currentColor" aria-label="Twitter" {...props}>
        <path d="M21.9 7.1c.01.16.01.32.01.48 0 4.9-3.7 10.6-10.6 10.6-2.1 0-4.1-.6-5.7-1.7.3.04.6.05.9.05 1.8 0 3.5-.6 4.8-1.7-1.7 0-3.1-1.1-3.6-2.7.24.04.48.07.74.07.34 0 .68-.05 1-.13-1.8-.36-3.1-1.9-3.1-3.8v-.05c.52.29 1.12.47 1.76.49-1-.67-1.7-1.8-1.7-3.1 0-.7.18-1.35.52-1.91 1.9 2.3 4.7 3.8 7.9 4-.06-.28-.1-.57-.1-.87 0-2.1 1.7-3.8 3.8-3.8 1.1 0 2.1.46 2.8 1.2.86-.17 1.68-.48 2.42-.91-.28.88-.88 1.62-1.66 2.09.77-.09 1.5-.3 2.18-.6-.52.76-1.17 1.43-1.92 1.97z" />
    </svg>
);


export const InstagramIcon = (props: IconProps) => (
    <svg
        viewBox="0 0 28 24"
        fill="currentColor"
        aria-label="Instagram"
        role="img"
        {...props}
    >
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </svg>
);

export default function SocialIcons() {
    return (
        <div className="flex items-center gap-2">
            <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition-colors hover:text-red-500"
                aria-label="YouTube"
            >
                <YouTubeIcon className="h-6 w-6" />
            </a>

            <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition-colors hover:text-blue-500"
                aria-label="Facebook"
            >
                <FacebookIcon className="h-6 w-6" />
            </a>

            <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition-colors hover:text-sky-400"
                aria-label="Twitter"
            >
                <TwitterIcon className="h-6 w-6" />
            </a>

            <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 transition-colors hover:text-rose-400"
                aria-label="Twitter"
            >
                <InstagramIcon className="h-6 w-6" />
            </a>
        </div>
    );
}
