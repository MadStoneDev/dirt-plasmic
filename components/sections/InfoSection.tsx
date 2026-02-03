import Image from "next/image";

export interface InfoSectionProps {
  heading?: string;
  content?: string;
  image?: string;
  layout?: "imageLeft" | "imageRight" | "noImage";
}

export function InfoSection({
  heading,
  content,
  image,
  layout = "imageRight",
}: InfoSectionProps) {
  const imageOnLeft = layout === "imageLeft";
  const showImage = layout !== "noImage" && image;

  return (
    <section className="py-16 px-4">
      <div
        className={`max-w-7xl mx-auto flex flex-col ${showImage ? "lg:flex-row" : ""} gap-12 items-center ${imageOnLeft ? "lg:flex-row-reverse" : ""}`}
      >
        <div className={showImage ? "lg:w-1/2" : "max-w-3xl mx-auto text-center"}>
          {heading && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{heading}</h2>
          )}
          {content && (
            <div className="text-lg text-gray-600 whitespace-pre-line">{content}</div>
          )}
        </div>

        {showImage && (
          <div className="lg:w-1/2">
            <Image
              src={image}
              alt=""
              width={800}
              height={600}
              className="rounded-lg object-cover w-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}
