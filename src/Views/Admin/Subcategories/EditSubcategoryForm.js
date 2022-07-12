import React, { useEffect, useState } from "react";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import FormModal from "../../../Components/FormModal/FormModal";
import GAlign from "../../../Components/GComponents/GAlign";
import GButton from "../../../Components/GComponents/GButton";
import GCard from "../../../Components/GComponents/GCard";
import GFileInput from "../../../Components/GComponents/GFileInput";
import GInput from "../../../Components/GComponents/GInput";
import GSelect from "../../../Components/GComponents/GSelect";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
export default function EditSubcategoryForm(props) {
  const inputRef = React.createRef();
  const [formdata, setformdata] = useState({
    subcategory_name: "",
    categoryid: "",
    image: null,
  });
  const [selectedid, setSelectedId] = useState(props.id || "");
  const [categoriesList, setCategoriesList] = useState([]);
  const addOptionRef = React.createRef();
  const [image, setImage] = useState("");
  useEffect(() => {
    loadData(selectedid);
    loadCategories()
  }, [selectedid]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  const loadCategories = () => {
    try {
      HTTP.get(API.get_categories, false).then((res) => {
        console.log('categorydata',res)
        if (res && res.status && res.status.toString() === "200") {
          if (res.data) {
            let list = [];
            res.data.map((i, ind) => {
              list.push({ id: i._id, name: i.category_name });
              return <span key={ind}></span>;
            });
            setCategoriesList(list);
          }
        }
      });
    } catch (e) {
      console.log("error", e);
    }
  };


  const loadData = (selectedid) => {
    LoadingModal.show("Please wait...");
    try {
      HTTP.get(API.adminSubcategoryInfo + selectedid, false, Auth.getToken()).then((res) => {
          console.log(res)
        if (res && res.status && res.status.toString() === "200") {
          if (res.data) {
            setformdata({
              ...formdata,
              subcategory_name: res.data.subcategory_name,
              categoryid: res.data.categoryid,
              subcategory_image: res.data.subcategory_image,
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
  const saveData = () => {
    try {
      if (formdata.subcategory_name.trim().length <= 0) {
        return AlertModal02.show(
          "Please enter question title.",
          "Oops!",
          () => {},
          "sm"
        );
      }
      if (formdata.categoryid.trim().length <= 0) {
        return AlertModal02.show(
          "Please select question type.",
          "Oops!",
          () => {},
          "sm"
        );
      }
      const iData = new FormData();
      iData.append("subcategory_name", formdata.subcategory_name);
      iData.append("categoryid", formdata.categoryid);
      iData.append("image", image);
      HTTP.put(API.adminSubcategoryUpdate + selectedid, iData, true, false, Auth.getToken()).then(
        (res) => {
          console.log(res)
          if (res && res.status && res.status.toString() === "200") {
            AlertModal02.show(
              "Question set update successfully.",
              "Done!",
              () => {
                FormModal.hide();
              },
              "sm"
            );
          }
        }
      );
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <>
      <div className="w-100 p-2">
        <div className="d-flex-col justify-content-center">
          {/* field 01 */}
          <label htmlFor="cat_name" className="p-1 fs16 fw600">
            Subcategory Name
          </label>
          <GInput
            id="cat_name"
            className="w-100 mb-1"
            placeholder="enter sub-category name like : Home Cleaning"
            name="subcategory_name"
            value={formdata.subcategory_name}
            onChange={(e) => handleInputChange(e)}
            ref={inputRef}
          />

          {/* field 02 */}
          <label htmlFor="que_type" className="p-1 fs16 fw600">
            Select Category
          </label>
          <GSelect
            id="que_required"
            className="w-100 mb-1"
            name="categoryid"
            value={formdata.categoryid}
            onChange={(e) => handleInputChange(e)}
          >
            {categoriesList.map((i, ind) => {
              return (
                <option key={ind} value={i.id}>
                  {i.name}
                </option>
              );
            })}
          </GSelect>

          {/* field 03 */}
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
            accept="image/png, image/jpeg"
            name="image"
            value={formdata.image}
            onChange={(e) => handleInputChange(e)}
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
          <GButton onClick={(e) => saveData()}>Save</GButton>
        </GAlign>
      </div>
    </>
  );
}
