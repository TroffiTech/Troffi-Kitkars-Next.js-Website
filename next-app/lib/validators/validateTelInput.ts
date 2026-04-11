export default function isTelStringValid(string: string | undefined) {
    if (!string) return false;
    if (string.length !== 11) return false;

    const numbersOnly = /[0-9]/;

    for (let i = 0; i < string.length; i++) {
        if (!string[i].match(numbersOnly)) {
            return false;
        }
    }

    return true;
}
