const projectLinks = {
	"bluesky-client": "https://github.com/ION606/bluesky-client",
	"workout-app": "https://workout.ion606.com/",
	"AI-overlord": "https://github.com/ION606/AI-overlord",
	"black-hole-sim": "https://github.com/ION606/black-hole-sim",
	"chatjs-main": "https://github.com/Proto-Chat/chatJS-main",
	"custom_discordjs": "https://github.com/ION606/custom_discordjs",
	"learn": "https://github.com/ION606/learn",
	"ion-lang": "https://github.com/The-ION-Language/ION-Lang",
	"vcs": "https://github.com/ION606/VCS",
	"ml-pipeline": "https://github.com/ION606/ML-pipeline",
	"browser-chromium": "https://github.com/ION606/browser-chromium",
	"static-site-hosting": "https://github.com/ION606/static-site-hosting",
	"procgen": "https://github.com/ION606/ProcGen",
	"linkedin-api": "https://github.com/ION606/linkedin-api",
	"github-to-fs": "https://github.com/ION606/github-to-fs",
	"web-to-fish": "https://github.com/ION606/web-to-fish",
	"commit_grabber": "https://github.com/ION606/commit_grabber",
	"youtube-music-meta-extract": "https://github.com/ION606/youtube-music-meta-extract",
	"mailpocket": "https://github.com/ION606/MailPocket",
};

