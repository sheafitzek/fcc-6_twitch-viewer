const app = {
	closeModal() {
		const modal = document.getElementsByClassName(`modal`);
		const modalContent = document.getElementsByClassName(`modal-content`);

		modal[0].style.display = `none`;

		window.onclick = function onclick(event) {
			event.target === modalContent
			&& (modal[0].style.display = `none`);
		};
	},

	data: [],

	getChannels() {
		const cacheBusterNum = 999999;
		const head = document.querySelector(`head`);

		const requestBase = `https://wind-bow.gomix.me/twitch-api`;
		const requestType = `/streams`;
		const requestStreams = [
			`/cretetion`,
			`/ESL_SC2`,
			`/freecodecamp`,
			`/habathcx`,
			`/noobs2ninjas`,
			`/OgamingSC2`,
			`/RobotCaleb`,
			`/storbeck`,
		];
		const requestId = `requestId=${Math.floor(Math.random() * cacheBusterNum).toString()}`; // 'cache-buster'
		const requestCallback = `&callback=app.setChannels`;

		requestStreams.forEach((item)=> {
			const apiScript = document.createElement(`script`);

			apiScript.src = `${requestBase}${requestType}${item}?${requestId}${requestCallback}`;

			head.appendChild(apiScript);
		});
	},

	onloadFunction() {
		app.getChannels();
	},

	openModal() {
		const modal = document.getElementsByClassName(`modal`);

		modal[0].style.display = `block`;
	},

	refresh() {
		const streams = document.querySelector(`.streams`);
		const streamItems = document.querySelectorAll(`.streamItem`);

		streamItems.forEach(()=> {
			streams.removeChild(streams.lastChild);
		});

		app.getChannels();
	},

	setChannels(payload) {
		app.data.push(payload);

		const head = document.querySelector(`head`);
		const script = head.querySelector(`script`);

		const currentData = app.data[app.data.length - 1];
		const streams = document.querySelector(`.streams`);
		const streamItem = document.createElement(`div`);
		const streamer = `${currentData._links.self
			.split(`/`).pop()}`;
		const channel = `https://www.twitch.tv/${streamer}`;

		streamItem.className = `streamItem`;

		if (payload.stream === null) {
			streamItem.innerHTML = `
				<div class="subStream inactive">
					<div class="icon">
						<img src="media/images/${streamer}.png"/>
					</div>

					<div class="user">
						<a class="user" href="${channel}" rel="noopener noreferrer" target="_blank">
							<h1>${streamer}</h1>
						</a>
					</div>

					<div class="game">
					</div>

					<div class="status">
						<h2>inactive</h2>
					</div>

					<div class="preview">
					</div>
				</div>
			`;
		} else {
			const game = currentData.stream.game;
			const content = currentData.stream.channel.status;

			streamItem.innerHTML = `
				<div class="subStream active">
					<div class="icon">
						<img src="media/images/${streamer}.png"/>
					</div>

					<div class="user">
						<a class="user" href="${channel}" rel="noopener noreferrer" target="_blank">
							<h1>${streamer}</h1>
						</a>
					</div>

					<div class="game">
						<h2>Game:<br>${game}</h2>
					</div>

					<div class="status">
						<h3>Status:<br>${content}</h3>
					</div>

					<div class="preview">
						<img class="preview" src="${currentData.stream.preview.large}"/>
					</div>
				</div>
			`;
		}

		streams.appendChild(streamItem);

		head.removeChild(script);

		app.data = [];
	},

	showAll() {
		const active = document.querySelectorAll(`.active`);
		const inactive = document.querySelectorAll(`.inactive`);

		active.forEach((item)=> {
			item.parentElement.style.display = `block`;
		});

		inactive.forEach((item)=> {
			item.parentElement.style.display = `block`;
		});
	},

	showOffline() {
		const active = document.querySelectorAll(`.active`);
		const inactive = document.querySelectorAll(`.inactive`);

		active.forEach((item)=> {
			item.parentElement.style.display = `none`;
		});

		inactive.forEach((item)=> {
			item.parentElement.style.display = `block`;
		});
	},

	showOnline() {
		const active = document.querySelectorAll(`.active`);
		const inactive = document.querySelectorAll(`.inactive`);

		active.forEach((item)=> {
			item.parentElement.style.display = `block`;
		});

		inactive.forEach((item)=> {
			item.parentElement.style.display = `none`;
		});
	},
};

window.onload = app.onloadFunction;
