import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function FigmaDataEditor({ value, onChange }: any) {
  const [raw, setRaw] = useState("");
  const [formatted, setFormatted] = useState("");

  // auto-format whenever raw changes
  useEffect(() => {
    try {
      const parsed = JSON.parse(raw);
      setFormatted(JSON.stringify(parsed, null, 2));
    } catch (err) {
      setFormatted("Invalid JSON ❌");
    }
  }, [raw]);

  const handleSend = async () => {
    try {
      const parsed = JSON.parse(formatted);
      await fetch("/api/save-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      alert("JSON sent successfully ✅");
    } catch (err) {
      alert("Failed to send JSON ❌");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        placeholder="Paste Figma JSON here..."
        className="p-2 border rounded w-full h-40 font-mono"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
      />

      <pre className="p-2 bg-[#F6F6F6] rounded h-auto overflow-auto">
        {formatted}
      </pre>
    </div>
  );
}
