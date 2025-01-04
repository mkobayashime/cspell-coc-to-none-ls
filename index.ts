#!/usr/bin/env bun

import { readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { styleText } from "node:util";

void (async () => {
	const currentDir = process.cwd();

	const cocSettingsPath = path.resolve(currentDir, ".vim", "coc-settings.json");

	const cocSettings = JSON.parse((await readFile(cocSettingsPath)).toString());
	if (!cocSettings) return;

	const words = cocSettings["cSpell.words"] as string[];
	if (!words) return;

	await writeFile(
		path.resolve(currentDir, ".cspell.json"),
		JSON.stringify({ words }, null, 2),
	);
	console.log(styleText("green", "Created .cspell.json"));

	await rm(cocSettingsPath);
	console.log(styleText("green", "Removed coc-settings.json"));
})();
