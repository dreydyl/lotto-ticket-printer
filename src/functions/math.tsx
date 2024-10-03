export const factorial = function (n: number): number | null {
  n = Number(n);

  if (isNaN(n)) {
    alert("Factorial requires a numeric argument.");
    return null;
  } else if (n < 2) {
    return 1;
  } else {
    return (n * factorial(n - 1)!);
  }
}

export const combinations = function (n: number, r: number): number | null {
  n = Number(n);
  r = Number(r);

  if (isNaN(n) || isNaN(r)) {
    alert("Combinations requires a numeric argument.");
    return null;
  } else {
    return factorial(n)! / (factorial(r)! * factorial(n - r)!);
  }
}