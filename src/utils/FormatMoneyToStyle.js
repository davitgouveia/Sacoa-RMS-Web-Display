const formatMoneyToStyle = function (value, locale, currency) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  });

  const formattedNumber = formatter.format(value);
  const parts = formatter.formatToParts(value);

  let currencySymbol = parts.filter((obj) => {
    return obj.type === 'currency';
  })[0].value;
  let decimalSymbol = parts.filter((obj) => {
    return obj.type === 'decimal';
  })[0].value;
  let fractionalPart = parts.filter((obj) => {
    return obj.type === 'fraction';
  })[0].value;

  const fraction = decimalSymbol + fractionalPart;
  const money = formattedNumber.replace(fraction, '').replace(currencySymbol, '');

  const splittedValue = [currencySymbol, money, fraction]; //Exemple: [ 'R$', ' 23.919', ',32' ]
  return (
    <>
      <span style={{ color: 'var(--text-color)' }}>{splittedValue[0]}</span>
      <span style={{ color: 'var(--title-color)' }}>{splittedValue[1]}</span>
      <span style={{ color: 'var(--text-color)' }}>{splittedValue[2]}</span>
    </>
  );
};

//ERROR in ./src/components/Reports/TodayTotalSalesReport/TodayTotalSalesReport.js 251:24-42
//export 'formatMoneyToStyle' (imported as 'formatMoneyToStyle') was not found in '../../../utils/FormatMoneyToStyle' (module has no exports)

export { formatMoneyToStyle };
