import { useEffect, useState } from "react";
import MissingImage from "../../../assets/images/missing.png";
import { toast } from "react-hot-toast";

const ImageInput = ({ imgSrc }: { imgSrc?: string | null | undefined }) => {
  const [preview, setPreview] = useState<string | null | undefined>(imgSrc);

  useEffect(() => {
    if (!imgSrc || preview === imgSrc) return;

    setPreview(imgSrc);
  }, [imgSrc]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    // validate image
    if (!file) return;

    if (!file.type.match("image.*")) {
      toast.error("Apenas imagens são permitidas");
      e.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 1MB");
      e.target.value = "";
      return;
    }

    // set preview image
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="w-20 h-28 overflow-hidden sm:mb-0 xl:mb-4 2xl:mb-0 mb-4">
        <img
          className="rounded-lg object-cover w-full h-full"
          src={preview || MissingImage}
          alt="image-input"
        />
      </div>

      <div className="flex-1">
        <h3>Imagem</h3>
        <div className="mb-4 text-sm text-gray-500">
          JPG ou PNG. Tamanho máximo 1MB
        </div>
        <input
          className="flex w-full m-0 min-w-0 flex-auto bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
          type="file"
          accept="image/png,image/jpeg, image/jpg"
          id="image"
          name="image"
          onChange={handleImageChange}
        />
      </div>
    </>
  );
};

export default ImageInput;
