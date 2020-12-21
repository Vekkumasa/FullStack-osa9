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
    return Math.floor(Math.random() * (max - min) + min)
}

const calculateExercises = (taulukko: Array<number>, tavoite: number): olio => {
    const reenipaivat = taulukko.filter(x => x > 0);
    const reeniAika = taulukko.reduce((a,b) =>  a + b, 0)
    const success = (reeniAika / taulukko.length) >= tavoite;
    console.log(reeniAika)
    return {
        periodLength: taulukko.length,
        trainingDays: reenipaivat.length,
        success: success,
        rating: getRandom(1,3),
        ratingDescription: "Kaikki menee aina hyvin",
        target: tavoite,
        average: reeniAika / taulukko.length,
    };
}

const exerciseParser = (args: Array<string>): Array<number> => {
    if (args.length < 3) {
        throw new Error("Enemmän lukuja kiitos")
    } else {
        const palautettava = [];
        for (var i = 3; i < args.length; i++) {
            if (!isNaN(Number(args[i]))) {
                palautettava.push(parseFloat(args[i]))
            } else {
                throw new Error("Pelkkiä numeroita kiitos")
            }            
        }
        return palautettava
    }
}

try {
    const tavoite = parseInt(process.argv[2])
    console.log(calculateExercises(exerciseParser(process.argv), tavoite))    
} catch (e) {
    console.log("Error:", e.message)
}
