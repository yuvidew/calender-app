const generateRandomColor = (): string => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`; 
};

export const useColorGenerator = (): [() => string] => {

    const generateNewColor = () => {
        return generateRandomColor();
    };

    return [generateNewColor];
};
