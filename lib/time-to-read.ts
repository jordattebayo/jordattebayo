interface Content {
    type: string;
    value: string;
}

export function timeToReadCalculator(contentArray: Array<Content>) {
    const wpm = 125;
    const textConentArray = contentArray.filter(({ type }) => type === "text")
    const textArray = Array.from(textConentArray,({value}) => value)
    const text = textArray.join()
    const words = text.trim().split(" ").length;
    return Math.ceil(words / wpm);
}