const glitchText = 'T̵̙̻̭̤̺̱̥̖̤̭̗̜͓̓̈́̏͋̔̕̚͠h̴ͽ̳͎̳̱̘̎͛͆̓̐͑͛̈́̕̕͝͝é̷̛̮̥̲͇̊̅͋̏̊̅͊͝͝ ̵̡̛̪̮̦̘̘̼̼̺̪̪̋͋̀̌̇̉̋͌̾̿̓͝͝V̶̡̨̧̨̟̙̻͓̪͇̻̞̥͑̎͋͗̿́̓̌͒͊̈́́̚͠ơ̴̛̱̞̾̎̒̋̾̔̈́̓͑̋̉ȋ̴̡̛͔̙̘̝̙̬̠̹̙̻͖̽̿̓̑̈́͋́̐̕͠d̷̲̲̘̈́̑́̿̆̓̔͋́̓̋̅̏̚';

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
							consoleOutput.innerHTML += `<div>${cmdContent}</div>`;
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
				children: Object.keys(projectLinks),
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
				children: ["self-destruct.exe", "disco-bootloader", 'virus.exe'],
			},
		};

		this.files = {
			"/home/guest": `
Welcome, Guest!

Feel free to explore our terminal. Enjoy the interactive experience, and don't hesitate to check out the projects and fun files. 
Have a great time!
`,
			"/home/ion606/todo.txt": `
1. Take over the world
2. Make coffee ☕
3. Fix CSS in production
4. ????
5. PROFIT!
`,
			"/home/ion606/resume.txt": `
ION606 - Resume

Skills:
- Programming: C, C++, Python, JavaScript, TypeScript, Rust, Go, Java, etc.
- Web: HTML, CSS, React, Vue, Express.js, Node.js, Flask, FastAPI
- ML: TensorFlow, scikit-learn
- Databases: MongoDB, PostgreSQL, MySQL, SQLite, Redis
- Tools: Git, Docker, Kubernetes, Vagrant, Electron, Next.js

Contact: ion606@protonmail.com
`,
			"/home/ion606/.secret_config": `
[disco_settings]
sparkle_level=9001
rainbow_mode=enabled
pink_nodders: online
`,
			"/home/ion606/diary.md": `
Dear Diary,

Today I discovered the Konami code activates a UFO.
Also, typing "make me a sandwich" works sometimes...
Note to self: Buy more coffee.
`,
			"/fun/joke.txt": `
Why do Java developers wear glasses?
Because they can't C#! 

(•_•)
( •_•)>⌐■-■
(⌐■_■)
`,
			"/fun/konami.seq": `
↑ ↑ ↓ ↓ ← → ← → B A

Hint: Try entering this sequence on the main page!
`,
			"/fun/uwu.md": `
# Nya~ Welcome to my secret docs! 

(´• ω •\`)ﾉ Here's some important stuff:
- Pet all the cats 🐈
- Drink more water 💧
- Remember to uwu-ify your code
`,
			"/fun/hackerman.gif": `
[Imagine a cool ASCII art of Hackerman here!]
You are now... HACKERMAN.
`,
			"/projects/bluesky-client": `
bluesky-client

My Bluesky client. See: https://github.com/ION606/bluesky-client
`,
			"/projects/workout-app": `
ION Workout App

An open source workout app! See: https://workout.ion606.com/
`,
			"/projects/AI-overlord": `
AI Overlord

A project to automate everything (and maybe take over the world).
`,
			"/projects/black-hole-sim": `
Black Hole Simulator

A physics simulation of black holes and gravitational lensing.
`,
			"/sys/virus.exe": `
VIRUS.EXE

WARNING: This file is highly suspicious. Running it may cause unexpected behavior!
`,
			"/etc/motd": `
WARNING: This system is powered by ✨imagination✨
Unauthorized access will result in ${glitchText}
`,
			"/etc/syslog": `
[INFO] System booted successfully.
[INFO] User 'ion606' logged in.
[WARN] Too much imagination detected.
[INFO] All systems nominal.
`,
			"/etc/joke_of_the_day": `
Why do programmers prefer dark mode?
Because light attracts bugs! 🐛

How many programmers does it take to change a light bulb?
None, that's a hardware problem!
`,
			"/sys/self-destruct.exe": `
*** WARNING ***
You have attempted to access the self-destruct sequence.
This feature is disabled for your safety.
`,
			"/sys/disco-bootloader": `
Disco Bootloader v1.0

Initializing disco mode...
Boot sequence: 🕺💃🪩
`,
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
				const asciiArts = [
					`
<pre>
         .--.
        |o_o |
        |:_/ |
       //   \\ \\
      (|     | )
     /'\\_   _/\\\`
     \\___)=(___/
</pre>
`,
					`
<pre>
      (╯°□°)╯︵ ┻━┻
</pre>
`
				];

				const joke = jokes[Math.floor(Math.random() * jokes.length)],
					art = asciiArts[Math.floor(Math.random() * asciiArts.length)];
				return `<div style="color:#ff4081">${joke}</div>${art}`;
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
            <li><strong>vi [file]</strong> - Edit or create a file in a simple editor</li>
            <li><strong>mkdir [dir]</strong> - Create a new directory</li>
            <li><strong>rm [file/dir]</strong> - Remove a file or directory</li>
            <li><strong>theme day/night</strong> - Switch between day/night modes</li>
            <li><strong>background [ocean/sunset/forest]</strong> - Set a new background gradient (or reset with no valid argument)</li>
            <li><strong>ufo</strong> - Launch UFO animation</li>
            <li><strong>starfield</strong> - Regenerate stars</li>
            <li><strong>random</strong> - Activate random color chaos!</li>
            <li><strong>secret</strong> - :3</li>
            <li><strong>run [file]</strong> - Run a file (e.g., .exe)</li>
        </ul>`,

		mkdir: (dirName) => {
			const newpath = this.resolvePath(dirName);
			if (this.fs[newpath]) return `Directory exists!`;

			this.fs[newpath] = {
				type: "dir",
				children: [],
			}

			return `Created ${dirName}`;
		},

		rm: (fname) => {
			if (!fname) return "please provide a file/folder to remove";

			const fpath = this.resolvePath(fname),
				strplit = fpath.split('/').filter(Boolean),
				dirName = strplit.length > 1 ? strplit.slice(0, -1).join('/') : `/${strplit[0]}`

			if (!dirName) return `file or folder "${fpath}" not found!`

			// dir
			if (this.fs[fpath]) {
				for (const file of this.fs[fpath]?.children) {
					delete this.files[this.resolvePath(file)];
				}

				if (fpath != '/') {
					const parentDir = fpath.substring(0, fpath.lastIndexOf('/') + 1);

					if (this.fs[parentDir]) {
						this.fs[parentDir].children = this.fs[parentDir].children.filter(f => f !== fname);
					}
				}

				delete this.fs[dirName];
				return "removing folder";
			}
			// file
			else if (this.files[fpath]) {
				this.fs[`/${dirName}`].children = this.fs[`/${dirName}`].children.filter(c => c !== fname);
				delete this.files[fpath];

				return "removing file";
			}


			return `File "${fpath}" not found!`;
		},

		vi: (fname) => {
			const newpath = this.resolvePath(fname);
			if (!this.fs[newpath]) {
				let dirName = newpath.split('/').slice(0, -1).join('/') || "/";

				if (!this.fs[dirName]) return `path "${dirName}" not found!`;
				this.fs[dirName].children.push(fname);
			}

			// Create editor overlay
			let editorOverlay = document.getElementById("vi-editor-overlay");
			if (editorOverlay) editorOverlay.remove();

			editorOverlay = document.createElement("div");
			editorOverlay.id = "vi-editor-overlay";
			editorOverlay.className = "vi-editor-overlay";

			const editorBox = document.createElement("div");
			editorBox.className = "vi-editor-box";

			const title = document.createElement("div");
			title.textContent = `vi — ${fname}`;
			title.className = "vi-editor-title";

			const textarea = document.createElement("textarea");
			textarea.value = this.files[newpath] || "";
			textarea.className = "vi-editor-textarea";

			const btnRow = document.createElement("div");
			btnRow.className = "vi-editor-btnrow";

			const saveBtn = document.createElement("button");
			saveBtn.textContent = "Save & Exit";
			saveBtn.className = "vi-editor-savebtn";
			saveBtn.onclick = () => {
				this.files[newpath] = textarea.value;
				document.body.removeChild(editorOverlay);
				const consoleOutput = document.querySelector(".consoleout");
				consoleOutput.innerHTML += `<div>Saved <b>${fname}</b>!</div>`;
			};

			const cancelBtn = document.createElement("button");
			cancelBtn.textContent = "Cancel";
			cancelBtn.className = "vi-editor-cancelbtn";
			cancelBtn.onclick = () => {
				document.body.removeChild(editorOverlay);
			};

			btnRow.append(saveBtn, cancelBtn);
			editorBox.append(title, textarea, btnRow);
			editorOverlay.appendChild(editorBox);
			document.body.appendChild(editorOverlay);

			// Focus textarea
			setTimeout(() => textarea.focus(), 100);

			// ESC closes editor
			const escListener = (e) => {
				if (e.key === "Escape") {
					cancelBtn.click();
				}
			};
			editorOverlay.addEventListener("keydown", escListener);
			textarea.addEventListener("keydown", (e) => e.stopPropagation());

			return `<span style="color:#7c3aed">Opened editor for <b>${fname}</b>. Press ESC or Cancel to exit.</span>`;
		},

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
			return "🌈 Color changed!";
		},

		secret: () => {
			document.body.classList.toggle("disco-mode");
			return "🎆 Disco mode activated!";
		},

		run: (filePath) => {
			const absPath = terminalFS.resolvePath(filePath.trim());

			// Project links
			if (
				absPath.startsWith("/projects/") &&
				projectLinks[filePath.replace("/projects/", "")]
			) {
				window.open(projectLinks[filePath], "_blank");
				return `<span style="color: #7c3aed">🚀 Opening project: ${projectLinks[filePath]}</span>`;
			}

			// Multi-stage "virus.exe"
			if (absPath === "/projects/virus.exe") {
				triggerVirus()
				setTimeout(1000, () => {
					const el = document.querySelector('.consoleout').lastChild;
					el.textContent = glitchText;
				})
				return "Error running "
			}

			if (absPath === "/sys/self-destruct.exe") {
				return `<span style="color: red; font-weight: bold;">💥 Self-destruct is disabled for your safety.</span>`;
			}
			if (absPath.endsWith(".exe")) {
				return `<span style="color: orange;">🛑 Cannot execute: ${filePath}</span>`;
			}
			return `<span style="color: gray;">Nothing to run for: ${filePath}</span>`;
		},
	};
}

// Initialize terminal system
const terminalFS = new TerminalFS();
