import React, { useEffect, useState } from "react";

const Popup = () => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState([{ label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" }]);
  const [tempSelectedSchema, setTempSelectedSchema] = useState("");
  const [newSchemaOptions, setNewSchemaOptions] = useState([
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);

  const handleSegmentNameChange = (e) => {
    setSegmentName(e?.target?.value);
  };

  // const handleAddNewSchema = () => {
  //   const selectedSchemaOptions = selectedSchema.map((schema) => schema.value);
  //   const unselectedOptions = newSchemaOptions.filter(
  //     (option) => !selectedSchemaOptions.includes(option.value)
  //   );

  //   if (unselectedOptions.length > 0) {
  //     setSelectedSchema([...selectedSchema, unselectedOptions[0]]);
  //     setNewSchemaOptions(unselectedOptions.slice(1));
  //   }
  // };

  // const handleSchemaChange = (index, e) => {
  //   console.log("e", e, e?.target?.value, "index", index);
  //   const updatedSelectedSchema = [...selectedSchema];
  //   // updatedSelectedSchema[index].value = e?.target?.value;
  //   setSelectedSchema(updatedSelectedSchema);
  // };

  // const handleSaveSegment = () => {
  //   const formattedSchema = selectedSchema.map((schema) => ({
  //     [schema.value]: schema.label,
  //   }));

  //   const segmentData = {
  //     segment_name: segmentName,
  //     schema: formattedSchema,
  //   };

  //   // Send segmentData to the server
  //   console.log(segmentData);

  //   // Reset the form
  //   setSegmentName("");
  //   setSelectedSchema([]);
  //   setNewSchemaOptions([
  //     { label: "First Name", value: "first_name" },
  //     { label: "Last Name", value: "last_name" },
  //     { label: "Gender", value: "gender" },
  //     { label: "Age", value: "age" },
  //     { label: "Account Name", value: "account_name" },
  //     { label: "City", value: "city" },
  //     { label: "State", value: "state" },
  //   ]);
  // };

  return (
    <div className="w-[30%] absolute right-0 z-20 bg-white h-full">
      <div className="flex items-center bg-[#39AEBC] text-white mb-[2rem] p-4">
        <img src="chevron-back-outline.svg" className="w-[2rem] text-white" />
        <span>Saving Segment</span>
      </div>
      <div className="flex flex-col p-4 border-l-2 border-white space-evenly">
        <label className="text-[1.2rem]" htmlFor="segment-name">
          Enter the name of the segment
        </label>
        <input
          type="text"
          id="segment-name"
          value={segmentName}
          onChange={(e)=>handleSegmentNameChange(e)}
          className="w-[80%] border-2 border-black m-auto leading-8"
        />
        <lable className="text-[1.2rem]">
          To save your segment, you need to add the schemas to build the query
        </lable>
        <div className="flex flex-row-reverse">
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
          <div className="flex w-auto items-center my-[10px]">
            <div className="bg-green-400 w-[14px] h-[14px] rounded-full  mr-[5px]"></div>
            <select
              placeholder="First Name"
              className="w-full leading-8 border-2 border-black mr-[10px]"
            >
              <option className="leading-8">First Name</option>
            </select>
            <div className="border-t-4 border-slate-400 w-[10%] h-[2px]"></div>
          </div>
          <div className="flex w-auto items-center my-[10px]">
            <div className="bg-red-400 w-[14px] h-[14px] rounded-full  mr-[5px]"></div>
            <select
              placeholder="Account Name"
              className="w-full leading-8 border-2 border-black mr-[10px]"
            >
              <option>Account Name</option>
            </select>
            <div className="border-t-4 border-slate-400 w-[10%] h-[2px]"></div>
          </div>
        </div>
        <div className="p-4 w-auto">
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
          <div
            className="text-emerald-600 underline"
            onClick={() => {
              const temp = (newSchemaOptions?.filter(
                (item) => item?.value == tempSelectedSchema
              ))
              console.log('temp',temp)
              setSelectedSchema((prev)=>{
                if(Array?.isArray(prev)){
                  prev?.push(temp[0])
                }else{
                  return temp[0]
                }
              }).then(
                setNewSchemaOptions((prev) =>
                prev?.filter((item) => item?.value !== tempSelectedSchema)
              )
              )
              
              setTempSelectedSchema("");
            }}
          >
            + Add New Schema
          </div>
        </div>

        {/* <select id="add-schema-dropdown" onChange={handleSchemaChange}>
          {newSchemaOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select> */}

        {/* <div className="blue-box">
          {selectedSchema.map((schema, index) => (
            <select
              key={index}
              value={schema.value}
              onChange={(e) => handleSchemaChange(index, e)}
            ></select>
          ))}
        </div> */}
        <div className="mt-auto bg-slate-300 p-2 flex justify-between  px-[3rem]">
          <button
            className="bg-emerald-400 text-white p-2"
            // onClick={handleSaveSegment}
          >
            Save the Segment
          </button>
          <button
            className="bg-white text-red-400 p-2"
            // onClick={handleSaveSegment}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
