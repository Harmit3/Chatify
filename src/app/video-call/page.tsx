"use client"

import dynamic from "next/dynamic";

const newLocal = dynamic(() => import("./video-ui-kit"), { ssr: false });
const DynamicVideoUI=newLocal;

export default function VideoCall(){
    return <DynamicVideoUI />;
}