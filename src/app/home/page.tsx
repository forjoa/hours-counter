'use client'
import {useSearchParams} from "next/navigation";

export default function Home() {
    const pathname = useSearchParams();
    return (
        <div>
            <span>here we need to say the current url</span>
            <span>{(pathname.get('month') == null).toString()}</span>
        </div>
    )
}
