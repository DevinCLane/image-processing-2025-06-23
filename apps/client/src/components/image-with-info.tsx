import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

function ImageWithInfo({
    src,
    alt,
    width,
    height,
}: {
    src: string;
    alt?: string;
    width: number;
    height: number | string;
}) {
    const [info, setInfo] = useState<{ format: string; size: string }>({
        format: "",
        size: "",
    });
    const [isLoading, setIsLoading] = useState(true);

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
            } finally {
                setIsLoading(false);
            }
        }
        fetchImageWithInfo();
    }, [src]);

    const imageFormatClean = info.format.split("/")[1];

    return (
        <figure className="flex flex-col items-center gap-4">
            {isLoading ? (
                <div
                    className="animate-pulse bg-gray-100 rounded-sm flex items-center justify-center"
                    style={{ width: width + "px", height: height + "px" }}
                >
                    <svg
                        className="w-10 h-10 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                    >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div>
            ) : (
                <>
                    <img
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className={cn(isLoading && "animate-pulse")}
                        onLoad={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                    />
                    <figcaption>
                        Format: {imageFormatClean}. Size:{" "}
                        {info.size
                            ? `${(Number(info.size) / 1024).toFixed(1)} KB`
                            : "?"}
                    </figcaption>
                </>
            )}
        </figure>
    );
}

export default ImageWithInfo;
