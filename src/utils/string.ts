export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatCarDetails = (car_make: string | null, car_model: string | null, car_reg: string | null) => {
    if (!car_make || !car_model || !car_reg) {
        return "-";
    }

    let str;

    if (car_make) {
        str = car_make;
    }

    if (car_model) {
        str += ` ${car_model}`;
    }

    if (car_reg) {
        str += ` (${car_reg})`;
    }

    return str;
}