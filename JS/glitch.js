async function triggerVirus() {
	const stage1 = 3000; // 3 s red alert
	const stage2 = 3000; // next 3 s data corruption

	const snapshot = await html2canvas(document.body);
	const img = PIXI.Sprite.from(snapshot.toDataURL());

	// wipe page & set black background
	document.body.innerHTML = "";
	document.documentElement.style.cssText =
		"background: black; margin: 0; padding: 0; overflow: hidden;";

	// container for overlays/canvas
	const container = document.createElement("div");
	container.id = "virusContainer";
	Object.assign(container.style, {
		position: "fixed", top: 0, left: 0,
		width: "100vw", height: "100vh",
		display: "flex", alignItems: "center",
		justifyContent: "center", flexDirection: "column",
		color: "white", fontFamily: "monospace",
	});
	document.body.appendChild(container);

	// -- stage 1: red alert + countdown --
	const alert = document.createElement("div");
	alert.id = "virusAlert";
	container.appendChild(alert);

	let countdown = 10;
	alert.textContent = `⚠️ SYSTEM PURGE IN ${countdown} ⚠️`;
	alert.style.cssText = "font-size: 3rem; color: #f00;";

	const timerId = setInterval(() => {
		countdown -= 1;
		alert.textContent = `⚠️ SYSTEM PURGE IN ${countdown} ⚠️`;
		// flash effect
		alert.style.visibility =
			alert.style.visibility === "hidden" ? "visible" : "hidden";
	}, 500);

	// after stage1 ms → stage 2
	setTimeout(() => {
		clearInterval(timerId);
		container.removeChild(alert);

		// -- stage 2: hex stream + shake/flicker --
		const hex = document.createElement("pre");
		hex.id = "virusHex";
		hex.style.cssText = "font-size:1rem; width:80vw; height:100vh; overflow:hidden;";
		container.appendChild(hex);

		// stream fake hex
		const hexChars = "0123456789ABCDEF";
		const streamId = setInterval(() => {
			let line = "";
			for (let i = 0; i < 64; i++) {
				line += hexChars.charAt(Math.random() * 16 | 0);
			}
			hex.textContent += line + "\n";
			hex.scrollTop = hex.scrollHeight;
		}, 50);

		document.body.classList.add("shake", "flicker");

		setTimeout(() => {
			console.debug("▶️ entering stage 3 (glitch filter)");

			clearInterval(streamId);
			container.removeChild(hex);

			// -- stage 3: pixi.js glitch filter on canvas --
			const canvas = document.createElement("canvas");
			canvas.id = "virusCanvas";

			canvas.addEventListener('webglcontextlost', event => {
				event.preventDefault();            // opt into manual recovery
				console.warn('⚠️ my WebGL context was lost');
			}, false);

			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			Object.assign(canvas.style, {
				position: "fixed", top: 0, left: 0,
				width: "100vw", height: "100vh", zIndex: 9999,
			});


			container.appendChild(canvas);

			// initialize PixiJS application
			const app = new PIXI.Application({
				view: canvas,
				resizeTo: window,
				resolution: 1,            // force 1× device pixel ratio
				autoDensity: true         // keep CSS size but lower GPU size
			});

			app.renderer.view.addEventListener('webglcontextlost', (e) => {
				e.preventDefault();
				console.warn('WebGL lost, falling back to CanvasRenderer');
				app.destroy(true, { children: true });
			});


			// Create a full-screen white rectangle as the sprite
			img.width = window.innerWidth;
			img.height = window.innerHeight;
			app.stage.addChild(img);

			// apply realistic glitch filter
			const filter = new PIXI.filters.GlitchFilter({ slices: 20, offset: 10 });
			app.stage.filters = [filter];

			// animate the filter
			app.ticker.add(() => {
				filter.slices = 10 + Math.random() * 30;
				filter.offset = Math.random() * 20;
			});

			console.log(app.renderer)

			// block all input
			const block = (e) => { e.preventDefault(); e.stopImmediatePropagation(); };
			window.addEventListener("keydown", block, true);
			window.addEventListener("mousedown", block, true);
			window.addEventListener("touchstart", block, true);

		}, stage2);
	}, stage1);

	return "";
}
