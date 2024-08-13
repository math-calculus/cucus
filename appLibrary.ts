
import Music from "./components/Music.vue";
import About from "./components/About.vue";
import Weather from './components/Weather.vue';
import Monitor from './components/Monitor.vue';

export interface App {
    name: string;
    icon: string;
    url?: string;
    component?: Component;
    handle?: Function;
}

export const apps: App[] =  [
    {
        name: "Blog",
        icon: "/appIcon/Blog.svg",
        url: "https://blog.cucus.site",
    },
    {
        name: "Lus",
        icon: "/appIcon/Lus.svg",
    },
    {
        name: "Cloud",
        icon: "/appIcon/Cloud.svg",
        url: "https://cloud.cucus.site",
    },
    {
        name: "Music",
        icon: "/appIcon/Music.svg",
        component: Music,
    },
    {
        name: "About",
        icon: "/appIcon/About.svg",
        component: About,
    },
    {
        name: "Weather",
        icon: "/appIcon/Weather.svg",
        component: Weather,
    },
    {
        name: "Monitor",
        icon: "/appIcon/Monitor.svg",
        component: Monitor,
    },
    {
        name: "Genshin",
        icon: "/appIcon/Genshin.svg",
    },
]

export default apps;