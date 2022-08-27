import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser, uploadPicture } from "../../features/userSlice";

const UploadImg = () => {
  const [file, setFile] = useState<File | undefined>();
  const { userData, uploading } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handlePicture = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    //TODO: Fix the image uplaod!
    if(file)data.append("image", file);

    dispatch(uploadPicture(data));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer l'image</label>
      <input
        type="file"
        id="file"
        name="image"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files![0])}
      />
      <br />
      <input type="submit" value={uploading ? "Chargement..." : "Envoyer"} />
    </form>
  );
};

export default UploadImg;
