export function logger(label, ...msg) {
  const styled = label === "error"
    ? `\x1B[41;37m[${label}]\x1B[0m`
    : `\x1B[46;37m[${label}]\x1B[0m`
  const line = `${styled} ${msg.join()}`
  if (label === "error") {
    console.error(line)
  }
  else {
    console.warn(line)
  }
}
