export const useWeatherSetting = () => useState("weatherSetting", () => {
    return {
        city: "济宁市"
    }
})

export const useOpenedMusic = () => useState("openedMusic", () => false)