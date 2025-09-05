import React, { useState } from "react";

function Resizephoto() {
    document.title = "PhotoEdit - Resize Image Online Free";

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [resizedImage, setResizedImage] = useState(null);
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [unit, setUnit] = useState("pixels");
    const [percent, setPercent] = useState(100);
    const [dpi, setDpi] = useState(72);
    const [format, setFormat] = useState("image/jpeg");
    const [fname, setFname] = useState(null);
    const [fheight, setFheight] = useState(null);
    const [fwidth, setFwidth] = useState(null);
    const [fsize, setFsize] = useState(null);




    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            // Basic file properties
            setFname(file.name)
            setFsize((file.size / 1024).toFixed(2) + " KB")

            // Get dimensions (width, height)
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                setFheight(img.height)
                setFwidth(img.width)
            };
        }
    };


    const handleResize = () => {
        if (!image) return alert("Please upload an image first.");

        const img = new Image();
        img.src = URL.createObjectURL(image);
        img.onload = () => {
            let newWidth = width ? parseInt(width) : img.width;
            let newHeight = height ? parseInt(height) : img.height;

            // If percent selected
            if (unit === "percent") {
                newWidth = (img.width * percent) / 100;
                newHeight = (img.height * percent) / 100;
            }

            // Convert Inches or Cm to Pixels using DPI
            if (unit === "inches") {
                newWidth = width * dpi;
                newHeight = height * dpi;
            } else if (unit === "cm") {
                newWidth = (width / 2.54) * dpi;
                newHeight = (height / 2.54) * dpi;
            }

            // Create canvas
            const canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            setResizedImage(canvas.toDataURL(format, 1.0));

        };
    };

    const handleDownload = () => {
        if (!resizedImage) return alert("Please resize the image first.");
        const link = document.createElement("a");
        link.download = `${fname.replace(/\.[^/.]+$/, "")}.${format.split("/")[1]}`;
        link.href = resizedImage;
        link.click();
    };


    return (
        <>
            < div className="container py-5 " >
                <h1 className="text-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none"><path fill="#DCF2F9" fillRule="evenodd" d="M25.68 38.4V26.64a4.32 4.32 0 0 0-4.32-4.32H9.6V6.153c0-2.14.223-2.915.641-3.697A4.361 4.361 0 0 1 12.056.64C12.838.223 13.614 0 15.753 0h26.094c2.14 0 2.915.223 3.697.641a4.362 4.362 0 0 1 1.815 1.815c.418.782.641 1.558.641 3.697v26.094c0 2.14-.223 2.915-.641 3.697a4.362 4.362 0 0 1-1.815 1.815c-.782.418-1.558.641-3.697.641H25.68Z" clipRule="evenodd"></path><path fill="#1C83A8" d="M34.888 19.737a.831.831 0 0 0-.824-.839h-3.652L42.027 7.192a.85.85 0 0 0 0-1.186.812.812 0 0 0-1.164 0L29.247 17.712v-3.72a.831.831 0 0 0-.823-.84.831.831 0 0 0-.824.84v5.745a.86.86 0 0 0 .063.32.83.83 0 0 0 .76.519h5.641a.83.83 0 0 0 .824-.839Z"></path><path fill="#3CB6E2" fillRule="evenodd" d="M20.154 24H3.846c-1.337 0-1.822.14-2.311.4A2.726 2.726 0 0 0 .4 25.536c-.262.489-.401.974-.401 2.31v16.31c0 1.336.14 1.821.4 2.31.262.49.646.873 1.135 1.134.489.262.974.401 2.31.401h16.31c1.336 0 1.821-.14 2.31-.4a2.726 2.726 0 0 0 1.134-1.135c.262-.489.401-.974.401-2.31v-16.31c0-1.336-.14-1.821-.4-2.31a2.726 2.726 0 0 0-1.135-1.134c-.489-.262-.974-.401-2.31-.401ZM2.44 26.094c.24-.128.476-.174 1.406-.174h16.308c.93 0 1.166.046 1.406.174a.807.807 0 0 1 .346.346c.128.24.174.476.174 1.406v16.308c0 .93-.046 1.166-.174 1.406a.807.807 0 0 1-.346.346c-.24.128-.476.174-1.406.174H3.846c-.93 0-1.166-.046-1.406-.174a.807.807 0 0 1-.346-.346c-.128-.24-.174-.477-.174-1.406V27.846c0-.93.046-1.166.174-1.406a.807.807 0 0 1 .346-.346Z" clipRule="evenodd"></path><path fill="#3CB6E2" fillRule="evenodd" d="M8.88 35.52a2.64 2.64 0 1 1 0-5.28 2.64 2.64 0 0 1 0 5.28ZM22.022 47.206c.42.418.282-6.006.703-6.424.42-.418.42-1.096 0-1.515l-5.384-5.353a1.08 1.08 0 0 0-1.522 0L2.982 46.584c-.42.418.573.204.994.622a1.08 1.08 0 0 0 1.523 0h16.523Z" clipRule="evenodd"></path></svg>
                    Resize Image
                </h1>
                <h5 className="text-center fst-italic">Resize <b>JPG</b><b>PNG SVG</b> or <b>GIF</b> by defining new height and width pixels. <br />Change image dimensions in bulk.</h5>

                <div className="container d-flex justify-content-center card shadow p-4  text-bg-info w-50 mt-3 ">
                    <div className="mb-3 ">
                        <label className="fw-bold form-label ">Upload Image</label>

                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleImageUpload}

                        />
                    </div>


                    {preview && (
                        <div className="text-center mb-3">
                            <img
                                src={preview}
                                alt="preview"
                                className="img-fluid rounded shadow"
                                style={{ maxHeight: "150px" }}
                            />
                            <div>
                                <p> {fname}</p>
                                <p> {fwidth}x{fheight}  </p>
                                <p> {fsize}</p>
                            </div>
                        </div>


                    )}
                </div>
            </div>



            {preview && (<div className="container text-center py-3">
                <div className="row g-3">
                    <h2>Choose new size and format</h2>

                    <div className="container d-flex justify-content-center mt-4">
                        <table className="table " style={{ width: "300px" }}>
                             <tbody>
                            <tr className="table_row" >
                                <td className="label_cell">
                                    <div>
                                        <label className="fw-bold form-label py-3">Width</label>
                                    </div>

                                </td>
                                <td className="lock_and_units_area" >
                                    <div>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={width}
                                            onChange={(e) => setWidth(e.target.value)}
                                            placeholder="Enter width"
                                            disabled={unit === "percent"}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="label_cell ">

                                    <div>
                                        <label className="fw-bold form-label py-2">Height</label>
                                    </div>
                                </td>
                                <td className="lock_and_units_area">
                                    <div>

                                        <input
                                            type="number"
                                            className="form-control"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            placeholder="Enter height"
                                            disabled={unit === "percent"}
                                        /></div>
                                </td>
                            </tr>

                            <tr>
                                <td className="label_cell ">

                                    <div>
                                        <label className="fw-bold form-label py-2">Resize Unit</label>
                                    </div>
                                </td>
                                <td className="lock_and_units_area">
                                    <div>

                                        <select
                                            className="form-select"
                                            value={unit}
                                            onChange={(e) => setUnit(e.target.value)}
                                        >

                                            <option value="percent">Percent</option>
                                            <option value="pixels">Pixels</option>
                                            <option value="inches">Inches</option>
                                            <option value="cm">Centimeters</option>
                                        </select></div>
                                </td>
                            </tr>

                            {unit === "percent" && (<tr>
                                <td className="label_cell ">

                                    <div>
                                        <label className="fw-bold form-label py-2">Resize %</label>
                                    </div>
                                </td>
                                <td className="lock_and_units_area">
                                    <div>

                                        <input
                                            type="number"
                                            className="form-control"
                                            value={percent}
                                            onChange={(e) => setPercent(e.target.value)}
                                        /></div>
                                </td>
                            </tr>)}
                            {(unit === "inches" || unit === "cm") && (<tr>
                                <td className="label_cell ">

                                    <div>
                                        <label className="fw-bold form-label py-2">Resolution (DPI)</label>
                                    </div>
                                </td>
                                <td className="lock_and_units_area">
                                    <div>

                                        <input
                                            type="number"
                                            className="form-control"
                                            value={dpi}
                                            onChange={(e) => setDpi(e.target.value)}
                                        /></div>
                                </td>
                            </tr>)}


                            <tr>
                                <td className="label_cell ">

                                    <div>
                                        <label className="fw-bold form-label py-2">Output Format</label>
                                    </div>
                                </td>
                                <td className="lock_and_units_area">
                                    <div>

                                        <select
                                            className="form-select"
                                            value={format}
                                            onChange={(e) => setFormat(e.target.value)}
                                        >
                                            <option value="image/jpeg">JPEG</option>
                                            <option value="image/png">PNG</option>
                                            <option value="image/webp">WEBP</option>
                                        </select></div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>


                <div className="text-center mt-4">
                    <button className="btn btn-primary fw-bold px-5" onClick={handleResize}>
                        Resize image
                    </button>
                </div>
            </div>)}


            {resizedImage && (<div className="container text-center mt-4">
                <div className="container mt-5">
                    <h1> Your image has been resized! </h1>
                    <img
                        src={resizedImage}
                        alt="resizedImage"
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "150px" }}
                    />
                    <div>
                        <p>{fname.replace(/\.[^/.]+$/, "")}.{format.split("/")[1]} | {(resizedImage.size / 1024).toFixed(2) + " KB"}</p>

                    </div>
                </div>
                <button className="btn btn-primary fw-bold px-5" onClick={handleDownload}>
                    Download image
                </button>
            </div>)}



        </>
    )
}

export default Resizephoto
