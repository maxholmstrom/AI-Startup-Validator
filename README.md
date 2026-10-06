# AI Startup Validator

Enter information about a startup idea and get an alysis from a AI model.

## Technologies

- React
- TypeScript
- C#
- ASP.NET Core Minimal API
- Microsoft Foundry
- GPT-6 Luna

## Run the project

### Backend

Create a `.env` file in the Backend folder:

```env
AZURE_OPENAI_ENDPOINT=your-endpoint
AZURE_OPENAI_KEY=your-api-key
AZURE_OPENAI_MODEL=your-model
```

Then run:

```bash
cd Backend
dotnet restore
dotnet run
```

### Frontend

Open another terminal and run:

```bash
cd Frontend
npm install
npm run dev
```

Open the localhost address shown in the terminal, normally:

```text
http://localhost:5173
```

The backend and frontend must both be running for the application to work.
