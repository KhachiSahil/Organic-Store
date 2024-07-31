import Fotter from "@/components/Fotter";
import Appbar from "@/components/appbar";
import { Children } from "react"

export default function template({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
        <>
        <Appbar/>
        {children}
        <Fotter/>
        </>
    )
}