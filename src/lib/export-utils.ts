import html2canvas from 'html2canvas';

export const exportCanvasAsImage = async (
  element: HTMLElement,
  filename: string = 'mood-board'
): Promise<void> => {
  try {
    // Create canvas from the element
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      ignoreElements: (element) => {
        // Skip control elements like delete buttons
        return element.classList.contains('no-export') || 
               element.closest('.no-export') !== null;
      },
    });

    // Convert to blob
    canvas.toBlob((blob) => {
      if (!blob) throw new Error('Failed to create image blob');

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.png`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      URL.revokeObjectURL(url);
    }, 'image/png');
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
};

export const exportCanvasAsDataURL = async (
  element: HTMLElement,
  format: 'png' | 'jpeg' = 'png',
  quality: number = 1.0
): Promise<string> => {
  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    scale: 2,
    useCORS: true,
    allowTaint: true,
  });

  return canvas.toDataURL(`image/${format}`, quality);
};

export const copyCanvasToClipboard = async (element: HTMLElement): Promise<void> => {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    canvas.toBlob(async (blob) => {
      if (!blob) throw new Error('Failed to create image blob');

      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
    }, 'image/png');
  } catch (error) {
    console.error('Copy to clipboard failed:', error);
    throw error;
  }
};
