import { ReactNode } from "react";

interface CardProps {
    icon: ReactNode
    title: string;
    description: string
}

export default function Blackard({ icon, title, description }: CardProps) {
    return (
        <>
            <div className="mt-4 md:mt-auto w-full md:w-auto bg-zinc-800 p-5 md:ml-14">
                <div className="flex ml-5 mb-3">
                    <div className="text-green-600 mr-2 font-black">
                        {icon}
                    </div>
                    <div className="text-xl text-white font-medium">{title}</div>
                </div>
                <div className="text-white mr-5 ml-5">{description}</div>
            </div>
        </>
    )
}