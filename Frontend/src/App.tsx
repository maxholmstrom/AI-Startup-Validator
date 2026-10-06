import { useState } from "react";
import type { ValidationResult } from "./types/ValidationResult";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [problem, setProblem] = useState("");
    const [targetCustomer, setTargetCustomer] = useState("");
    const [businessModel, setBusinessModel] = useState("");

    const [validation, setValidation] =
        useState<ValidationResult | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setError("");
        setValidation(null);

        const startup = {
            name,
            description,
            problem,
            targetCustomer,
            businessModel,
        };

        try {
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

            if (!response.ok) {
                throw new Error("The startup analysis failed.");
            }

            const data: ValidationResult = await response.json();

            setValidation(data);
        } catch (error) {
            console.error(error);

            setError(
                "Something went wrong while analyzing your startup."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className= "app" >
        <header className="header" >
            <div className="logo" >
                <span className="logo-mark" > V </span>
                    < span > Startup Validator </span>
                    </div>

                    < span className = "header-badge" >
                        AI Startup Validator
                            </span>
                            </header>

                            < main className = "main-content" >
                                <section className="hero" >
                                    <span className="eyebrow" >
                                        AI - POWERED STARTUP ANALYSIS
                                            </span>

                                            <h1>
            Is your startup idea
        < span > worth building ? </span>
            </h1>

            <p>
            Describe your idea and get an AI - powered analysis
            of its potential, risks and opportunities.
          </p>
        </section>

        < section className = "form-card" >
            <form onSubmit={ handleSubmit }>

                <div className="form-group" >
                    <label>Startup name </label>

                        < input
    type = "text"
    value = { name }
    onChange = {(e) => setName(e.target.value)
}
placeholder = "What is the name of your startup?"
required
    />
    </div>

    < div className = "form-group" >
        <label>Describe your idea </label>

            < textarea
value = { description }
onChange = {(e) =>
setDescription(e.target.value)
                }
placeholder = "What does your startup do?"
required
    />
    </div>

    < div className = "form-group" >
        <label>
        What problem are you solving ?
            </label>

            < textarea
                value = { problem }
onChange = {(e) =>
setProblem(e.target.value)
                }
placeholder = "Describe the customer problem..."
required
    />
    </div>

    < div className = "form-row" >

        <div className="form-group" >
            <label>Target customer </label>

                < input
type = "text"
value = { targetCustomer }
onChange = {(e) =>
setTargetCustomer(e.target.value)
                  }
placeholder = "Who are your customers?"
required
    />
    </div>

    < div className = "form-group" >
        <label>Business model </label>

            < input
type = "text"
value = { businessModel }
onChange = {(e) =>
setBusinessModel(e.target.value)
                  }
placeholder = "How will you make money?"
required
    />
    </div>

    </div>

    < button
className = "validate-button"
type = "submit"
disabled = { loading }
    >
{
    loading
    ? "Analyzing your idea..."
        : "Validate startup"
}
    </button>

    </form>
    </section>

{
    error && (
        <div className="error-message" >
        { error }
            </div>
        )
}

{
    validation && (
        <section className="results" >

            <div className="results-header" >

                <div>
                <span className="eyebrow" >
                    STARTUP ANALYSIS
                        </span>

                        < h2 > { name } </h2>

                        <p>
    { validation.summary }
    </p>
        </div>

        < div className = "overall-score" >
            <span>STARTUP SCORE </span>

                <strong>
    { validation.overallScore }
    </strong>

        <small> / 100 </small>
        </div>

        </div>

        < div className = "scores-card" >
            <h3>Score breakdown </h3>

                < ScoreBar
    label = "Problem"
    score = { validation.problemScore }
        />

        <ScoreBar
                label="Market"
    score = { validation.marketScore }
        />

        <ScoreBar
                label="Differentiation"
    score = {
        validation.differentiationScore
    }
        />

        <ScoreBar
                label="Monetization"
    score = {
        validation.monetizationScore
    }
        />

        <ScoreBar
                label="Technical feasibility"
    score = { validation.technicalScore }
        />

        <ScoreBar
                label="Go-to-market"
    score = {
        validation.goToMarketScore
    }
        />

        </div>

        < div className = "insight-grid" >

            <div className="insight-card" >
                <span className="card-label" >
                    BIGGEST STRENGTH
                        </span>

                        < h3 > What's working</h3>

                            <p>
    { validation.biggestStrength }
    </p>
        </div>

        < div className = "insight-card" >
            <span className="card-label" >
                BIGGEST RISK
                    </span>

                    < h3 > What could go wrong </h3>

                        <p>
    { validation.biggestRisk }
    </p>
        </div>

        </div>

        < div className = "recommendation-card" >
            <span className="card-label" >
                AI RECOMMENDATION
                    </span>

                    <h3>
                What should you do next ?
        </h3>

        <p>
                { validation.recommendation }
        </p>
        </div>

        </section>
    )
}

</main>
    </div>
  );
}

type ScoreBarProps = {
    label: string;
    score: number;
};

function ScoreBar({
    label,
    score,
}: ScoreBarProps) {
    return (
        <div className= "score-row" >

        <div className="score-info" >
            <span>{ label } </span>
            < strong > { score } / 10 </strong>
            </div>

            < div className = "score-track" >
                <div
          className="score-fill"
    style = {{
        width: `${score * 10}%`,
          }
}
        />
    </div>

    </div>
  );
}

export default App;