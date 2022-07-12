import React, { useEffect, useState } from "react";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import FormModal from "../../../Components/FormModal/FormModal";
import GAlign from "../../../Components/GComponents/GAlign";
import GButton from "../../../Components/GComponents/GButton";
import GFileInput from "../../../Components/GComponents/GFileInput";
import GInput from "../../../Components/GComponents/GInput";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";

export default function AddCategoriesPage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const inputRef = React.createRef();
  const inputFileRef = React.createRef();
  useEffect(() => {
    inputRef.current.focus();
  },[]);

  const clearForm = () => {
    setName("");
    setImage("");
  };

  const checkAndSetImage = (file) => {
    let type = file.type;
    let size = file.size;
    if (type !== "image/jpeg" && type !== "image/jpg" && type !== "image/png") {
      setImage("");
      return AlertModal02.show(
        'Invalid image format, please select "*.jpeg, *.jpg, *.png" format.',
        "Oops!",
        () => {},
        "sm"
      );
    }
    if (size > 460800) {
      setImage("");
      return AlertModal02.show(
        "Image size allowed upto 500KB, Please select image under 500KB",
        "Oops!",
        () => {},
        "sm"
      );
    }
    setImage(file);
  };

  const onAddClick = () => {
    LoadingModal.show("Please wait...");
    try {
      if (name.trim().length <= 0) {
        LoadingModal.hide();
        return AlertModal02.show("Please enter category name.", "Oops!");
      }
      if (image === "") {
        LoadingModal.hide();
        return AlertModal02.show("Please add category image.", "Oops!");
      }
      const iData = new FormData();
      iData.append("category_name", name);
      iData.append("image", image);

      HTTP.postimage(API.add_category, iData, true, false, Auth.getToken()).then((res) => {
        console.log("add cat",res);
        if (res && res.status && res.status.toString() === "200") {
          LoadingModal.hide();
          AlertModal02.show("Category has been added", "Success!", () => {
            clearForm();
            FormModal.hide();
          });
        } else {
          LoadingModal.hide();
          FormModal.hide();
          AlertModal02.show("Already exists.", "Failed!", () => {});
        }
      });
    } catch (e) {
      console.log("error!!", e);
      LoadingModal.hide();
    }
    //LoadingModal.hide();
  };
  return (
    <>
      <div className="w-100 p-2">
        
        <div className="d-flex-col justify-content-center">
          {/* field 01 */}
          <label htmlFor="cat_name" className="p-1 fs16 fw600">
            Category Name
          </label>
          <GInput
            id="cat_name"
            className="w-100 mb-1"
            placeholder="enter category name like : Cleaning"
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* field 02 */}
          <label htmlFor="cat_image" className="p-1 fs16 fw600">
            Image
            <span className="label-msg">
              {" "}
              (Max size 50KB & Jpeg, Png format)
            </span>
          </label>
          <GFileInput
            id="cat_image"
            className="w-100"
            placeholder="Select Image"
            ref={inputFileRef}
            onChange={(e) => checkAndSetImage(e.target.files[0])}
          />
        </div>
        <label className="text-danger w-100"></label>
        <GAlign align="right">
          <GButton
            onClick={(e) => FormModal.hide()}
            backgroundColor="#C64756"
            hoverColor="#D83A56"
          >
            Close
          </GButton>
          <GButton onClick={(e) => onAddClick()}>Save</GButton>
        </GAlign>
      </div>
    </>
  );
}
