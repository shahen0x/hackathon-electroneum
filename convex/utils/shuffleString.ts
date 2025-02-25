export function shuffleString(str: string) {
    const characters: string[] = str.split('');

    for (let i = characters.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        // Swap characters[i] and characters[j]
        [characters[j], characters[i]] = [characters[i], characters[j]];
    }

    return characters.join('');
}