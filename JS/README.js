// Initialize animations and interactions
document.addEventListener("DOMContentLoaded", () => {
	createStars();
	initObservers();
	initKonamiCode();
});

function createStars() {
	const starfield = document.getElementById("starfield");
	starfield.innerHTML = "";

	for (let i = 0; i < 200; i++) {
		const star = document.createElement("div");
		star.className = "star";
		star.style.width = Math.random() * 3 + "px";
		star.style.height = star.style.width;
		star.style.left = Math.random() * 100 + "%";
		star.style.top = Math.random() * 100 + "%";
		star.style.animationDuration = Math.random() * 3 + 1 + "s";
		starfield.appendChild(star);
	}
}

function initObservers() {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = 1;
					entry.target.style.transform = "translateY(0)";
				}
			});
		},
		{ threshold: 0.1 }
	);

	document.querySelectorAll(".section, .timeline-item").forEach((el) => {
		observer.observe(el);
	});
}

function initKonamiCode() {
	const konamiCode = [
		"ArrowUp",
		"ArrowUp",
		"ArrowDown",
		"ArrowDown",
		"ArrowLeft",
		"ArrowRight",
		"ArrowLeft",
		"ArrowRight",
		"b",
		"a",
	];
	let index = 0;

	document.addEventListener("keydown", (e) => {
		e.key === konamiCode[index] ? index++ : (index = 0);
		if (index === konamiCode.length) {
			document.body.classList.add("konami-mode");
			const ufo = document.querySelector(".ufo");
			ufo.style.animation = "flyby 15s linear infinite";
		}
	});
}

// create starfield effect
const createStarfield = () => {
	const starfield = document.querySelector("#starfield");
	const numStars = 150;
	for (let i = 0; i < numStars; i++) {
		const star = document.createElement("div");
		star.classList.add("star");
		// randomize size and position
		const size = Math.random() * 3 + 1;
		star.style.width = `${size}px`;
		star.style.height = `${size}px`;
		star.style.top = `${Math.random() * 100}vh`;
		star.style.left = `${Math.random() * 100}vw`;
		// random duration for twinkling
		star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);
		// add click event to form constellations
		star.addEventListener("click", (e) => {
			console.log("star clicked at", e.pageX, e.pageY);
		});
		starfield.appendChild(star);
	}
};

// implement typewriter effect for hero section
function typewriterEffect() {
	const el = document.querySelector(".typing-text");
	const text = el.getAttribute("data-text");
	el.innerHTML = ""; // Clear any existing content

	// Create a span for the typed text
	const textSpan = document.createElement("span");
	textSpan.className = "typed-text";
	el.appendChild(textSpan);

	// Create a blinking caret appended after the text
	const caretSpan = document.createElement("span");
	caretSpan.className = "typing-cursor";
	el.appendChild(caretSpan);

	let index = 0;
	const speed = 100; // ms/char

	function type() {
		if (index < text.length) {
			textSpan.textContent += text.charAt(index);
			index++;
			setTimeout(type, speed);
		} else setTimeout(() => caretSpan.remove(), 2000);
	}
	type();
}

const createParticleEffect = () => {
	const particles = document.createElement("div");
	particles.style.position = "fixed";
	particles.style.top = `${Math.random() * window.innerHeight}px`;
	particles.style.left = `${Math.random() * window.innerWidth}px`;
	particles.style.width = "5px";
	particles.style.height = "5px";
	particles.style.background = "var(--primary)";
	particles.style.borderRadius = "50%";
	particles.style.opacity = "0.8";
	particles.style.pointerEvents = "none";
	particles.style.transition = "opacity 1s ease-out";
	document.body.appendChild(particles);
	setTimeout(() => {
		particles.style.opacity = "0";
	}, 50);
	setTimeout(() => {
		particles.remove();
	}, 1000);
};

// implement particle effect on scroll
const particleEffectOnScroll = () => {
	window.addEventListener("scroll", () => createParticleEffect);
};

// konami code detection for UFO easter egg
let keyBuffer = [];

// launch UFO easter egg
const launchUFO = () => {
	const ufo = document.createElement("div");
	ufo.classList.add("ufo");
	document.body.appendChild(ufo);
	// remove UFO after animation
	ufo.addEventListener("animationend", () => {
		ufo.remove();
	});
};

// intersection observer for sections
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = 1;
				entry.target.style.transform = "translateY(0)";
			}
		});
	},
	{ threshold: 0.1 }
);

document.querySelectorAll(".section").forEach((section, index) => {
	observer.observe(section);
	section.style.animationDelay = `${index * 0.2}s`;
});

createStarfield();
typewriterEffect();
particleEffectOnScroll();

let hovered = false;
const modTitle = document.querySelector("#moduleTitle"),
	modules = modTitle.parentElement.querySelectorAll(".module");

modules.forEach((el) => {
	el.addEventListener("mouseenter", () => el.classList.add("hovered"));
	el.addEventListener("mouseleave", () => el.classList.remove("hovered"));
});

modTitle.addEventListener("mouseenter", async () => {
	if (hovered) return;
	hovered = true;

	for (const el of modules) {
		el.classList.add("hovered");

		// anim is .2 seconds
		setTimeout(() => el.classList.remove("hovered"), 200);

		await new Promise((resolve) => setTimeout(resolve, 100));
	}
});

modTitle.addEventListener("mouseleave", () => (hovered = false));
