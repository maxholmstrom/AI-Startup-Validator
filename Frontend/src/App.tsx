import { useState } from "react";
import type { ValidationResult } from "./type/ValidationResult";

function App() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [problem, setProblem] = useState("");
    const [targetCustomer, setTargetCustomer] = useState("");
    const [businessModel, setBusinessModel] = useState("");
    const [validation, setValidation] = useState<ValidationResult | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const startup = {
            name,
            description,
            problem,
            targetCustomer,
            businessModel,
        };

        const response = await fetch(
            "http://localhost:5005/api/startups/validate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(startup),
            }
        );

        const data: ValidationResult = await response.json();

        setValidation(data);
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
{
    validation && (
        <section>
        <h2>Validation Result </h2>

            <h3> { validation.overallScore } / 100 </h3>

            <p>
            <strong>Problem: </strong> {validation.problemScore}/10
            </p>

            <p>
            <strong>Market: </strong> {validation.marketScore}/10
            </p>

            <p>
            <strong>Differentiation: </strong>{" "}
            {validation.differentiationScore}/10
            </p>

            <p>
            <strong>Monetization: </strong>{" "}
            {validation.monetizationScore}/10
            </p>

            <p>
            <strong>Technical feasibility: </strong>{" "}
            {validation.technicalScore}/10
            </p>

            <p>
            <strong>Go - to - market: </strong>{" "}
            {validation.goToMarketScore}/10
            </p>

            <h3> Summary </h3>
            <p> { validation.summary } </p>

            <h3> Biggest Strength </h3>
            <p> { validation.biggestStrength } </p>

            <h3> Biggest Risk </h3>
            <p> { validation.biggestRisk } </p>

            <h3> Recommendation </h3>
            <p> { validation.recommendation } </p>
        </section>
        )}
    </main>
  );
}

export default App;
