export function generateURL(whiteNumbers: (number | null)[] | undefined, redNumbers: (number | null)[] | undefined): string {
    if(whiteNumbers === undefined && redNumbers === undefined) {
        return '';
    }
    if(whiteNumbers === undefined) {
        return '?reds='+redNumbers!.join(',');
    }
    if(redNumbers === undefined) {
        return '?whites='+whiteNumbers.join(',');
    }
    return '?whites='+whiteNumbers.join(',')+'&reds='+redNumbers.join(',');
}