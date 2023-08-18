const onvif = require('node-onvif');

const enableEncodeList = ['MJPEG4', 'H264'];
const maxHeight = 1080;
const maxWidth = 1920;

// ONVIF 디바이스 검색
const nodeOnvifStartProbe = async () => {
  try {
    const res = await onvif.startProbe().then((cams) => {
      console.log('Discovered Cameras:', cams);
      return cams;
    }).catch((err) => {
      throw new Error(err);
    });
    console.log("--------res-----------");
    console.log(res);

    return res;
  } catch (err) {
    console.log('start probe err');
    console.log(err);
  }
};

const getStreamUrl = async (xaddr, user, password) => {
  console.log("> > > get stream url < < <");
  try {
    const device = new onvif.OnvifDevice({
      xaddr,
      user,
      pass: password,
    });

    await device.init();
    const profile = device.getCurrentProfile();
    const profileList = device.getProfileList();
    console.log("---------- profile list-----------");
    let targetProfile;
    for (const profile of profileList) {
      const encodingType = profile.video.encoder.encoding;
      const encoderResolution = profile.video.encoder.resolution;
      const enableEncode = enableEncodeList.findIndex((encode) => encode === encodingType);

      if (
        enableEncode > -1
        && encoderResolution.width <= maxWidth
        && encoderResolution.height <= maxHeight
      ) {
        console.log('enable');
        targetProfile = {
          ...profile
        };
        break;
      }
      continue;
    }
    console.log('profile');
    console.log(targetProfile);

    return profile.stream;
  } catch (err) {
    console.log('get stream rul error!');
    console.log(err);
  }
}

const runNodeOnvif = async () => {
  console.log("> > > run node onvif < < <");
  const cams = await nodeOnvifStartProbe();
  console.log('cams');
  if (!cams.length) return;

  const streamUrlList = [];
  for await (cam of cams) {
    const url = await getStreamUrl(cam.xaddrs[0], 'admin', '888888');
    streamUrlList.push(url);
  }

  console.log("stream url list");
  console.log(streamUrlList);
};

module.exports = {
  runNodeOnvif
};


