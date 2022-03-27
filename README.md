# tohsaka888-music-player

## introduction

a music-player based on `<audio>`,support React.

## install

### with `npm`

```bash
npm install tohsaka888-music-player
```

### with `yarn`

```bash
yarn add tohsaka888-music-player
```

## Props

| property           | type     | required | discription                                    |
| ------------------ | -------- | -------- | ---------------------------------------------- |
| musicId            | number   | Y        | music's unique identification                  |
| musicName          | string   |          | the name of music                              |
| src                | string   |          | music url                                      |
| artists            | string[] |          | artists                                        |
| nextPlayEvent      | function |          | callback that click the next button            |
| prevPlayEvent      | function |          | callback that click the previous button        |
| pauseEvent         | function |          | callback that click the pause button           |
| playEvent          | function |          | callback that click the play button            |
| autoPlay           | function |          | as well as the property of `audio`           |
| picUrl             | string   |          | the cover url of music                         |
| likeEvent          | function |          | callback if user like this music               |
| unLikeEvent        | function |          | callback if user unlike this muisc             |
| addPlaylistEvent   | function |          | callback that user add the music into playlist |
| defaultFavourState | boolean  |          | the initial state of `like` button           |

## Useage

```tsx
import React, { useEffect, useState } from "react";
import "./App.css";
import MusicPlayer from "tohsaka888-music-player";

interface Info {
  songs?: Song[];
  privileges?: Privilege[];
  code: number;
  data?: null;
  msg?: string;
}
interface Privilege {
  id: number;
  fee: number;
  payed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  toast: boolean;
  flag: number;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  rscl: null;
  freeTrialPrivilege: FreeTrialPrivilege;
  chargeInfoList: ChargeInfoList[];
}
interface ChargeInfoList {
  rate: number;
  chargeUrl: null;
  chargeMessage: null;
  chargeType: number;
}
interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
}
interface Song {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia: string[];
  pop: number;
  st: number;
  rt: string;
  fee: number;
  v: number;
  crbt: null;
  cf: string;
  al: Al;
  dt: number;
  h: H;
  m: H;
  l: H;
  a: null;
  cd: string;
  no: number;
  rtUrl: null;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData: null;
  tagPicList: null;
  resourceState: boolean;
  version: number;
  songJumpInfo: null;
  entertainmentTags: null;
  single: number;
  noCopyrightRcmd: null;
  rtype: number;
  rurl: null;
  mv: number;
  mst: number;
  cp: number;
  publishTime: number;
  tns: string[];
}
interface H {
  br: number;
  fid: number;
  size: number;
  vd: number;
}
interface Al {
  id: number;
  name: string;
  picUrl: string;
  tns: any[];
  pic_str: string;
  pic: number;
}
interface Ar {
  id: number;
  name: string;
  tns: any[];
  alias: any[];
}

interface Music {
  data: Datum[];
  code: number;
}
interface Datum {
  id: number;
  url: string;
  br: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  type: string;
  gain: number;
  fee: number;
  uf: null;
  payed: number;
  flag: number;
  canExtend: boolean;
  freeTrialInfo: null;
  level: null;
  encodeType: null;
  freeTrialPrivilege: FreeTrialPrivilege;
  freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
  urlSource: number;
}
interface FreeTimeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  type: number;
  remainTime: number;
}

function App() {
  const [url, setUrl] = useState<string>("");
  const [info, setInfo] = useState<{
    name: string;
    artist: string[];
    picUrl: string;
  }>({
    name: "",
    artist: [],
    picUrl: "",
  });
  useEffect(() => {
    const getMusicUrl = async () => {
      const res = await fetch(
        `https://netease-cloud-music-api-tohsaka888.vercel.app/song/url?id=1824020871&realIP=116.25.146.177`
      );
      const data: Music = await res.json();
      setUrl(data.data[0].url);
    };

    const getMusicInfo = async () => {
      const res = await fetch(
        `https://netease-cloud-music-api-tohsaka888.vercel.app/song/detail?ids=1824020871&realIP=116.25.146.177`
      );
      const data: Info = await res.json();
      const songs = data.songs || [];
      const artist = songs[0].ar.map((item) => item.name);
      const name = songs[0].name;
      const picUrl = songs[0].al.picUrl;
      setInfo({ name: name, artist, picUrl });
    };
    getMusicUrl();
    getMusicInfo();
  }, []);
  return (
    <div className="App">
      <MusicPlayer
        musicId={0}
        musicName={info.name}
        autoPlay
        artists={info.artist}
        src={url}
        picUrl={info.picUrl}
      />
    </div>
  );
}

export default App;

```

## Demo

[click me to view the demo](https://623acaa9675953003a0c0f7f-wglvjhvgvt.chromatic.com/?path=/story/example-musicplayer--default)
