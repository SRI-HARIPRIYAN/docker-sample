import express from "express";
import { spawn } from "child_process";
const app = express();
const port = 3000;

app.use(express.json()); // Parse JSON request bodies

app.post("/execute-python", (req, res) => {
	const inputData = req.body.input;

	if (!inputData) {
		return res.status(400).json({ error: "Input data is required" });
	}

	const pythonProcess = spawn("python", ["my_script.py", inputData]);
	let pythonOutput = "";
	let pythonError = "";

	pythonProcess.stdout.on("data", (data) => {
		pythonOutput += data.toString();
	});

	pythonProcess.stderr.on("data", (data) => {
		pythonError += data.toString();
	});

	pythonProcess.on("close", (code) => {
		if (code === 0) {
			console.log("run successfull");
			res.json({ output: pythonOutput.trim() });
		} else {
			res.status(500).json({
				error: `Python script failed with code ${code}`,
				details: pythonError,
			});
		}
	});
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
