import northern from './northern_hemisphere.json';
import southern from './southern_hemisphere.json';

class Availability {
    constructor(
        public months: number[] | null,
        public hours: number[] | null,
    ) {}

    isActive(month: number, hour: number): boolean {
        if (this.months && !this.months.includes(month)) {
            return false;
        }
        if (this.hours && !this.hours.includes(hour)) {
            return false;
        }
        return true;
    }
}

class Bug {
    constructor(
        public name: string,
        public price: number | null,
        public location: string | null,
        public available: Availability,
    ) {}

    isActive(month: number, hour: number): boolean {
        if (this.available) {
            return this.available.isActive(month, hour);
        }
        return false;
    }
}

interface BugJson {
    name: string;
    image_url: string | null;
    price: number | null;
    location: string | null;
    hours: number[] | null;
    months: number[];
}

function parseBugs(data: (BugJson | null)[]): Bug[] {
    let bugs = [];
    for (let bugData of data) {
        if (bugData) {
            bugs.push(new Bug(
                bugData.name,
                bugData.price,
                bugData.location,
                new Availability(bugData.months, bugData.hours)
            ))
        }
    }
    return bugs;
}

const NorthernBugs = parseBugs(northern);
const SouthernBugs = parseBugs(southern);

function PriceCompare(a: Bug, b: Bug): number {
    if (a.price && b.price) {
        return b.price - a.price;
    }
    if (a.price) {
        return -1;
    }
    if (b.price) {
        return 1;
    }
    return 0;
}

export default Bug;

export { NorthernBugs, SouthernBugs, PriceCompare };