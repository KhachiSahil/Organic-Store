
import { useState } from "react";
import { signIn } from "next-auth/react";
import signup from "@/app/actions/signup";
import { redirect, useRouter } from "next/navigation";


export default function () {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const data = {
        email,
        password,
        username
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        const response = await signup(data)
        if (response.success) {
            router.push("/Dashboard")
        } else {
            alert("An error occured")
        }
    }
    return (
        <div className="bg-leaf bg-no-repeat h-screen w-screen bg-right-bottom align-middle">
            <img src="organic-store-logo5.svg" className="absolute" alt="Logo" />
            <div className="flex justify-center h-screen align-middle items-center bg-transparent">
                <div className="flex flex-col border-2 border-slate-300 shadow-2xl rounded-lg gap-8 items-center p-10 bg-slate-100">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow-lg px-3 py-5 font-semibold rounded-md"
                            placeholder="Username"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow-lg px-3 py-5 font-semibold rounded-md"
                            placeholder="Email "
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow-lg px-3 py-5 font-semibold rounded-md"
                            placeholder="Password"
                        />
                        <input
                            type="submit"
                            onClick={handleSubmit}
                            className="shadow-xl bg-lime-400 hover:bg-lime-700 text-white font-semibold px-14 py-2 rounded-md"
                        />
                    </form>
                    <button
                        onClick={() => signIn('google', { callbackUrl: '/Dashboard' })}
                        className="flex shadow-xl gap-6 bg-lime-400 py-2 px-16 rounded-md text-white font-semibold hover:bg-lime-700"
                    >
                        Signup with
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                preserveAspectRatio="xMidYMid"
                                viewBox="0 0 256 262"
                                id="google"
                            >
                                <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                                <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}