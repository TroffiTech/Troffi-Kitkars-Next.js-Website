export default function isNameStringValid(string: string | undefined) {
    if (!string) return false;
    if (string.length < 3 || string.length > 50) return false;
    const cyryllicOnly = /[а-яА-ЯЁё\s]/;

    for (let i = 0; i < string.length; i++) {
        if (!string[i].match(cyryllicOnly)) {
            return false;
        }
    }

    return true;
}
