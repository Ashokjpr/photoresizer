import React, { useState, useRef } from "react";

function Watermark() {
  const [src, setSrc] = useState(null);
  const [watermarks, setWatermarks] = useState([
    { text: "© My Watermark", fontSize: 32, opacity: 0.5, color: "#facd03ff", x: 50, y: 50 },
  ]);

  const imgRef = useRef(null);
  const downloadRef = useRef(null);

  // drag state
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSrc(URL.createObjectURL(file));
  };

  const handleMouseDown = (e, index, wm) => {
    setDraggingIndex(index);
    setOffset({
      x: e.clientX - wm.x,
      y: e.clientY - wm.y,
    });
  };

  const handleMouseMove = (e) => {
    if (draggingIndex === null) return;
    setWatermarks((prev) =>
      prev.map((wm, i) =>
        i === draggingIndex
          ? { ...wm, x: e.clientX - offset.x, y: e.clientY - offset.y }
          : wm
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };

  const updateWatermark = (index, field, value) => {
    setWatermarks((prev) =>
      prev.map((wm, i) => (i === index ? { ...wm, [field]: value } : wm))
    );
  };

  const addWatermark = () => {
    setWatermarks((prev) => [
      ...prev,
      { text: "New Watermark", fontSize: 28, opacity: 0.5, color: "#ffbb00e7", x: 30, y: 30 },
    ]);
  };

  const removeWatermark = (index) => {
    setWatermarks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDownload = () => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");

    // Draw original image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Add each watermark
    watermarks.forEach((wm) => {
      ctx.globalAlpha = wm.opacity;
      ctx.fillStyle = wm.color;
      ctx.font = `${wm.fontSize}px Arial`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(wm.text, wm.x, wm.y);
    });

    ctx.globalAlpha = 1.0;

    // Export as PNG
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = downloadRef.current;
      a.href = url;
      a.download = "watermarked.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
   <div className="container py-5 " onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}>
             {!src && (<div>
            <h1 className="text-center  mb-3">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M7.692 0h32.616c2.675 0 3.645.278 4.623.801a5.452 5.452 0 0 1 2.268 2.268c.523.978.801 1.948.801 4.623v32.616c0 2.675-.279 3.645-.801 4.623a5.452 5.452 0 0 1-2.268 2.268c-.978.523-1.948.801-4.623.801H7.692c-2.675 0-3.645-.279-4.623-.801A5.452 5.452 0 0 1 .801 44.93C.278 43.953 0 42.983 0 40.308V7.692c0-2.675.278-3.645.801-4.623A5.452 5.452 0 0 1 3.07.801C4.047.278 5.017 0 7.692 0Z" fill="#4A7AAB"></path><path d="M21.797 21.623c0 .825-1.05 2.9-2.024 4.479a.648.648 0 0 0-.076.503.61.61 0 0 0 .586.45h7.435c.23 0 .44-.132.543-.34a.625.625 0 0 0-.055-.647c-1.386-1.891-2.003-3.262-2.003-4.445 0-1.183.617-2.554 2.009-4.455a5.279 5.279 0 0 0 .973-3.066c0-2.9-2.326-5.26-5.185-5.26-2.86 0-5.185 2.36-5.185 5.26 0 1.107.336 2.167.979 3.075 1.385 1.892 2.003 3.263 2.003 4.446ZM35.253 27.916H12.746a.613.613 0 0 0-.608.618v6.207c0 .34.272.617.608.617h22.507a.613.613 0 0 0 .609-.617v-6.207a.613.613 0 0 0-.609-.617ZM31.81 36.263H16.19a.613.613 0 0 0-.609.618v.7c0 .34.273.617.61.617h15.62a.613.613 0 0 0 .608-.617v-.7a.614.614 0 0 0-.609-.618Z" fill="#fff"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h48v48H0z"></path></clipPath></defs></svg>
                Watermark Image
            </h1>
            <h5 class="text-center fst-italic">Watermark <b>JPG</b>, <b>PNG</b> or <b>GIF</b> images. <br/>Stamp images or text over your images at once.</h5>
            <div className="container d-flex justify-content-center card shadow p-4  text-bg-info w-50 mt-3 ">
                <div className="mb-3 ">
                    <label className="fw-bold form-label ">Upload Image</label>
                    <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={onFileChange}
                    />
                </div>
            </div>
            </div>)}

      {src && (
        <div className="row">
          {/* Image preview */}
          <div className="col-md-8 text-center position-relative">
            <div className="border p-2 d-inline-block position-relative">
              <img ref={imgRef} src={src} alt="Preview" className="img-fluid" style={{ minWidth: "300px" }}/>
              {watermarks.map((wm, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: `${wm.y}px`,
                    left: `${wm.x}px`,
                    fontSize: `${wm.fontSize}px`,
                    color: wm.color,
                    opacity: wm.opacity,
                    cursor: "move",
                    textShadow: "2px 2px 5px rgba(0,0,0,0.6)",
                    userSelect: "none",
                  }}
                  onMouseDown={(e) => handleMouseDown(e, i, wm)}
                >
                  {wm.text}
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="col-md-4">
            <div className="card p-3 shadow">
              {watermarks.map((wm, i) => (
                <div key={i} className="border rounded p-2 mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Watermark {i + 1}</strong>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeWatermark(i)}
                    >
                      ✖
                    </button>
                  </div>

                  <label className="form-label">Text</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={wm.text}
                    onChange={(e) =>
                      updateWatermark(i, "text", e.target.value)
                    }
                  />

                  <label className="form-label">Font Size</label>
                  <input
                    type="range"
                    className="form-range"
                    min="10"
                    max="100"
                    value={wm.fontSize}
                    onChange={(e) =>
                      updateWatermark(i, "fontSize", parseInt(e.target.value))
                    }
                  />

                  <label className="form-label">Opacity</label>
                  <input
                    type="range"
                    className="form-range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={wm.opacity}
                    onChange={(e) =>
                      updateWatermark(i, "opacity", parseFloat(e.target.value))
                    }
                  />

                  <label className="form-label">Color</label>
                  <input
                    type="color"
                    className="form-control form-control-color mb-2"
                    value={wm.color}
                    onChange={(e) =>
                      updateWatermark(i, "color", e.target.value)
                    }
                  />

                  <div className="row">
                    <div className="col">
                      <label className="form-label">X</label>
                      <input
                        type="number"
                        className="form-control"
                        value={wm.x}
                        onChange={(e) =>
                          updateWatermark(i, "x", parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="col">
                      <label className="form-label">Y</label>
                      <input
                        type="number"
                        className="form-control"
                        value={wm.y}
                        onChange={(e) =>
                          updateWatermark(i, "y", parseInt(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button className="btn btn-success w-100 mb-2" onClick={addWatermark}>
                ➕ Add Watermark
              </button>
              <button
                className="btn btn-primary w-100"
                onClick={handleDownload}
              >
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M7.692 0h32.616c2.675 0 3.645.278 4.623.801a5.452 5.452 0 0 1 2.268 2.268c.523.978.801 1.948.801 4.623v32.616c0 2.675-.279 3.645-.801 4.623a5.452 5.452 0 0 1-2.268 2.268c-.978.523-1.948.801-4.623.801H7.692c-2.675 0-3.645-.279-4.623-.801A5.452 5.452 0 0 1 .801 44.93C.278 43.953 0 42.983 0 40.308V7.692c0-2.675.278-3.645.801-4.623A5.452 5.452 0 0 1 3.07.801C4.047.278 5.017 0 7.692 0Z" fill="#4A7AAB"></path><path d="M21.797 21.623c0 .825-1.05 2.9-2.024 4.479a.648.648 0 0 0-.076.503.61.61 0 0 0 .586.45h7.435c.23 0 .44-.132.543-.34a.625.625 0 0 0-.055-.647c-1.386-1.891-2.003-3.262-2.003-4.445 0-1.183.617-2.554 2.009-4.455a5.279 5.279 0 0 0 .973-3.066c0-2.9-2.326-5.26-5.185-5.26-2.86 0-5.185 2.36-5.185 5.26 0 1.107.336 2.167.979 3.075 1.385 1.892 2.003 3.263 2.003 4.446ZM35.253 27.916H12.746a.613.613 0 0 0-.608.618v6.207c0 .34.272.617.608.617h22.507a.613.613 0 0 0 .609-.617v-6.207a.613.613 0 0 0-.609-.617ZM31.81 36.263H16.19a.613.613 0 0 0-.609.618v.7c0 .34.273.617.61.617h15.62a.613.613 0 0 0 .608-.617v-.7a.614.614 0 0 0-.609-.618Z" fill="#fff"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h48v48H0z"></path></clipPath></defs></svg>
                Download image
              </button>
              <a ref={downloadRef} className="d-none" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watermark;
