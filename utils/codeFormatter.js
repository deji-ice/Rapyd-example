export function removeWordsOutsideCodeBlock(text) {
    const codeStart = '```';
    const codeEnd = '```';
  
    const startIndex = text.indexOf(codeStart);
    const endIndex = text.lastIndexOf(codeEnd);
  
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      return text.substring(startIndex + codeStart.length, endIndex).trim();
    }
  
    return '';
  }
