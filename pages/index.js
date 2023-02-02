import Head from "next/head";
import {useState} from "react";
import styles from "./index.module.css";

export default function Home() {
    const [promptInput, setPromptInput] = useState("");
    const [result, setResult] = useState();

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({question: promptInput}),
            });

            const data = await response.json();
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }

            setResult(data.result);
            setPromptInput("");
        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <div className={styles.App}>
            <div className={styles.appHeader}>
                <title>Open Ai Test</title>
                <form className={styles.submit_form} onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="animal"
                        placeholder="Prompt to JavaScript chatbot"
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                    />
                    <input type="submit" value="Submit"/>
                </form>
                <div className={styles.result}>{result}</div>
            </div>
        </div>
    );
}
