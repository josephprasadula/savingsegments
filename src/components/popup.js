import React, { useEffect, useState } from "react";

const Popup = ({ setShowModal }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Account Name", value: "account_name" },
  ]);
  const [tempSelectedSchema, setTempSelectedSchema] = useState("");
  const [newSchemaOptions, setNewSchemaOptions] = useState([
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);
  useEffect(() => {
    if (newSchemaOptions[0]?.value) {
      setTempSelectedSchema(newSchemaOptions[0]?.value);
    } else {
      setNewSchemaOptions("");
    }
  }, [selectedSchema]);

  const handleSegmentNameChange = (e) => {
    setSegmentName(e?.target?.value);
  };
  const handleSaveSegment = () => {
    if (segmentName == "") return alert("Set the name before saving");
    const formattedSchema = selectedSchema.map((schema) => ({
      [schema.value]: schema.label,
    }));

    const segmentData = {
      segment_name: segmentName,
      schema: formattedSchema,
    };
    fetch("https://webhook.site/ee205b29-f8c2-4324-938a-0043556f30f8", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...segmentData }),
    })
      .then((response) => {
        console.log("responce,", response);
        setSegmentName("");
        setSelectedSchema([
          { label: "First Name", value: "first_name" },
          { label: "Account Name", value: "account_name" },
        ]);
        setNewSchemaOptions([
          { label: "Last Name", value: "last_name" },
          { label: "Gender", value: "gender" },
          { label: "Age", value: "age" },
          { label: "City", value: "city" },
          { label: "State", value: "state" },
        ]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-[30%] absolute right-0 z-20 bg-white h-full">
      <div className="flex items-center bg-[#39AEBC] text-white p-4 h-[10%]">
        <img src="chevron-back-outline.svg" className="w-[2rem] text-white" />
        <span>Saving Segment</span>
      </div>
      <div className="flex flex-col p-4 border-l-2 border-white space-evenly h-[90%]">
        <label className="text-[1.2rem]" htmlFor="segment-name">
          Enter the name of the segment
        </label>
        <input
          type="text"
          id="segment-name"
          value={segmentName}
          onChange={(e) => handleSegmentNameChange(e)}
          className="p-1 w-[80%] border-2 border-black mx-auto leading-6 my-[1rem]"
        />
        <lable className="text-[1.2rem]">
          To save your segment, you need to add the schemas to build the query
        </lable>
        <div className="flex flex-row-reverse my-[1rem]">
          <div className="flex items-center">
            <div className="bg-red-400 w-[14px] h-[14px] rounded-full mr-[5px]"></div>
            <div>-Group Traits</div>
          </div>
          <div className="flex items-center mr-[1rem]">
            <div className="bg-green-400 w-[14px] h-[14px] rounded-full  mr-[5px]"></div>
            <div>-User Traits</div>
          </div>
        </div>

        <div className="border-2 border-blue-300 w-auto p-4">
          {selectedSchema.map((schema, index) => (
            <div
              key={"selected schema" + schema?.value + index}
              className="flex w-auto items-center my-[10px]"
            >
              <div
                className={`${
                  schema?.label == "Account Name"
                    ? "bg-red-400 w-[14px]"
                    : "bg-green-400 w-[14px]"
                } h-[14px] rounded-full  mr-[5px]`}
              ></div>
              <select
                className="w-full leading-8 border-2 border-black mr-[10px]"
                defaultValue={schema?.value}
                onChange={(e) => {
                  const temp = newSchemaOptions?.filter(
                    (item) => item?.value == e?.target?.value
                  );
                  // console.log("temp", temp);
                  setSelectedSchema((prev) => [...prev, temp[0]]);
                  setSelectedSchema((prev) =>
                    prev?.filter((item) => item?.value !== schema?.value)
                  );
                  setNewSchemaOptions((prev) =>
                    prev?.filter((item) => item?.value !== temp[0]?.value)
                  );
                  setNewSchemaOptions((prev) => [...prev, schema]);
                }}
              >
                <option key={schema?.value} value={schema?.value}>
                  {schema?.label}
                </option>
                {newSchemaOptions?.length > 0 &&
                  newSchemaOptions?.map((option) => (
                    <option
                      key={option?.value}
                      name={option?.label}
                      value={option?.value}
                    >
                      {option?.label}
                    </option>
                  ))}
              </select>
              <div className="border-t-4 border-slate-400 w-[10%] h-[2px]"></div>
            </div>
          ))}
        </div>
        <div className="p-4 w-auto">
          {newSchemaOptions?.length > 0 && (
            <div className="flex w-auto items-center my-[10px]">
              <div className="bg-slate-400 w-[14px] h-[14px] rounded-full  mr-[5px]"></div>
              <select
                placeholder="Account Name"
                className="w-full leading-8 border-2 border-black mr-[10px]"
                value={tempSelectedSchema}
                onChange={(e) => {
                  console.log("e from select value--->", e?.target?.name);
                  setTempSelectedSchema(e?.target?.value);
                }}
              >
                {newSchemaOptions.map((option) => (
                  <option
                    key={option.value}
                    name={option?.label}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="border-t-4 border-slate-400 w-[10%] h-[2px]"></div>
            </div>
          )}
          <div
            className="text-emerald-600 underline"
            onClick={() => {
              if (newSchemaOptions?.length == 0)
                return alert("there nothing left to addd");
              const temp = newSchemaOptions?.filter(
                (item) => item?.value == tempSelectedSchema
              );
              // console.log("temp", temp);
              setSelectedSchema((prev) => [...prev, temp[0]]);
              setNewSchemaOptions((prev) =>
                prev?.filter((item) => item?.value !== tempSelectedSchema)
              );
            }}
          >
            + Add New Schema
          </div>
        </div>

        <div className="mt-auto bg-slate-300 p-2 flex justify-between  px-[3rem]">
          <button
            className="bg-emerald-400 text-white p-2"
            onClick={handleSaveSegment}
          >
            Save the Segment
          </button>
          <button
            className="bg-white text-red-400 p-2"
            // onClick={handleSaveSegment}
            onClick={() => {
              setSegmentName("");
              setSelectedSchema([
                { label: "First Name", value: "first_name" },
                { label: "Account Name", value: "account_name" },
              ]);
              setNewSchemaOptions([
                { label: "Last Name", value: "last_name" },
                { label: "Gender", value: "gender" },
                { label: "Age", value: "age" },
                { label: "City", value: "city" },
                { label: "State", value: "state" },
              ]);
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
