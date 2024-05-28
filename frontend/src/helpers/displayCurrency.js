const displayINRCurrency = (num) => {
  const formatter = new Intl.NumberFormat('en-CO', {
    style: "currency",
    currency: 'COP',
    minimumFractionDigits: 2
  })

  return formatter.format(num)

}

export default displayINRCurrency