import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL || ''}/pdf.worker.min.js`;

const thumbCache = new Map();

function PdfThumbnail({ src, alt = '', width = 480 }) {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const cached = thumbCache.get(src);
        if (cached) {
          const canvas = canvasRef.current;
          if (!canvas || cancelled) return;
          const ctx = canvas.getContext('2d');
          canvas.width = cached.width;
          canvas.height = cached.height;
          ctx.drawImage(cached.image, 0, 0);
          if (!cancelled) setStatus('ready');
          return;
        }

        const loadingTask = pdfjsLib.getDocument({ url: src });
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const page = await pdf.getPage(1);
        if (cancelled) return;

        const baseViewport = page.getViewport({ scale: 1 });
        const scale = Math.min(2, width / baseViewport.width);
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        await page.render({ canvasContext: ctx, viewport }).promise;

        const dataUrl = canvas.toDataURL('image/png');
        const image = new Image();
        image.src = dataUrl;
        await new Promise((resolve) => {
          image.onload = resolve;
          image.onerror = resolve;
        });
        thumbCache.set(src, { image, width: viewport.width, height: viewport.height });

        if (!cancelled) setStatus('ready');
      } catch (err) {
        if (!cancelled) setStatus('error');
      }
    };

    setStatus('loading');
    render();

    return () => {
      cancelled = true;
    };
  }, [src, width]);

  return (
    <div className="proje-detay__pdf-thumb-wrap" aria-label={alt}>
      <canvas ref={canvasRef} className="proje-detay__pdf-thumb-canvas" />
      {status === 'loading' && (
        <div className="proje-detay__pdf-thumb-state" aria-hidden="true">
          <span className="proje-detay__pdf-thumb-spinner" />
        </div>
      )}
      {status === 'error' && (
        <div className="proje-detay__pdf-thumb-state proje-detay__pdf-thumb-state--error" aria-hidden="true">
          PDF
        </div>
      )}
    </div>
  );
}

export default PdfThumbnail;
