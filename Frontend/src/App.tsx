import { useState } from "react";

function App() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [problem, setProblem] = useState("");
    const [targetCustomer, setTargetCustomer] = useState("");
    const [businessModel, setBusinessModel] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const startup = {
            name,
            description,
            problem,
            targetCustomer,
            businessModel,
        };

        const response = await fetch("http://localhost:5005/api/startups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(startup),
        });

        const data = await response.json();

        console.log(data);
    }

    return (
        <main>
        <h1>VentureLens </h1>
        <p> Validate your startup idea with AI.</p>

        <form onSubmit={handleSubmit}>
        <div>
        <label>Startup name </label>
            < input
    type = "text"
    value = { name }
    onChange = {(e) => setName(e.target.value)
}
          />
    </div>

    <div>
    <label>Describe your idea </label>
        < textarea
value = { description }
onChange = {(e) => setDescription(e.target.value)}
          />
    </div>

    <div>
    <label>What problem are you solving ? </label>
        <textarea
            value = { problem }
onChange = {(e) => setProblem(e.target.value)}
          />
    </div>

    <div>
    <label>Who is your target customer ? </label>
        <input
            type = "text"
value = { targetCustomer }
onChange = {(e) => setTargetCustomer(e.target.value)}
          />
    </div>

    <div>
    <label>How will the startup make money ? </label>
        <input
            type = "text"
value = { businessModel }
onChange = {(e) => setBusinessModel(e.target.value)}
          />
    </div>

    <button type = "submit">
        Validate idea
            </button>
            </form>
            </main>
  );
}

export default App;
