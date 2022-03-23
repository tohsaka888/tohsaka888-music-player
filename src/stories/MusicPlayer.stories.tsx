import React, { useEffect, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import MusicPlayer from "../MusicPlayer";
import { Player } from "../types";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/MusicPlayer",
  component: MusicPlayer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof MusicPlayer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MusicPlayer> = (args) => (
  <MusicPlayer {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  id: 0,
  src: "",
};

interface Music {
  data: Datum[];
  code: number;
}
interface Datum {
  id: number;
  url: string;
  br: number;
  size: number;
  md5: null;
  code: number;
  expi: number;
  type: null;
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
interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: null;
}

const getMusicUrl = async (): Promise<Partial<Player> | undefined> => {
  const res = await fetch(
    `https://netease-cloud-music-api-tohsaka888.vercel.app/song/url?id=1824020871&realIP=116.25.146.177`
  );
  const data: Music = await res.json();
  return {
    musicName: "One Last Kiss",
    artists: ["宇多田光"],
    src: data.data[0].url,
    id: data.data[0].id,
    autoPlay: true,
    picUrl:
      "http://p1.music.126.net/l3G4LigZnOxFE9lB4bz_LQ==/109951165791860501.jpg?param=130y130",
  };
};

const Example = () => {
  const [music, setMusic] = useState<Partial<Player> | undefined>(undefined);
  useEffect(() => {
    getMusicUrl().then((data) => setMusic(data));
  }, []);
  return <>{music && <MusicPlayer {...music} id={music.id || 0} />}</>;
};

const DataTemplate: ComponentStory<typeof MusicPlayer> = (args) => <Example />;

export const Secondary = DataTemplate.bind({});
Secondary.args = {};

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Button",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Button",
// };
