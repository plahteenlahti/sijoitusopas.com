export const calculateProfit = (
  rent: number,
  maintananceCharge: number,
  price: number,
  renovationCosts: number,
  transferTax: number
) => {
  const months = 12
  const profit =
    ((months * (parseInt(rent) - parseInt(maintananceCharge))) /
      (parseInt(price) +
        parseInt(renovationCosts) +
        parseInt(transferTax) * parseInt(price))) *
    100

  return profit
}
