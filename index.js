const ipCameraList = new Array(5).fill('').map((_, idx) => {
	const number = idx < 9 ? `00${idx+1}` : `0${idx+1}`;
	return {
		name: `cctv${idx}`,
		url: `rtsp://210.99.70.120:1935/live/cctv${number}.stream`,
		port: 9000+idx+10,
	}
});

const runOnvifTest = async () => {
	console.log("> > > onvif test < < <");
	const { runOnvif } = require('./onvifTest.js');
	await runOnvif();
	console.log('> > > onvif test done < < <')
};

const runNodeOnvifTest = async () => {
	console.log('> > > node-onvif test< < <')
	const { runNodeOnvif } = require("./nodeOnvifTest.js");
	await runNodeOnvif();
	console.log('> > > node-onvif test done< < <')
}

// * onvif 조회.
// runOnvifTest();
// runNodeOnvifTest();

// * Stream 연결.
const streamList = [];
const connectStream = async() => {
	console.log("----stream start-------");
	const path = require('path');
	try {
		for await (ipCamera of ipCameraList) {
			const Stream = require('node-rtsp-stream');
			const stream = await new Stream({
				name: ipCamera.name,
				streamUrl: ipCamera.url,
				wsPort: ipCamera.port,
				useTcp: true,
				ffmpegPath: path.resolve('D:\\study\\rtsp-test\\ffmpeg-2023-07-19-git-efa6cec759-essentials_build\\bin', 'ffmpeg.exe'),
				ffmpegOptions: { // options ffmpeg flags
					'-stats': '', // an option with no necessary value uses a blank string
					'-r': 20, // options with required values specify the value after the key
				}
			});
			streamList.push(stream);
		}
		// console.log('-----------steram list----------');
		// console.log(streamList);
	} catch (err) {
		console.log('!!!!!err!!!!!!!!!');
		console.log(err)
}};

connectStream();

// (() => {
// 	setTimeout(() => {
// 		console.log("> >  >first stream stop< < < ");
// 		streamList[0].stop();
// 		console.log(streamList);
// 		clearTimeout();
// 	}, 10000);

// 	setInterval(() => {
// 		console.log(streamList);
// 		const count = streamList[0].getClientCount();
// 		console.log(count);
// 	}, 1000)

// 	setTimeout(() => {
// 		console.log('first stream restart');
// 		streamList[0].restart();
// 		console.log(streamList);
// 	}, 20000);
// })();
// console.log('--------stream done----------');

module.exports = ipCameraList;
