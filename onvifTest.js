const Discovery = require('onvif').Discovery;
const Cam = require('onvif').Cam;

const onvifDiscovery = () => {
  try {
    Discovery.probe((err, cams) => {
      if (err) throw Error(err);

      console.log('cams');
      console.log(cams);
      cams.forEach((cam) => {
        console.log('===========================');
        console.log('hostname: ', cams.hostname);
        console.log('password: ', cam.password);
        console.log('path: ', cam.path);
        console.log('port: ', cam.port);
        console.log('xaddrs: ', cam.xaddrs);
        cam.username = 'admin';
        cam.password = '888888';
        cam.getDeviceInformation((res) => {
          console.log('device info: ', res);
        });
        cam.getServices((res) => {
          console.log('services: ', res);
        });
        const xaddrList = cam.xaddrs;
        xaddrList.forEach((xaddr) => {
          console.log('auth: ', xaddr.auth);
          console.log('host: ', xaddr.host);
          console.log('hostname: ', xaddr.hostname);
          console.log('href: ', xaddr.href);
        });
      })
    })

    // const res = new Promise((resolve, reject) => {
    //   Discovery.probe((err, res) => {
    //     if (err) reject(err);
    //     resolve(res);
    //   })
    // })
    // console.log('-----res--------');
    // console.log(res);
  } catch (err) {
    console.log('onvifDiscovery err');
    console.log(err);
  }
};

const onvifCam = async () => {
  try {
    const cam = new Cam({
      hostname: '192.168.62.200',
      username: 'admin',
      password: '888888',
      port: '10080'
    }, function(err) {
      if (err) {
        console.log('err!!!!!!!');
        console.log(err);
      }
      this.getProfiles((err, res) => {
        console.log('get profiles');
        console.log(res);
      })
      this.absoluteMove({x: 1, y: 1, zoom: 1});
      this.getStreamUri({protocol:'RTSP'}, function(err, stream) {
        console.log('----get stream uri----');
        console.log(stream);
      });
      this.getConfigurations((err, res) => {
        if (err) {
          console.log('configure err');
          console.log(err);
        }
      })
    });
    console.log("===================");
    console.log(cam);
  } catch (err) {
    console.log('onvif cam err');
    console.log(err);
  }
}


const runOnvif = async() => {
  await onvifDiscovery({protocol: 'RTSP'});
  await onvifCam();
};

module.exports = {
  runOnvif
};
