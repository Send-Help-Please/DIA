export const validateWeekStartsOn = (weekStartsOn: string) => {
    if(!["0", "1", "2", "3", "4", "5", "6", "7"].includes(weekStartsOn)) return "Choose a valid week start day"
}