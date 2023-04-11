import React, { useMemo } from "react";
import { motion } from "framer-motion";
import ImageSearchTwoToneIcon from "@mui/icons-material/ImageSearchTwoTone";
import "./style.scss";

type Props = {
  input: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  state: [File, React.Dispatch<React.SetStateAction<File>>];
  defaultImage: string;
};
// "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
export const ImageInput: React.FC<Props> = ({ input, state, defaultImage }) => {
  const [image, setImage] = state;

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0] || null);
    }
  };

  const fileUrl = useMemo(() => {
    return image && image.size !== 0
      ? URL.createObjectURL(image)
      : defaultImage;
  }, [image, defaultImage]);

  return (
    <motion.div
      className="image-input-container"
      style={{ backgroundImage: `url(${fileUrl})` }}
      whileTap={{ scale: 0.9 }}
    >
      <ImageSearchTwoToneIcon className="icon" />
      <input {...input} type="file" accept="image/*" onChange={onImageChange} />
    </motion.div>
  );
};
