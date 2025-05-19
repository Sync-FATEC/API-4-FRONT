export function downloadPdf(arrayBuffer: ArrayBuffer, fileName: string) {
  const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url); // libera a memória
}
