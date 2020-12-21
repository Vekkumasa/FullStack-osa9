interface bmiValues {
    pituus: number;
    paino: number;
}

const calculateBmi = (pituus: number, paino: number): string => {
    pituus = pituus / 100;
    pituus = pituus * pituus;
    const bmi = paino / pituus;
    console.log(bmi);

    if (bmi <= 17) {
        return "Merkittävä alipaino";
    } else if (bmi > 17 && bmi < 18.5) {
        return "Normaalia alhaisempi paino";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normaali paino";
    } else if (bmi >= 25 && bmi < 30) {
        return "Lievä ylipaino";
    } else {
        return "Merkittävä ylipaino";
    }
}

const parseArguments = (args: Array<any>): bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    let pituus = 0
    let paino = 0
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        pituus = parseInt(args[2])
        paino = parseInt(args[3])
    } else {
        throw new Error('Provided values were not numbers!');
    }
    if (!isNaN(Number(args[2])) &&  !isNaN(Number(args[3]))) {
        return {
            pituus: pituus,
            paino: paino
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}


try {
    const { pituus, paino } = parseArguments(process.argv)
    console.log(calculateBmi(pituus,paino))
} catch (e) {
    console.log("Error:", e.message)
}

export { 
    calculateBmi,
    parseArguments
 }