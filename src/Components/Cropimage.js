import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function Cropimage() {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "px",
    x: 36,
    y: 39,
    width: 895,
    height: 285,
  });

  const imgRef = useRef(null);
  const downloadRef = useRef(null);
  const [fname, setFname] = useState(null);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFname(file.name);
    setSrc(URL.createObjectURL(file));
  };


     const resetCrop = () => {
    setCrop({ unit: "px", x: 36, y: 39, width: 500, height: 200 });
    
  };

  const getCroppedImg = () => {
    if (!imgRef.current || !crop.width || !crop.height) return;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = downloadRef.current;
      a.href = url;
      a.download =fname;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

    return (
        <div className="container py-5 ">
            <h1 className="text-center  mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 100 100" fill-rule="evenodd"><path d="M16.024 0h67.95c5.572 0 7.593.58 9.63 1.67s3.636 2.688 4.725 4.725 1.67 4.058 1.67 9.63v67.95c0 5.572-.58 7.593-1.67 9.63s-2.688 3.636-4.725 4.725-4.058 1.67-9.63 1.67h-67.95c-5.572 0-7.593-.58-9.63-1.67S2.76 95.642 1.67 93.605 0 89.548 0 83.976v-67.95c0-5.572.58-7.593 1.67-9.63S4.358 2.76 6.395 1.67 10.452 0 16.024 0z" fill="#3CB6E2"></path><path d="M44.718 39.818c.563-1.225.882-2.572.882-4.018a9.8 9.8 0 1 0-19.6 0 9.8 9.8 0 0 0 9.8 9.8c1.446 0 2.793-.32 4.018-.882L45.6 50.5l-5.782 5.782c-1.225-.563-2.572-.882-4.018-.882a9.8 9.8 0 1 0 0 19.6 9.8 9.8 0 0 0 9.8-9.8c0-1.446-.32-2.793-.882-4.018L50.5 55.4l17.15 17.15H75V70.1L44.718 39.818zM35.8 40.7a4.9 4.9 0 1 1 0-9.8 4.9 4.9 0 1 1 0 9.8zm0 29.4a4.9 4.9 0 0 1 0-9.8 4.9 4.9 0 1 1 0 9.8zm14.7-18.375a1.21 1.21 0 1 1 0-2.45 1.21 1.21 0 1 1 0 2.45zM67.65 28.45l-14.7 14.7 4.9 4.9L75 30.9v-2.45h-7.35z" fill="#fff"></path></svg>
                Crop Image
            </h1>
            <h5 class="text-center fst-italic">Crop <b>JPG PNG</b> or <b>GIF</b> by defining a rectangle in pixels. <br/>Cut your image online.</h5>
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

            {src && (
                <div className="container d-flex justify-content-center rounded shadow my-5 p-4  w-70 ">
                    <ReactCrop crop={crop}  onChange={(c) => setCrop(c)}>
                    <img ref={imgRef} src={src} alt="Source" style={{ minWidth: "100px" }} />
                    </ReactCrop>
                </div>
            )}

            {/* Crop Controls */}
            {src && (
                <div className="row mt-3 g-2">
                    <div>
                        <table className="table " >
                            <tr >
                                <td className="label_cell">
                                    <div>
                                        <label className="form-label fw-bold">Width</label>
                                    </div>
                                </td>
                                <td className="label_cell">
                                    <div>
                                        <label className="form-label fw-bold">Height</label>
                                    </div>
                                </td>
                                <td className="label_cell">
                                    <div>
                                        <label className="form-label fw-bold">Position (X)</label>
                                    </div>
                                </td>
                                <td className="label_cell">
                                    <div>
                                        <label className="form-label fw-bold">Position (Y)</label>
                                    </div>
                                </td>
                                
                            </tr>
                            <tr >
                                <td className="label_cell">
                                    <div>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={crop.width}
                                            onChange={(e) => setCrop({ ...crop, width: parseInt(e.target.value || 0, 10) })}
                                        />
                                    </div>
                                </td>
                                <td className="label_cell">
                                    <div>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={crop.height}
                                            onChange={(e) => setCrop({ ...crop, height: parseInt(e.target.value || 0, 10) })}
                                        />
                                    </div>
                                </td>
                                <td className="label_cell">
                                    <div>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={crop.x}
                                            onChange={(e) => setCrop({ ...crop, x: parseInt(e.target.value || 0, 10) })}
                                        />
                                    </div>
                                </td>
                                <td className="label_cell">
                                    <div>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={crop.y}
                                            onChange={(e) => setCrop({ ...crop, y: parseInt(e.target.value || 0, 10) })}
                                        />
                                    </div>
                                </td>
                                
                            </tr>
                        </table>
                    </div>
                    {/* Actions */}
                    <div className="mt-5  gap-5 container d-flex justify-content-center">

                        <button
                        className="btn btn-outline-secondary fw-bold"
                        onClick={resetCrop}
                        disabled={!src}
                        >
                        Reset
                        </button>
                         <button
                        className="btn btn-primary fw-bold"
                        onClick={getCroppedImg}
                        disabled={!src}
                        >
                        Download Image
                        </button>
                        <a ref={downloadRef} className="d-none" />
                    </div>

                </div>
            )}

        </div>
    )
}

export default Cropimage
