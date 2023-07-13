import Image from 'next/image'
import { useState } from 'react'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [showModal,setShowModal] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchema, setSelectedSchema] = useState([]);
  const [newSchemaOptions, setNewSchemaOptions] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ]);

  const handleSegmentNameChange = (e) => {
    setSegmentName(e.target.value);
  };

  const handleAddNewSchema = () => {
    const selectedSchemaOptions = selectedSchema.map((schema) => schema.value);
    const unselectedOptions = newSchemaOptions.filter(
      (option) => !selectedSchemaOptions.includes(option.value)
    );

    if (unselectedOptions.length > 0) {
      setSelectedSchema([...selectedSchema, unselectedOptions[0]]);
      setNewSchemaOptions(unselectedOptions.slice(1));
    }
  };

  const handleSchemaChange = (index, e) => {
    const updatedSelectedSchema = [...selectedSchema];
    updatedSelectedSchema[index].value = e.target.value;
    setSelectedSchema(updatedSelectedSchema);
  };

  const handleSaveSegment = () => {
    const formattedSchema = selectedSchema.map((schema) => ({
      [schema.value]: schema.label,
    }));

    const segmentData = {
      segment_name: segmentName,
      schema: formattedSchema,
    };

    // Send segmentData to the server
    console.log(segmentData);

    // Reset the form
    setSegmentName('');
    setSelectedSchema([]);
    setNewSchemaOptions([
      { label: 'First Name', value: 'first_name' },
      { label: 'Last Name', value: 'last_name' },
      { label: 'Gender', value: 'gender' },
      { label: 'Age', value: 'age' },
      { label: 'Account Name', value: 'account_name' },
      { label: 'City', value: 'city' },
      { label: 'State', value: 'state' },
    ]);
  };

  return (
    <main
      className={`flex min-h-screen flex-col`}
    >
      <div className='flex items-center bg-[#39AEBC] text-white mb-[2rem] p-4'>
        <img src='chevron-back-outline.svg' className='w-[2rem] text-white'/>
        <span>View Audience</span>
      </div>
      <button className='text-white border-2 border-white bg-[#39AEBC] w-[11rem] px-6 py-4 ml-[6rem]' onClick={()=>{setShowModal(true)}}>Save Segment</button>
      {showModal&&<div className="w-[40%] absolute right-0 z-20 ">
      <div className='flex items-center bg-[#39AEBC] text-white mb-[2rem] p-4'>
        <img src='chevron-back-outline.svg' className='w-[2rem] text-white'/>
        <span>Saving Segment</span>
      </div>
      <div className='flex flex-col p-4 border-l-2 border-white'>
      <label htmlFor="segment-name">Enter the name of the segment</label>
        <input
          type="text"
          id="segment-name"
          value={segmentName}
          onChange={handleSegmentNameChange}
        />

        <label htmlFor="add-schema-dropdown">Add Schema to Segment:</label>
        <select id="add-schema-dropdown" onChange={handleSchemaChange}>
          {newSchemaOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <a href="#" onClick={handleAddNewSchema}>
          + Add New Schema
        </a>

        <div className="blue-box">
          {selectedSchema.map((schema, index) => (
            <select
              key={index}
              value={schema.value}
              onChange={(e) => handleSchemaChange(index, e)}
            >
              {newSchemaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}
        </div>

        <button onClick={handleSaveSegment}>Save the Segment</button>
      </div>
        
      </div>
      }
      
    </main>
  )
}
