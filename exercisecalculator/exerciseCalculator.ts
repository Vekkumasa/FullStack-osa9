interface olio {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const getRandom = (min: number, max:number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

const calculateExercises = (taulukko: Array<number>, tavoite: number): olio => {
    taulukko.shift();
    const reenipaivat = taulukko.filter(x => x > 0);
    const reeniAika = taulukko.reduce((a,b) =>  a + b, 0);
    const success = (reeniAika / taulukko.length) >= tavoite;
    return {
        periodLength: taulukko.length,
        trainingDays: reenipaivat.length,
        success: success,
        rating: getRandom(1,3),
        ratingDescription: "Kaikki menee aina hyvin",
        target: tavoite,
        average: reeniAika / taulukko.length,
    };
};

const exerciseParser = (args: Array<string>): Array<number> => {
    if (args.length < 3) {
        throw new Error("Enemmän lukuja kiitos");
    } else {
        const palautettava = [];
        for (let i = 2; i < args.length; i++) {
            if (!isNaN(Number(args[i]))) {
                palautettava.push(parseFloat(args[i]));
            } else {
                throw new Error("Pelkkiä numeroita kiitos");
            }            
        }
        return palautettava;
    }
};

const parseAndCalculate = (args: Array<string>): olio => {
    const lista = exerciseParser(args);
    return calculateExercises(lista, lista[0]);
};

try {
    console.log(parseAndCalculate(process.argv));

} catch (e) {
    console.log("Error:", e.message);
}

export {
    parseAndCalculate
};
