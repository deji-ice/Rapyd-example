export function removeWordsOutsideCodeBlock(str) {
  if (str.startsWith("```") && str.endsWith("```")) {
    return str.slice(3, -3);
  } else {
    return str.replace("```", "");
  }
}
