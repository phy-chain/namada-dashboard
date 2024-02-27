'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import cls from 'classnames'
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {Announcement} from "@/app/components/Announcement";
import {useApi} from "@/services/api";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Namada dashboard",
//   description: "Shielded App for the Expedition",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [rpcUp, setRpcUp] = useState(true);
  const rpcColor = rpcUp ? 'bg-namada-secondary' : 'bg-namada-danger';

  const {status} = useApi()
  useEffect(() => {
    (async () => {
      try {
        const res = await status()
        const catchingUp = res?.result?.sync_info.catching_up
        // console.log('catching up', catchingUp);
        setRpcUp(!res?.result?.sync_info.catching_up)
      } catch (e) {
        console.error(e);
      }
    })();
  }, [status]);

  const pathname = usePathname();

  return (
    <html lang="en">
    <body className={inter.className}>
    <div className="absolute top-0 left-0 right-0 z-10
       flex w-full justify-between items-center
      bg-namada-primary text-namada-black p-2 transition-colors
      ">
      <a
        href="https://namada.net/shielded-expedition"
        className="flex gap-4 items-center group"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/namada-logo.svg"
          alt="Namada Logo"
          width={30}
          height={37}
          priority
        />
        <p className="text-2xl font-semibold">Namada Shielded Expedition</p>
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
          </span>
        <p className={`m-0 text-sm opacity-50`}>
          <Announcement />
        </p>
      </a>
      <p className="flex gap-2">
          <span className="relative flex h-6 w-6">
            <span
              className={
              `animate-ping absolute inline-flex h-full w-full rounded-full ${rpcColor} opacity-75`
            }>

            </span>
            <span className={`relative inline-flex rounded-full h-6 w-6 ${rpcColor}`}></span>
          </span>
        <a href="https://rpc.namada.validatorade.org" target="_blank">Validatorade RPC</a>
      </p>
    </div>
    {/*<div className="p-20">*/}
      {/*<aside className="flex flex-col gap-4 w-48">*/}
      {/*  <Link className={cls(pathname === '/' && 'underline', "text-namada-secondary")} href="/">Dashboard</Link>*/}
      {/*  <Link className={cls(pathname === '/validators' && 'underline', "text-namada-secondary")} href="/validators">Validators</Link>*/}
      {/*  <Link className={cls(pathname === '/blocks' && 'underline', "text-namada-secondary")} href="/blocks">Blocks</Link>*/}
      {/*  <Link className={cls(pathname === '/transactions' && 'underline', "text-namada-secondary")} href="/transactions">Transactions</Link>*/}
      {/*  <Link className={cls(pathname === '/governance' && 'underline', "text-namada-secondary")} href="/governance">Governance</Link>*/}
      {/*</aside>*/}
      <div>
        {children}
      </div>
    {/*</div>*/}
    </body>
    </html>
  );
}
