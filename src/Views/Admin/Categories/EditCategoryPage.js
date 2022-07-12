/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import FormModal from "../../../Components/FormModal/FormModal";
import GAlign from "../../../Components/GComponents/GAlign";
import GButton from "../../../Components/GComponents/GButton";
import GFileInput from "../../../Components/GComponents/GFileInput";
import GInput from "../../../Components/GComponents/GInput";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";

export default function EditCategoryPage(props) {
  console.log("props.id",props.id);
  const [formdata, setformdata] = useState({
    name: "",
    image: "",
  });
  const [categoryid, setcategoryid] = useState(props.id || "");
  const inputRef = React.createRef();
  
  const inputFileRef = React.createRef();
  useEffect(() => {
    inputRef.current.focus();
    loadData(categoryid);
  }, [categoryid]);

  const clearForm = () => {
    setformdata({
      name: "",
      image: "",
      imageurl: "",
    });
    setcategoryid(props.id);
  };

  const loadData = (id) => {
    LoadingModal.show("Please wait...");
    try {
      HTTP.get(API.get_categoryinfo + id, false).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          if (res.data) {
            setformdata({
              ...formdata,
              name: res.data.category_name,
              imageurl: API.imageurl + res.data.category_image,
            });
            LoadingModal.hide();
          }
        } else {
          LoadingModal.hide();
        }
      });
    } catch (e) {
      console.log("error", e);
      LoadingModal.hide();
    }
  };

  const checkAndSetImage = (file) => {
    
    try {
      let type = file.type;
      let size = file.size;
      if (
        type !== "image/jpeg" &&
        type !== "image/jpg" &&
        type !== "image/png"
      ) {
        setformdata({ ...formdata, image: "" });
        return AlertModal02.show(
          'Invalid image format, please select "*.jpeg, *.jpg, *.png" format.',
          "Oops!",
          () => {},
          "sm"
        );
      }
      if (size > 460800) {

        setformdata({ ...formdata, image: "" });
        return AlertModal02.show(
          "Image size allowed upto 500KB, Please select image under 500KB",
          "Oops!",
          () => {},
          "sm"
        );
      }
      setformdata({ ...formdata, image: file, imageurl : URL.createObjectURL(file) });
    } catch (error) {
      console.log(error);
    }
  };

  const onAddClick = () => {
    LoadingModal.show("Please wait...");
    try {
      if (formdata.name.trim().length <= 0) {
        LoadingModal.hide();
        return AlertModal02.show("Please enter category name.", "Oops!");
      }
      if (formdata.image === "") {
        LoadingModal.hide();
        return AlertModal02.show("Please add category image.", "Oops!");
      }
      const iData = new FormData();
      iData.append("category_name", formdata.name);
      iData.append("image", formdata.image);

      HTTP.put(API.put_category + categoryid, iData, true, false, Auth.getToken()).then(
        (res) => {
          if (res && res.status && res.status.toString() === "200") {
            LoadingModal.hide();
            AlertModal02.show(
              "Category updated successfully.",
              "Success!",
              () => {
                clearForm();
                props.callback();
                FormModal.hide();
              },
              "",
              "OK",
              false,
              false
            );
          } else {
            LoadingModal.hide();
            FormModal.hide();
            AlertModal02.show("Already exists.", "Failed!", () => {});
          }
        }
      );
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
            value={formdata.name}
            onChange={(e) => setformdata({ ...formdata, name: e.target.value })}
          />
          {/* field 02 */}
          <label htmlFor="cat_image" className="p-1 fs16 fw600">
            Image
            <span className="label-msg">
              {" "}
              (Max size 500KB & Jpeg, Png format)
            </span>
          </label>
          <GFileInput
            id="cat_image"
            className="w-100"
            placeholder="Select Image"
            ref={inputFileRef}
            accept="image/*"
            onChange={(e) => checkAndSetImage(e.target.files[0])}
          />
          <div className="p-2 w-100">
            <img alt="" src={formdata.imageurl} className="image-fluid w-100" />
          </div>
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
          <GButton onClick={(e) => onAddClick()}>Update</GButton>
        </GAlign>
      </div>
    </>
  );
}
