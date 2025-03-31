// secret developer console toggle (using backtick key)
const devConsoleToggle = () => {
	const devConsole = document.querySelector("#dev-console");
	if (
		devConsole.style.display === "none" ||
		devConsole.style.display === ""
	) {
		devConsole.style.display = "block";
	} else {
		devConsole.style.display = "none";
		devConsole.querySelector(".consoleout").innerHTML = "";
	}

	// for the command
	return true;
};

document.addEventListener("keydown", (e) => {
	if (e.key === "`") devConsoleToggle();
});

class TerminalFS {
	constructor() {
		const consoleInput = document.querySelector("#dev-console input");
		const consoleOutput = document.createElement("div");
		consoleOutput.className = "consoleout";
		document.querySelector("#dev-console").prepend(consoleOutput);

		// not set bc indexing
		const userInps = [];
		let uInpInd = 0;

		consoleInput?.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				const commandText = e.target.value.trim();
				const [cmd, ...args] = commandText.split(" ");

				if (cmd === "clear") consoleOutput.innerHTML = "";
				else {
					const eggResponse = this.easterEggs(commandText);
					if (eggResponse) {
						consoleOutput.innerHTML += `<div style="color: var(--command-color)">> ${commandText}</div><div>${eggResponse}</div>`;
						e.target.value = "";
					} else {
						const cmdContent = this.commands[cmd]?.(args.join(" "));
						if (!cmdContent) {
							consoleOutput.innerHTML += `<div class="consolerrdiv">🚨 Unknown command: \`${cmd}\`</div>`;
						} else if (cmdContent != true) {
							consoleOutput.innerHTML += cmdContent;
						}
					}
				}

				if (!userInps.includes(commandText)) userInps.push(commandText);
				e.target.value = "";
				uInpInd = 0; // reset history index
				consoleOutput.scrollTop = consoleOutput.scrollHeight;
			} else if (e.key === "ArrowUp") {
				if (userInps.length > 0 && uInpInd < userInps.length) {
					uInpInd++;
					consoleInput.value = userInps[userInps.length - uInpInd];
					consoleInput.setSelectionRange(
						consoleInput.value.length,
						consoleInput.value.length
					);
				}
			} else if (e.key === "ArrowDown") {
				if (uInpInd > 1) {
					uInpInd--;
					consoleInput.value = userInps[userInps.length - uInpInd];
					consoleInput.setSelectionRange(
						consoleInput.value.length,
						consoleInput.value.length
					);
				} else {
					uInpInd = 0;
					consoleInput.value = "";
				}
			}
		});

		this.currentDir = "/";
		this.fs = {
			"/": {
				type: "dir",
				children: ["home", "projects", "fun", "etc", "sys"],
			},
			"/home": { type: "dir", children: ["ion606", "guest"] },
			"/home/ion606": {
				type: "dir",
				children: [
					"resume.txt",
					"todo.txt",
					".secret_config",
					"diary.md",
				],
			},
			"/projects": {
				type: "dir",
				children: [
					"bluesky-client",
					"workout-app",
					"AI-overlord",
					"black-hole-sim",
				],
			},
			"/fun": {
				type: "dir",
				children: ["joke.txt", "konami.seq", "uwu.md", "hackerman.gif"],
			},
			"/etc": {
				type: "dir",
				children: ["motd", "syslog", "joke_of_the_day"],
			},
			"/sys": {
				type: "dir",
				children: ["self-destruct.exe", "disco-bootloader"],
			},
		};

		this.files = {
			"/home/ion606/todo.txt": `
		  1. Take over the world
		  2. Make coffee ☕
		  3. Fix CSS in production
		  4. ????
		  5. PROFIT!
		`,
			"/fun/joke.txt": `
		  Why do Java developers wear glasses?
		  Because they can't C#! 
		  
		  (•_•)
		  ( •_•)>⌐■-■
		  (⌐■_■)
		`,
			"/etc/motd": `
		  WARNING: This system is powered by ✨imagination✨
		  Unauthorized access will result in T̵̙̻̭̤̺̱̥̖̤̭̗̜͓͎̓̈́̏͋̔̕̚͠h̴̳͎̳̱̘̽̎͛͆̓̐͑͛̈́̕̕͝͝é̷̛̮̥̲͇̊̅͋̏̊̅͊͝͝ ̵̡̛̪̮̦̘̘̼̼̺̪̪̋͋̀̌̇̉̋͌̾̿̓͝͝V̶̡̨̧̨̟̙̻͓̪͇̻̞̥͑̎͋͗̿́̓̌͒͊̈́́̚͠ơ̴̛̱̞̾̎̒̋̾̔̈́̓͑̋̉ȋ̴̡̛̙̘̝̙̬̠̹̙̻͖̔̽̿̓͑̈́͋́̐̕͠d̷̲̲̘̈́̑́̿̆̓̔͋́̓̋̅̏̚
		`,
			"/home/ion606/.secret_config": `
		  [disco_settings]
		  sparkle_level=9001
		  rainbow_mode=enabled
		  pink_nodders: online
		`,
			"/fun/uwu.md": `
		  # Nya~ Welcome to my secret docs! 
  
		  (´• ω •\`)ﾉ Here's some important stuff:
		  - Pet all the cats 🐈
		  - Drink more water 💧
		  - Remember to uwu-ify your code
		`,
			"/etc/joke_of_the_day": `
		  Why do programmers prefer dark mode?
		  Because light attracts bugs! 🐛
		  
		  How many programmers does it take to change a light bulb?
		  None, that's a hardware problem!
		`,
			"/home/ion606/diary.md": `
		  Dear Diary,
		  
		  Today I discovered the Konami code activates a UFO.
		  Also, typing "make me a sandwich" works sometimes...
		  Note to self: Buy more coffee.
		`,
			"/home/ion606/resume": document
				.querySelector("html")
				.outerHTML.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#039;"),
		};
	}

	// Easter egg commands
	easterEggs(command) {
		const responses = {
			"sudo make me a sandwich": "What? Make it yourself.",
			"why did the chicken cross the road?":
				'To git commit -m "migration"',
			"open the pod bay doors":
				"I'm sorry Dave, I'm afraid I can't do that",
			"there is no spoon": "System matrix compromised...",
			"beam me up": "Energizing! ♫♪♫ ♪♫♪ ♫♪♫",
		};

		return responses[command.toLowerCase()] || null;
	}

	// Path resolution logic
	resolvePath(targetPath) {
		const path = targetPath.replace(/\/+/g, "/").replace(/\/$/, "") || "/";

		if (path.startsWith("/")) return path;
		else {
			let fullPath = `${this.currentDir}/${path}`.replace(/\/+/g, "/");
			const segments = fullPath.split("/").filter(Boolean);
			const resolvedSegments = [];

			for (const segment of segments) {
				// Current directory, skip
				if (segment === ".") continue;

				// Move up one level if possible
				if (segment === "..") resolvedSegments.pop();
				else resolvedSegments.push(segment);
			}

			return "/" + resolvedSegments.join("/");
		}
	}

	// Command implementations
	commands = {
		ls: (path) => {
			if (!path) path = this.currentDir;

			const absPath = this.resolvePath(path);
			const dir = this.fs[absPath];

			if (!dir)
				return `ls: cannot access '${path}': No such file or directory`;
			if (dir.type !== "dir") return `ls: ${path}: Not a directory`;

			const items = dir.children.map((item) => {
				const fullPath =
					absPath === "/" ? `/${item}` : `${absPath}/${item}`;
				const isDir = this.fs[fullPath]?.type === "dir";
				return `${isDir ? "📁" : "📄"} ${item}${isDir ? "/" : ""}`;
			});

			return `<pre>${absPath}\n${"-".repeat(40)}\n${items.join(
				"\n"
			)}</pre>`;
		},

		cd: (path) => {
			const absPath = this.resolvePath(path);
			if (!this.fs[absPath] || this.fs[absPath].type !== "dir") {
				return `cd: ${path}: No such directory`;
			}
			this.currentDir = absPath;
			return `<pre>moved to ${absPath}</pre>`;
		},

		cat: (filePath) => {
			const absPath = this.resolvePath(filePath);

			if (!this.files[absPath]) {
				// Easter egg for missing files
				const jokes = [
					"File not found... but here's a joke!",
					"404: Humor not found... just kidding!",
					"This file is in another castle! 🍄",
				];
				return (
					`${jokes[Math.floor(Math.random() * jokes.length)]}\n` +
					`        ╚═(███)═╝\n` +
					`        ╚═(███)═╝\n` +
					`        ╚═(███)═╝\n` +
					`        ██╚═╝██\n` +
					`        ███████\n` +
					`        ███████`
				);
			}

			return `<pre>${this.files[absPath].trim()}</pre>`;
		},
		help: () => `
        <ul>
            <li><strong>exit</strong> - Exit the console</li>
            <li><strong>clear</strong> - Clear the console</li>
            <li><strong>help</strong> - Show this help message</li>
            <li><strong>ls [path]</strong> - List directory contents</li>
            <li><strong>cd [path]</strong> - Change directory</li>
            <li><strong>cat [file]</strong> - Display file content</li>
            <li><strong>theme day/night</strong> - Switch between day/night modes</li>
            <li><strong>background [ocean/sunset/forest]</strong> - Set a new background gradient (or reset with no valid argument)</li>
            <li><strong>ufo</strong> - Launch UFO animation</li>
            <li><strong>starfield</strong> - Regenerate stars</li>
            <li><strong>random</strong> - Activate random color chaos!</li>
            <li><strong>secret</strong> - Activate disco mode!</li>
        </ul>`,

		exit: devConsoleToggle,

		theme: (arg) => {
			const themeArg = arg.trim().toLowerCase();
			if (themeArg === "night" || themeArg === "dark") {
				document.body.setAttribute("data-theme", "night");
				return "🌙 Switched to night theme!";
			} else if (themeArg === "day" || themeArg === "light") {
				document.body.setAttribute("data-theme", "day");
				return "☀️ Switched to day theme!";
			} else {
				return "Usage: theme [day/night]";
			}
		},

		background: (arg) => {
			const bgArg = arg.trim().toLowerCase();
			if (bgArg === "ocean") {
				document.body.style.background =
					"linear-gradient(to right, #1e3c72, #2a5298)";
				return "🌊 Ocean background set!";
			} else if (bgArg === "sunset") {
				document.body.style.background =
					"linear-gradient(to right, #ff7e5f, #feb47b)";
				return "🌇 Sunset background set!";
			} else if (bgArg === "forest") {
				document.body.style.background =
					"linear-gradient(to right, #134e5e, #71b280)";
				return "🌲 Forest background set!";
			} else {
				document.body.style.background = "";
				return "Background reset to default!";
			}
		},

		ufo: () => {
			launchUFO();
			return "🛸 UFO launched!";
		},

		starfield: () => {
			createStars();
			return "✨ Starfield regenerated!";
		},

		random: () => {
			const colors = ["#ff4081", "#7c3aed", "#4f46e5", "#00ff88"];
			document.body.style.color =
				colors[Math.floor(Math.random() * colors.length)];
			return "🌈 Color chaos activated!";
		},

		secret: () => {
			document.body.classList.toggle("disco-mode");
			return "🎆 Disco mode activated!";
		},
	};
}

// Initialize terminal system
const terminalFS = new TerminalFS();
