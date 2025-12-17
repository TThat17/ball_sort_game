export const generateLevel = (numVials = 6, numColors = 4) => {
    const COLORS = ['#FF4136', '#2ECC40', '#0074D9', '#FFDC00', '#B10DC9', '#FF851B', '#39CCCC', '#F012BE'];

    if (numColors > COLORS.length) {
        throw new Error('Not enough colors available');
    }

    // Create pool of balls: 4 of each color
    let pool = [];
    for (let i = 0; i < numColors; i++) {
        for (let j = 0; j < 4; j++) {
            pool.push(COLORS[i]);
        }
    }

    // Shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Distribute into vials
    // We need (numVials - 2) full vials. 2 empty.
    // Actually, standard is usually numColors full vials + 2 empty = numVials?
    // User prompt image shows 6 vials top + 6 bottom = 12 vials?
    // Let's assume standard difficulty: N colors means N vials full + 2 empty.
    // So numVials should be numColors + 2.
    // But we can support custom configs.

    const vials = [];
    const vialsToFill = numColors; // Usually fill N vials if we have N colors * 4 balls.

    // Wait, if we have 4 colors * 4 balls = 16 balls.
    // If we have 6 vials, can we distribute them unevenly? 
    // Standard game: Vials are either 4 full or empty at end. Start is random.
    // Usually start with 'vialsToFill' vials having 4 balls each.

    let ballIndex = 0;
    for (let i = 0; i < numVials; i++) {
        const vial = [];
        if (i < vialsToFill) {
            for (let k = 0; k < 4; k++) {
                vial.push(pool[ballIndex++]);
            }
        }
        vials.push(vial);
    }

    return vials;
};

export const checkWin = (vials) => {
    for (const vial of vials) {
        if (vial.length === 0) continue;
        if (vial.length < 4) return false; // Must be full or empty
        const firstColor = vial[0];
        for (const color of vial) {
            if (color !== firstColor) return false;
        }
    }
    return true;
};
