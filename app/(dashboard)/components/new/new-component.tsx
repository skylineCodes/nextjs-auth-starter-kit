"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaPlus } from "react-icons/fa6";
import PropertiesInput from "@/components/PropertiesInput";
import FigmaDataEditor from "@/components/FigmaDataEditor";

// Framework options for exportedCodes
const FRAMEWORKS = ["React Native", "Flutter", "HTML/TailwindCSS", "Figma JSON"];

// Example tag options
const TAG_OPTIONS = [
  "Navigation",
  "Header",
  "Input",
  "Pricing",
  "Cards",
  "Analytics",
  "Chart",
  "Footer",
  "Form",
  "Widget",
];

export default function CreateComponentForm() {
  const [tags, setTags] = useState<string[]>([]);
  const [variants, setVariants] = useState<any[]>([]);
  const [properties, setProperties] = useState({});

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    tags: "",
    platform: "",
    status: "",
    version: "",
    description: "",
    category: "",
    thumbnail: "",
    created_by: "68a4fe431cb2b4c2ee6a7e9e",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        name: "",
        properties: {},
        preview_url: "",
        figma_data: {},
        exportedCodes: [],
      },
    ]);
  };

  const updateVariant = (index: number, field: string, value: any) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addExportedCode = (variantIndex: number) => {
    const updated = [...variants];
    updated[variantIndex].exportedCodes.push({
      framework: "",
      code_snippet: "",
    });
    setVariants(updated);
  };

  const updateExportedCode = (
    variantIndex: number,
    codeIndex: number,
    field: string,
    value: any
  ) => {
    const updated = [...variants];
    updated[variantIndex].exportedCodes[codeIndex][field] = value;
    setVariants(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags,
      variants,
    };
    console.log("Final Payload:", payload);
    // call API POST here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
    >
      {/* Submit */}
      <div className="md:col-span-2 flex justify-end">
        <Button type="submit" className="h-12 px-6 cursor-pointer bg-[#8F33CC]">
          Create Component
        </Button>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <Label>Name</Label>
        <Input
          className="h-12"
          placeholder="Enter component name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>

      {/* Type */}
      <div className="flex flex-col gap-2 w-full">
        <Label>Type</Label>
        <Select onValueChange={(v) => handleChange("type", v)}>
          <SelectTrigger className="w-full h-[-webkit-fill-available] data-[size=default]:h-[-webkit-fill-available]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ui">UI</SelectItem>
            <SelectItem value="form">Form</SelectItem>
            <SelectItem value="widget">Widget</SelectItem>
            <SelectItem value="layout">Layout</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tags - chips-style */}
      <div className="flex flex-col space-y-2 w-full">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2 w-full">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                className="ml-2 text-blue-500 hover:text-blue-700"
                onClick={() => handleRemoveTag(tag)}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <Select onValueChange={handleAddTag}>
          <SelectTrigger className="h-12 w-full">
            <SelectValue placeholder="Add a tag" />
          </SelectTrigger>
          <SelectContent>
            {TAG_OPTIONS.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Platform */}
      <div className="flex flex-col gap-2">
        <Label>Platform</Label>
        <Select onValueChange={(v) => handleChange("platform", v)}>
          <SelectTrigger className="h-12 w-full">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="react-native">React Native</SelectItem>
            <SelectItem value="flutter">Flutter</SelectItem>
            <SelectItem value="figma">Figma</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="flex flex-col gap-2">
        <Label>Status</Label>
        <Select onValueChange={(v) => handleChange("status", v)}>
          <SelectTrigger className="h-12 w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Version */}
      <div className="flex flex-col gap-2">
        <Label>Version</Label>
        <Input
          className="h-12"
          placeholder="e.g. 1.0.0"
          value={formData.version}
          onChange={(e) => handleChange("version", e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2 w-full">
        <Label>Category</Label>
        <Select onValueChange={(v) => handleChange("category", v)}>
          <SelectTrigger className="w-full h-[-webkit-fill-available] data-[size=default]:h-[-webkit-fill-available]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ui">Button</SelectItem>
            <SelectItem value="form">Action Sheet</SelectItem>
            <SelectItem value="widget">Dialog</SelectItem>
            <SelectItem value="layout">Drawer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Thumbnail */}
      <div className="flex flex-col gap-2">
        <Label>Thumbnail</Label>
        <Input
          className="h-12"
          type="url"
          placeholder="Thumbnail URL"
          value={formData.thumbnail}
          onChange={(e) => handleChange("thumbnail", e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2 md:col-span-2">
        <Label>Description</Label>
        <Textarea
          className="h-24"
          placeholder="Write a short description..."
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* Variants Section */}
      <div className="flex flex-col gap-4 border-t md:col-span-2 pt-4 w-full">
        <div className="flex justify-between items-center cursor-pointer">
          <Label className="text-lg">Variants</Label>
          <Button type="button" onClick={addVariant} className="bg-[#8F33CC] cursor-pointer flex gap-3 items-center"><FaPlus /> <span>Add Variant</span></Button>
        </div>

        {variants.map((variant, vIdx) => (
          <div key={vIdx} className="p-4 space-y-4">
            <Label>Variant Name</Label>
            <Input
              placeholder="Variant Name"
              className="h-12"
              value={variant.name}
              onChange={(e) => updateVariant(vIdx, "name", e.target.value)}
            />

            <div className="flex flex-col gap-2 md:col-span-2">
              <Label>Properties</Label>
              <Textarea
                className="h-24"
                placeholder="Write a short description..."
                value={JSON.stringify(variant.properties, null, 2)}
                onChange={(e) =>
                  updateVariant(vIdx, "properties", JSON.parse(e.target.value || "{}"))
                }
              />
            </div>

            <PropertiesInput properties={properties} setProperties={setProperties} updateVariant={updateVariant} vIdx={vIdx} />

            <FigmaDataEditor value={JSON.stringify(variant.figma_data, null, 2)} onChange={(e: any) =>
                updateVariant(vIdx, "figma_data", JSON.parse(e.target.value || "{}"))
              } />

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                // 1. Generate a local preview (optional)
                const previewUrl = URL.createObjectURL(file);
                updateVariant(vIdx, "preview_url", previewUrl);

                // 2. Or upload to your server / S3 / Cloudinary here
                // uploadFile(file).then((url) => {
                //   updateVariant(vIdx, "preview_url", url);
                // });
              }}
            />

            {variant.preview_url && (
              <img
                src={variant.preview_url}
                alt="Preview"
                className="w-20 h-20 object-cover rounded mt-2"
              />
            )}

            {/* Exported Codes */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Exported Codes</Label>
                <Button
                  type="button"
                  onClick={() => addExportedCode(vIdx)}
                   className="h-12 px-6 cursor-pointer bg-[#8F33CC]"
                >
                  + Add Code
                </Button>
              </div>
              {variant.exportedCodes.map((code: any, cIdx: number) => (
                <div
                  key={cIdx}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start"
                >
                  <Select
                    onValueChange={(val) =>
                      updateExportedCode(vIdx, cIdx, "framework", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Framework" />
                    </SelectTrigger>
                    <SelectContent>
                      {FRAMEWORKS.map((fw) => (
                        <SelectItem key={fw} value={fw}>
                          {fw}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Textarea
                    placeholder="Code Snippet"
                    value={code.code_snippet}
                    onChange={(e) =>
                      updateExportedCode(vIdx, cIdx, "code_snippet", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}
