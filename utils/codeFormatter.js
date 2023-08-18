export function removeMarkers(text) {
  // Remove everything before ```jsx
  const startIndex = text.indexOf("```jsx");
  let croppedString = text.slice(startIndex);

  const endIndex = croppedString.lastIndexOf("```");
  croppedString = croppedString.slice(endIndex, croppedString.length);

  // Remove ```jsx and ```
  return croppedString.replace(/```jsx|```/g, "").trim();
  // const codeStart = '```';
  // const codeEnd = '```';

  // const startIndex = text.indexOf(codeStart);
  // const endIndex = text.lastIndexOf(codeEnd);

  // if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
  //   return text.substring(startIndex + codeStart.length, endIndex).trim();
  // }

  // return '';
}
