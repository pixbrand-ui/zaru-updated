import React, { useEffect, useState } from "react";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import FormModal from "../../../Components/FormModal/FormModal";
import GAlign from "../../../Components/GComponents/GAlign";
import GButton from "../../../Components/GComponents/GButton";
import GCard from "../../../Components/GComponents/GCard";
import GFileInput from "../../../Components/GComponents/GFileInput";
import GInput from "../../../Components/GComponents/GInput";
import GSelect from "../../../Components/GComponents/GSelect";
import OptionDataItem from "../Questions/OptionDataItem";
import SelectQuestionListPage from "../Questions/SelectQuestionsList";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import Auth from "../../../Helpers/Auth/Auth";

export default function AddSubcategoriesPage() {
  const inputRef = React.createRef();
  const [updateQuestionSetList, setupdateQuestionSetList] = useState(false);
  const [selectedQuestionSet, setselectedQuestionSet] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("");
  const [optionsData, setOptionsData] = useState([]);

  const loadCategories = () => {
    try {
      HTTP.get(API.get_categories, false).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          if (res.data) {
            let list = [];
            res.data.map((i, ind) => {
              if (ind === 0) {
                setSelectedCategory({ id: i._id, name: i.category_name });
              }
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

  useEffect(() => {
    loadCategories();
  }, []);
  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    if (updateQuestionSetList) {
      let initdata = [];
      initdata = [...optionsData];
      let isExists = false;
      if (selectedQuestionSet !== "") {
        initdata.forEach((element) => {
          if (element[0] === selectedQuestionSet[0]) {
            isExists = true;
          }
        });
        !isExists
          ? initdata.push(selectedQuestionSet)
          : AlertModal02.show(
              "Question set is already exists in list.",
              "Oops!"
            );
        setselectedQuestionSet("");
        setOptionsData(initdata);
      }
      setupdateQuestionSetList(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateQuestionSetList]);

  const deleteSelectedOptionData = (data) => {
    let initdata = [];
    initdata = [...optionsData];
    let index = optionsData.indexOf(data);
    initdata.splice(index, 1);
    setOptionsData(initdata);
  };

  const selectQuestionSet = (data) => {
    setselectedQuestionSet(data);
  };

  const addSelectedQuestionSetToList = () => {
    setupdateQuestionSetList(true);
  };

  const saveData = () => {
    LoadingModal.show("Please wait...");
    try {
      let quesData = [];
      if (subCategoryName.trim().length <= 0) {
        LoadingModal.hide();
        return AlertModal02.show(
          "Please enter sub-category name.",
          "Oops!",
          () => {},
          "sm"
        );
      }
      if (selectedCategory.length <= 0) {
        LoadingModal.hide();
        return AlertModal02.show(
          "Please select parent category.",
          "Oops!",
          () => {},
          "sm"
        );
      }
      if (optionsData.length <= 0) {
        LoadingModal.hide();
        return AlertModal02.show(
          "Please add at least 01 question set.",
          "Oops!",
          () => {},
          "sm"
        );
      }
      if (image === "") {
        LoadingModal.hide();
        return AlertModal02.show("Please add category image.", "Oops!");
      }

      optionsData.map((i, ind) => {
        quesData.push(i[0]);
        return <span key={ind}></span>;
      });

      const iData = new FormData();
      iData.append("subcategory_name", subCategoryName);
      iData.append("categoryid", selectedCategory.id);
      iData.append("questionsIdArray", JSON.stringify(quesData));
      iData.append("image", image);

      HTTP.postimage(
        API.add_subcategory,
        iData,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          LoadingModal.hide();
          AlertModal02.show(
            "Sub-Category created successfully.",
            "Done!",
            () => {
              FormModal.hide();
            },
            "sm"
          );
        }
      });
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
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            ref={inputRef}
          />

          {/* field 02 */}
          <label htmlFor="que_type" className="p-1 fs16 fw600">
            Select Category
          </label>
          <GSelect
            id="que_required"
            className="w-100 mb-1"
            onChange={(e) => {
              setSelectedCategory({
                id: e.target.selectedOptions[0].value,
                name: e.target.selectedOptions[0].label,
              });
            }}
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
            onChange={(e) => checkAndSetImage(e.target.files[0])}
          />

          <GCard
            className="optionAddingCard mt-3"
            direction="column"
            boxShadow="0px 1px 5px #00000050"
          >
            <span className="card-title">Add Questions Set</span>
            <GAlign align="left" className="mb-3">
              <GButton
                onClick={(e) =>
                  AlertModal02.show(
                    <SelectQuestionListPage callback={selectQuestionSet} />,
                    "Select",
                    addSelectedQuestionSetToList,
                    "xl",
                    "Select",
                    true
                  )
                }
              >
                Select Questions Set
              </GButton>
            </GAlign>
            <GAlign align="center" className="options-data-list">
              {optionsData &&
                optionsData.length > 0 &&
                optionsData.map((i, ind) => {
                  return (
                    <OptionDataItem
                      key={ind}
                      value={i[1]}
                      onDeleteClick={deleteSelectedOptionData}
                    />
                  );
                })}
            </GAlign>
          </GCard>
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
