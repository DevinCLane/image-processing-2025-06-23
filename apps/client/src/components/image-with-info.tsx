import { useEffect, useState } from "react";

function ImageWithInfo({ src, alt }: { src: string; alt?: string }) {
    const [info, setInfo] = useState<{ format: string; size: string }>({
        format: "",
        size: "",
    });

    useEffect(() => {
        async function fetchImageWithInfo() {
            try {
                const response = await fetch(src, { method: "HEAD" });
                setInfo({
                    format: response.headers.get("Content-Type") || "",
                    size: response.headers.get("Content-Length") || "",
                });
            } catch (error) {
                console.error(error);
            }
        }
        fetchImageWithInfo();
    }, [src]);

    const imageFormatClean = info.format.split("/")[1];

    return (
        <figure>
            <img src={src} alt={alt} />
            <figcaption>
                Format: {imageFormatClean}. Size:{" "}
                {info.size
                    ? `${(Number(info.size) / 1024).toFixed(1)} KB`
                    : "?"}
            </figcaption>
        </figure>
    );
}

export default ImageWithInfo;
