import numeral from "numeral"

interface IFormatNumberProps {
  delimiters: {
    thousands: string
    decimal: string
  }
}

export function formatNumber(
  n: number | string,
  option: IFormatNumberProps = {
    delimiters: {
      thousands: " ",
      decimal: "."
    }
  }
): string {
  if (typeof n === "number") {
    return numeral(n).format("0,0").replace(/,/, option.delimiters.thousands)
  }

  if (typeof n === "string") {
    return numeral(Number(n)).format("0,0").replace(/,/, option.delimiters.thousands)
  }

  return ""
}
