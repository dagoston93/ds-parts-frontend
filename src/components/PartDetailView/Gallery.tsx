import React, { useState } from "react";
import {
    Box,
    IconButton,
    Typography,
    Dialog,
    DialogContent,
} from "@mui/material";
import {
    ChevronLeft,
    ChevronRight,
    FiberManualRecord,
} from "@mui/icons-material";

interface GalleryProps {
    images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDialogOpen, setDialogOpen] = useState(false);

    if (images.length === 0)
        return <Typography>No images available</Typography>;

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
    };

    const handleImageClick = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const mainImageWidth = 600;

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
        >
            {/* Main Image Frame */}
            <Box
                position="relative"
                width="100%"
                maxWidth="600px"
                height="400px"
                overflow="hidden"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ border: "1px solid #ddd", borderRadius: "8px", mb: 2 }}
            >
                <IconButton
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    sx={{ position: "absolute", left: "8px", zIndex: 1 }}
                >
                    <ChevronLeft />
                </IconButton>

                <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        cursor: "pointer",
                    }}
                    onClick={handleImageClick}
                />

                <IconButton
                    onClick={handleNext}
                    disabled={currentIndex === images.length - 1}
                    sx={{ position: "absolute", right: "8px", zIndex: 1 }}
                >
                    <ChevronRight />
                </IconButton>
            </Box>

            {/* Dots */}
            <Box display="flex" justifyContent="center" mt={1} mb={1}>
                {images.map((_, index) => (
                    <FiberManualRecord
                        key={index}
                        sx={{
                            color:
                                index === currentIndex
                                    ? "primary.main"
                                    : "gray",
                            fontSize: "16px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
            </Box>

            {/* Thumbnail Bar */}
            <Box
                sx={{
                    maxWidth: `${mainImageWidth}px`,
                    overflowX: "auto", // Enable horizontal scrolling
                    whiteSpace: "nowrap", // Prevent thumbnails from wrapping to a new line
                    display: "flex", // Ensure the thumbnails align in a row
                    gap: "8px", // Add spacing between thumbnails
                    scrollBehavior: "smooth", // Smooth scrolling when centering thumbnails
                }}
            >
                {images.map((image, index) => (
                    <Box
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        ref={(ref) => {
                            const element = ref as HTMLDivElement | null; // Type assertion
                            if (index === currentIndex && element) {
                                element.scrollIntoView({
                                    inline: "center",
                                    behavior: "smooth", // Smooth scrolling
                                });
                            }
                        }}
                        sx={{
                            cursor: "pointer",
                            width: `${mainImageWidth / 6}px`, // Fixed width
                            height: "60px",
                            border:
                                index === currentIndex
                                    ? "2px solid #1976d2"
                                    : "2px solid transparent",
                            borderRadius: "4px",
                            overflow: "hidden",
                            display: "inline-flex", // Keep thumbnails aligned in a row
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={image}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                ))}
            </Box>

            {/* Fullscreen Popup */}
            <Dialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                maxWidth="lg"
            >
                <DialogContent>
                    <img
                        src={images[currentIndex]}
                        alt={`Fullscreen Image ${currentIndex + 1}`}
                        style={{ width: "100%", height: "auto" }}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Gallery;
