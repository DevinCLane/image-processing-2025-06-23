import { useState, useEffect } from "react";
import "./App.css";
import ImageWithInfo from "./components/image-with-info";

type Image = {
    id: string;
    author: string;
    download_url: string;
    width: number;
    height: number;
};

function App() {
    const [images, setImages] = useState<Image[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchImages() {
            try {
                const url = "http://localhost:3000/api/images";
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const data = await response.json();
                setImages(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                    console.error(error.message);
                } else {
                    setError(String(error));
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchImages();
    }, []);
    if (error) return <p>Error fetching images: {error}</p>;
    if (isLoading) return <p>Loading...</p>;
    // for each image, show the original, then a banner, and a thumbnail
    return (
        <div>
            <h1>Optimized images</h1>

            {images.map((img) => (
                <div key={img.id}>
                    {/* original image */}
                    <ImageWithInfo
                        src={`http://localhost:3000/optimize/w_600/${encodeURIComponent(
                            img.download_url
                        )}`}
                    />

                    {/* bannner */}
                    <ImageWithInfo
                        src={`http://localhost:3000/optimize/s_400x100,format_webp/${encodeURIComponent(
                            img.download_url
                        )}`}
                    />
                    {/* thumbnail */}
                    <ImageWithInfo
                        src={`http://localhost:3000/optimize/s_100x100,format_webp/${encodeURIComponent(
                            img.download_url
                        )}`}
                    />
                </div>
            ))}
        </div>
    );
}

export default App;
