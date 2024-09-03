/*---------------------------------------------------------
*	Author:			Travolgi
*	Theme:			Cyberwind
*	Module:			Canvas
*	Version:			1.0.0
*	Created:	 		03/06/2024
*	Last update:	03/06/2024
---------------------------------------------------------*/

const particlesCanvas = getElement('#particlesCanvas');
const wavesCanvas = getElement('#wavesCanvas');

if (particlesCanvas) {
	const ctx = particlesCanvas.getContext('2d');

	particlesCanvas.width = window.innerWidth;
	particlesCanvas.height = window.innerHeight;

	window.addEventListener('resize', function() {
		particlesCanvas.width = window.innerWidth;
		particlesCanvas.height = window.innerHeight;
	});

	class Particle {
		constructor(x, y, size, color, velocityX, velocityY) {
			this.x = x;
			this.y = y;
			this.size = size;
			this.color = color;
			this.velocityX = velocityX;
			this.velocityY = velocityY;
		}
		draw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
		update() {
			this.x += this.velocityX;
			this.y += this.velocityY;
			if (this.x + this.size > particlesCanvas.width || this.x - this.size < 0) {
				this.velocityX = -this.velocityX;
			}
			if (this.y + this.size > particlesCanvas.height || this.y - this.size < 0) {
				this.velocityY = -this.velocityY;
			}
			this.draw();
		}
	}

	let particlesArray = [];
	const numberOfParticles = 35;

	function initParticles() {
		particlesArray = [];
		for (let i = 0; i < numberOfParticles; i++) {
			let size = Math.random() * 5 + 1;
			let x = Math.random() * (particlesCanvas.width - size * 2) + size;
			let y = Math.random() * (particlesCanvas.height - size * 2) + size;
			let velocityX = (Math.random() * 2) - 1;
			let velocityY = (Math.random() * 2) - 1;
			let color = 'black';
			particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
		}
	}

	function animateParticles() {
		requestAnimationFrame(animateParticles);
		ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
		particlesArray.forEach(particle => particle.update());
	}

	initParticles();
	animateParticles();
}

if (wavesCanvas) {
	const ctx = wavesCanvas.getContext('2d');
	
	wavesCanvas.width = window.innerWidth;
	wavesCanvas.height = window.innerHeight;

	window.addEventListener('resize', function() {
		wavesCanvas.width = window.innerWidth;
		wavesCanvas.height = window.innerHeight;
		initWaves();
	});

	let lines = [];
	const numLines = 65;
	const waveFrequency = 0.025;
	const waveAmplitude = 20;
	let angleOffset = 0;
	const lineStartRatio = 0.3;

	function initWaves() {
		lines = [];
		const radius = Math.min(wavesCanvas.width, wavesCanvas.height) / 3;
		for (let i = 0; i < numLines; i++) {
			const angle = (i / numLines) * Math.PI * 2;
			const x = wavesCanvas.width / 2 + radius * Math.cos(angle);
			const y = wavesCanvas.height / 2 + radius * Math.sin(angle);
			lines.push({ x, y, angle });
		}
	}

	function drawLines() {
		ctx.clearRect(0, 0, wavesCanvas.width, wavesCanvas.height);
		ctx.beginPath();
		const centerX = wavesCanvas.width / 2;
		const centerY = wavesCanvas.height / 2;
		const radius = Math.min(wavesCanvas.width, wavesCanvas.height) / 3;
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const wave = Math.sin(line.angle + angleOffset) * waveAmplitude;
			const startRadius = radius * lineStartRatio;
			const startX = centerX + (startRadius + wave) * Math.cos(line.angle);
			const startY = centerY + (startRadius + wave) * Math.sin(line.angle);
			const endX = centerX + (radius + wave) * Math.cos(line.angle);
			const endY = centerY + (radius + wave) * Math.sin(line.angle);
			ctx.moveTo(startX, startY);
			ctx.lineTo(endX, endY);
		}
		ctx.strokeStyle = '#a3e635';
		ctx.stroke();
	}

	function animateWaves() {
		requestAnimationFrame(animateWaves);
		drawLines();
		angleOffset += waveFrequency;
	}

	initWaves();
	animateWaves();
}