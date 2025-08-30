import { useState } from "react";
import { Button } from "../ui/button";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { Input } from "../ui/input";

type Variant = {
  properties: Record<string, string>;
  setProperties: any;
  updateVariant: any;
  vIdx: any;
};

const PropertiesInput = ({ properties, setProperties, updateVariant, vIdx }: Variant) => {

  const handleChange = (key: string, value: string) => {
    const updated = { ...properties, [key]: value };
    setProperties(updated);
    updateVariant(vIdx, "properties", updated);
  };

  const addProperty = () => {
    const updated = { ...properties, [""]: "" }; // new empty key
    setProperties(updated);
  };

  const removeProperty = (key: string) => {
    const updated = { ...properties };
    delete updated[key];
    setProperties(updated);
    updateVariant(vIdx, "properties", updated);
  };

  return (
    <div className="space-y-2 flex flex-col gap-2">
      {Object.entries(properties).map(([key, value], idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <Input
              className="border p-1 rounded w-1/3 h-12"
              placeholder="Property Name"
              value={key}
              onChange={(e) => {
                const newKey = e.target.value;
                const updated = { ...properties };
                delete updated[key]; // remove old key
                updated[newKey] = value; // add new key
                setProperties(updated);
                updateVariant(vIdx, "properties", updated);
              }}
            />
          <Input
            className="border p-1 rounded w-2/3 h-12"
            placeholder="Value"
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
          />
          <Button
            className="text-red-500 bg-transparent cursor-pointer hover:text-black hover:bg-transparent"
            onClick={() => removeProperty(key)}
          >
            <FaTrash />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={addProperty}
        className="bg-[#8F33CC] cursor-pointer flex gap-3 items-center text-white"
      >
        <FaPlus /> <span>Add Property</span>
      </Button>
    </div>
  );
};

export default PropertiesInput;
