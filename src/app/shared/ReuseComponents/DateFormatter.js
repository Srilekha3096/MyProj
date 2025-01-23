import { format } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { useCompanyData } from './CompanyDataProvider';
import axios from 'axios';
import { BASE_URL } from 'app/services/auth-services';
import numberToWords from 'number-to-words';


// export const DateFormatter = ({ date, dateFormat }) => {
//   const formattedDate = date && dateFormat ? format(new Date(date), dateFormat) : date;
//   return <span>{formattedDate}</span>;
// };

export const DateFormatter = ({ date }) => {
  const companyData = localStorage.getItem('DateFormat');
  // Memoize the formatted date value based on the date and date format
  const formattedDate = useMemo(() => {
    if (companyData && date) {
      return format(new Date(date), companyData);
    }
    return date;
  }, [date, companyData]);
  return <span>{formattedDate}</span>;
};


// export const FormatFloatValue = (value) => {
//   const { inventoryFormatDigit } = useCompanyData()
//   const currencyFormat = localStorage.getItem("CurrencyFormat")

//   const numericValue = parseFloat(value);
//   if (currencyFormat) {
//     try {
//       const formattedValue = new Intl.NumberFormat('en', {
//         style: 'currency',
//         currency: currencyFormat,
//         minimumFractionDigits: inventoryFormatDigit,
//       }).format(numericValue);
//       return formattedValue;
//     } catch (error) {
//       console.error('Failed to format value:', error);
//       return value; // Return original value in case of error
//     }
//   } else {
//     const formattedValue = new Intl.NumberFormat('en-IN', {
//       minimumFractionDigits: inventoryFormatDigit,
//     }).format(numericValue);

//     return formattedValue;
//   }

// };

export const FormatFloatValue = (value) => {
  const { inventoryFormatDigit } = useCompanyData();
  const currencyFormat = localStorage.getItem("CurrencyFormat");

  // Parse the value to a float
  const numericValue = parseFloat(value);

  // Check if the value is a valid number
  if (isNaN(numericValue)) {
    console.error('Invalid numeric value:', value);
    return value; // Return original value if it's not a valid number
  }

  // Default formatting options
  const defaultFractionDigits = inventoryFormatDigit ? inventoryFormatDigit : 2;
  const defaultLocale = 'en-IN';

  // Formatting logic with currency
  try {
    if (currencyFormat) {
      // return new Intl.NumberFormat('en', {
      //   style: 'currency',
      //   currency: currencyFormat,
      //   minimumFractionDigits: defaultFractionDigits,
      //   maximumFractionDigits: defaultFractionDigits,
      // }).format(numericValue);
      const formattedValue = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: currencyFormat || "INR",
        currencyDisplay: 'symbol', // Show the currency symbol
        minimumFractionDigits: defaultFractionDigits,
        maximumFractionDigits: defaultFractionDigits,
      }).format(numericValue);

      // Manually add a space between the currency symbol and the value
      return formattedValue.replace(/(\D+)(\d)/, '$1 $2');
    } else {
      return new Intl.NumberFormat(defaultLocale, {
        style: 'currency',
        currency: "INR",
        currencyDisplay: 'symbol', // Show the currency symbol
        minimumFractionDigits: defaultFractionDigits,
        maximumFractionDigits: defaultFractionDigits,
      }).format(numericValue);
    }
  } catch (error) {
    console.error('Failed to format value:', error);
    return value; // Return original value in case of error
  }
};

export const formatIndianNumber = (number = 0) => {
  if (isNaN(number)) {
    return 0; // Return a message for invalid input
  }
  const numericValue = parseFloat(number);
  // const roundedValue = new Intl.NumberFormat('en-IN').format(numericValue);
  return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 3 }).format(numericValue);
};

export const todayDate = new Date().toISOString().split('T')[0];


export const fetchTransactionSeries = async (name = "") => {
  const comapnyId = parseInt(localStorage.getItem("OrganizationId"));
  const token = localStorage.getItem("accesstoken");
  try {
    const response = await axios.get(`${BASE_URL}/Erpapp/TransactionalseriesCRUD/?Company_Id=${comapnyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    });
    console.log("responseTABLE", response?.data[name]?.Type);
    return response?.data[name]?.Type;
  } catch (error) {
    console.log("failed to fetch transaction series", error);
    throw error;
  }
}

export const ScrollheightForScreenSize = () => {
  const [scrollbarHeight, setScrollbarHeight] = useState([window.innerHeight, window.innerWidth]);

  useEffect(() => {
    const handleResize = () => {
      setScrollbarHeight([window.innerHeight, window.innerWidth]);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return scrollbarHeight;
};

export const useScreenScrollHeight = (formHeight = 1.86, position = 1) => {
  const getInitialHeightAndWidth = () => [Math.round(window.innerHeight / formHeight), Math.round(window.innerWidth / formHeight),
  ];

  const [scrollbarHeight, setScrollbarHeight] = useState(getInitialHeightAndWidth);

  useEffect(() => {
    const handleResize = () => {
      const heightAndWidth = [
        Math.round(window.innerHeight / formHeight),
        Math.round(window.innerWidth / formHeight),
      ];
      setScrollbarHeight(heightAndWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [formHeight]);

  // console.log('ScreenScrollHeight re renders');
  return scrollbarHeight[position - 1];
};

export function FormattedDate(date, format) {
  const dateString = new Date(date);

  // Extract day, month, and year
  const day = dateString.getDate();
  const month = dateString.getMonth() + 1; // Months are 0-based in JavaScript
  const year = dateString.getFullYear();

  let formattedDate = '';

  if (format === 'MM-dd-yyyy') {
    formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
  } else if (format === 'dd-MM-yyyy') {
    formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  } else if (format === 'yyyy-MM-dd') {
    formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
  }

  return formattedDate;
}



export function calculateDateDifference(todayDate, createdDate) {
  const differenceInTime = todayDate.getTime() - createdDate.getTime();
  return Math.floor(differenceInTime / (1000 * 3600 * 24));
}

export const FormatDateFunction = (date) => {
  const companyData = localStorage.getItem('DateFormat');
  // Memoize the formatted date value based on the date and date format
  const formattedDate = useMemo(() => {
    if (companyData && date) {
      return format(new Date(date), companyData);
    }
    return date;
  }, [date, companyData]);
  return formattedDate;
};

export const getCurrentTime = () => {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

function formatCompoundNumbers(numberText) {
  const words = numberText.split('-');
  if (words.length === 2) {
    return words.join(' ');
  }
  return numberText;
}


export function convertCurrencyToText(amount) {
  const [integerPart, decimalPart] = amount.toString().split('.');

  let integerText = numberToWords.toWords(Number(integerPart));
  integerText = formatCompoundNumbers(integerText);  // Format if it's a compound number

  let decimalText = '';
  if (decimalPart) {
      decimalText = numberToWords.toWords(Number(decimalPart));
      decimalText = formatCompoundNumbers(decimalText);  // Format if it's a compound number
  }

  let currencyText = `${integerText.charAt(0).toUpperCase() + integerText.slice(1)} rupee`;

  if (parseInt(integerPart) > 1) {
      currencyText += 's';
  }

  if (decimalText) {
      currencyText += ` and ${decimalText.charAt(0).toUpperCase() + decimalText.slice(1)} paise`;
      if (parseInt(decimalPart) > 1) {
          currencyText += 's';
      }
  }

  return currencyText;
}