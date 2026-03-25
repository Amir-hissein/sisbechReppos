// Règle : si le jour >= 25, la période commence ce mois-ci (25 M → 24 M+1)
//         si le jour <  25, la période a commencé le 25 du mois précédent
export const MONTHS_FR = ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];

export function getMonthlyPeriod(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr + 'T12:00:00'); // Heure de midi pour éviter décalage timezone
    const day = d.getDate();
    const year = d.getFullYear();
    const month = d.getMonth(); // 0-indexed

    let startMonth, startYear, endMonth, endYear;

    if (day >= 25) {
        // Période: 25 de ce mois → 24 du mois suivant
        startMonth = month;
        startYear = year;
        endMonth = month + 1 > 11 ? 0 : month + 1;
        endYear = month + 1 > 11 ? year + 1 : year;
    } else {
        // Période: 25 du mois précédent → 24 de ce mois
        startMonth = month - 1 < 0 ? 11 : month - 1;
        startYear = month - 1 < 0 ? year - 1 : year;
        endMonth = month;
        endYear = year;
    }

    const label = `25 ${MONTHS_FR[startMonth]} ${startYear} → 24 ${MONTHS_FR[endMonth]} ${endYear}`;
    const periodeKey = `${endYear}-${String(endMonth + 1).padStart(2, '0')}`;

    return { label, periodeKey };
}
