import React, { useState } from "react";

function Compressor() {
    document.title = "PhotoEase - Compress Image Online Free";

    const [image, setImage] = useState(null);
    const [compressedImage, setCompressedImage] = useState(null);
    const [quality, setQuality] = useState(0.7); // default compression quality
    const [maxWidth, setMaxWidth] = useState(800);
    const [maxHeight, setMaxHeight] = useState(600);
    const [format, setFormat] = useState("auto");
    const [fname, setFname] = useState(null);

    // handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setFname(file.name);
            setCompressedImage(null); // reset old compressed image
        }
    };

    // compress image
    const compressImage = () => {
        if (!image) return alert("Please upload an image first.");

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                // resize if needed
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                // format
                let mimeType = "image/jpeg";
                if (format === "png") mimeType = "image/png";
                else if (format === "webp") mimeType = "image/webp";
                else if (format === "auto") mimeType = image.type;

                const compressedDataUrl = canvas.toDataURL(mimeType, quality);
                setCompressedImage(compressedDataUrl);
            };
        };
    };

    return (
        <div className="container py-5 ">
            <h1 className="text-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 100 100" fill-rule="evenodd"><path d="M63.05 56h29.9c2.452 0 3.34.255 4.237.735a5 5 0 0 1 2.08 2.08c.48.897.733 1.785.733 4.235v29.9c0 2.452-.255 3.34-.735 4.237a5 5 0 0 1-2.08 2.08c-.897.48-1.785.733-4.235.733h-29.9c-2.452 0-3.34-.255-4.237-.735a5 5 0 0 1-2.08-2.08C56.253 96.288 56 95.4 56 92.95v-29.9c0-2.452.255-3.34.735-4.237a5 5 0 0 1 2.08-2.08c.897-.48 1.785-.733 4.235-.733zm0-56h29.9c2.452 0 3.34.255 4.237.735a5 5 0 0 1 2.08 2.08c.48.897.733 1.785.733 4.235v29.9c0 2.452-.255 3.34-.735 4.237a5 5 0 0 1-2.08 2.08c-.897.48-1.785.733-4.235.733h-29.9c-2.452 0-3.34-.255-4.237-.735a5 5 0 0 1-2.08-2.08C56.253 40.288 56 39.4 56 36.95V7.05c0-2.452.255-3.34.735-4.237a5 5 0 0 1 2.08-2.08C59.712.253 60.6 0 63.05 0zm-56 56h29.9c2.452 0 3.34.255 4.237.735a5 5 0 0 1 2.08 2.08c.48.897.733 1.785.733 4.235v29.9c0 2.452-.255 3.34-.735 4.237a5 5 0 0 1-2.08 2.08c-.897.48-1.785.733-4.235.733H7.05c-2.452 0-3.34-.255-4.237-.735a5 5 0 0 1-2.08-2.08C.253 96.288 0 95.4 0 92.95v-29.9c0-2.452.255-3.34.735-4.237a5 5 0 0 1 2.08-2.08C3.712 56.253 4.6 56 7.05 56zm0-56h29.9c2.452 0 3.34.255 4.237.735a5 5 0 0 1 2.08 2.08c.48.897.733 1.785.733 4.235v29.9c0 2.452-.255 3.34-.735 4.237a5 5 0 0 1-2.08 2.08c-.897.48-1.785.733-4.235.733H7.05c-2.452 0-3.34-.255-4.237-.735a5 5 0 0 1-2.08-2.08C.253 40.288 0 39.4 0 36.95V7.05C0 4.6.255 3.7.735 2.814s1.183-1.6 2.08-2.08S4.6 0 7.05 0z" fill="#8FBC5D"></path><path d="M70 83.602c0 .957.8 1.733 1.766 1.733s1.766-.777 1.766-1.733v-7.686l10.288 10.1a1.79 1.79 0 0 0 2.496 0 1.71 1.71 0 0 0 0-2.45l-10.288-10.1h7.828c.976 0 1.766-.776 1.766-1.733S84.833 70 83.856 70h-12.1a1.81 1.81 0 0 0-.674.133c-.43.175-.776.514-.954.937-.1.2-.136.436-.136.66L70 83.602zm14.602-52.77c.957 0 1.733-.8 1.733-1.766S85.56 27.3 84.602 27.3h-7.686l10.098-10.288a1.79 1.79 0 0 0 0-2.496 1.71 1.71 0 0 0-2.45 0l-10.098 10.3v-7.83c0-.977-.776-1.766-1.733-1.766S71 16 71 16.977v12.1a1.81 1.81 0 0 0 .133.674 1.75 1.75 0 0 0 .937.955 1.69 1.69 0 0 0 .661.136l11.87.002zM16.92 70c-.957 0-1.733.8-1.733 1.766s.776 1.766 1.733 1.766h7.686L14.508 83.82a1.79 1.79 0 0 0 0 2.497 1.71 1.71 0 0 0 2.45 0L27.056 76.03v7.828c0 .977.776 1.766 1.733 1.766s1.733-.8 1.733-1.766v-12.1c0-.23-.047-.46-.133-.673a1.75 1.75 0 0 0-.937-.955 1.69 1.69 0 0 0-.661-.136H16.92V70zm13.913-53.08c0-.957-.8-1.733-1.766-1.733s-1.766.777-1.766 1.733v7.686L17.014 14.508a1.79 1.79 0 0 0-2.496 0 1.71 1.71 0 0 0 0 2.45l10.288 10.098h-7.828c-.976 0-1.766.776-1.766 1.733s.8 1.733 1.766 1.733h12.1a1.81 1.81 0 0 0 .674-.133c.43-.175.776-.514.954-.937.1-.2.136-.436.136-.66l.002-11.87z" fill-rule="nonzero" fill="#fff"></path></svg>
                Compress Image
            </h1>
            <h5 class="text-center fst-italic"><b>PNG SVG</b> or <b>GIF</b> with the best quality and compression. <br/>Reduce the filesize of your images at once. </h5>


            <div className="container d-flex justify-content-center card shadow p-4 text-bg-info w-50 mt-3 ">
                <div className="mb-3 ">
                    <label className="fw-bold form-label ">Upload Image</label>

                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload}
                    />
                </div>

                {image && (
                    <div className="container col-md-6 text-center">
                        <h5>Original Image</h5>
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Original"
                            className="img-fluid rounded"
                            style={{ maxHeight: "150px" }}
                        />
                        <p>{fname} </p>
                        <p>Size: {(image.size / 1024).toFixed(2)} KB</p>
                    </div>
                )}
            </div>

            {image && (<div className="container text-center py-3 mt-5">
                <div className="row g-3 mt-5">
                    <h2>Choose new size and format</h2>

                    <div className="container d-flex justify-content-center mt-2">
                        <table className="table " style={{ width: "300px" }}>
                            <tr >
                                <td className="label_cell">
                                    <div>
                                        <label className="form-label"> Set Quality  (0–1)</label>
                                    </div>

                                </td>
                                <td className="lock_and_units_area" >
                                    <div>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0.1"
                                            max="1"
                                            value={quality}
                                            className="form-control"
                                            onChange={(e) => setQuality(parseFloat(e.target.value))}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="label_cell ">

                                    <div>
                                        <label className="form-label">Max Width</label>
                                    </div>
                                </td>
                                <td className="lock_and_units_area">
                                    <div>
                                        <input
                                            type="number"
                                            value={maxWidth}
                                            className="form-control"
                                            onChange={(e) => setMaxWidth(parseInt(e.target.value))}
                                        /></div>
                                </td>
                            </tr>

                            <tr>
                                <td className="label_cell ">

                                    <div>
                                        <label className="form-label">Max Height</label>
                                    </div>
                                </td>
                                <td className="lock_and_units_area">
                                    <div>
                                        <input
                                            type="number"
                                            value={maxHeight}
                                            className="form-control"
                                            onChange={(e) => setMaxHeight(parseInt(e.target.value))}
                                        /></div>
                                </td>
                            </tr>

                            <tr>
                                <td className="label_cell ">

                                    <div>
                                        <label className="form-label">Format</label>
                                    </div>
                                </td>
                                <td className="lock_and_units_area">
                                    <div>

                                        <select
                                            className="form-control"
                                            value={format}
                                            onChange={(e) => setFormat(e.target.value)}
                                        >
                                            <option value="auto">Auto</option>
                                            <option value="jpeg">JPEG</option>
                                            <option value="png">PNG</option>
                                            <option value="webp">WebP</option>
                                        </select></div>
                                </td>
                                </tr>

                        </table>
                    </div>

                </div>


                <div className="text-center mt-4 ">
                    <button className="btn btn-primary mb-4 py-2 " onClick={compressImage}>
                        Compress Image
                    </button>
                </div>
            </div>)}


            {/* Preview Section */}
           
                {compressedImage && (
                    <div className="container col-md-6 text-center mt-5">
                        <div className="container d-flex justify-content-center card shadow p-4">
                        <h5>Compressed Image</h5>
                        <img
                            src={compressedImage}
                            alt="Compressed"
                            className="img-fluid rounded"
                            style={{ maxHeight: "150px" }}
                        />
                        
                        <p> {fname} | {(compressedImage.length * (3 / 4) / 1024).toFixed(2)} KB
                        </p>
                        </div>
                        <a
                            href={compressedImage}
                            download={`${fname.replace(/\.[^/.]+$/, "")}.jpg`}
                            className="btn btn-primary mt-2 py-2 mt-5"
                        >
                            Download Image
                        </a>
                    </div>
                )}
            </div>
    );
}

export default Compressor;
