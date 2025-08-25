import { useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";
import { MdUploadFile } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { IoClose, IoCloseCircle } from "react-icons/io5";

import './styles.css'

interface FileUploadProps {
  uploadedFiles: any;
  // onFilesSelected: (files: FileList) => void;
  setUploadedFiles: any;
}

const FileUpload: React.FC<FileUploadProps> = ({ uploadedFiles, setUploadedFiles }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");

  // console.log(uploadedFiles);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    // if (event.dataTransfer.files.length) {
    //   onFilesSelected(event.dataTransfer.files);
    // }
  };

  useEffect(() => {
    if (uploadStatus === "uploading") {
      simulateUpload(setProgress);
      setTimeout(() => setUploadStatus("done"), 5000);
    }
  }, [uploadStatus])

  const simulateUpload = (progressCallback: any) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(interval);
      }
  
      progressCallback(progress);
    }, 500);
  }

  const handleFileUpload = (event: any) => {
    // Convert FileList to an array
    const newFiles = Array.from(event.target.files).map((file: any) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      status: "Processing",
      file,
    }));

    // Append new files without resetting the existing ones
    // setFiles((prevFiles: any) => [...prevFiles, ...newFiles]);
    setUploadedFiles((prevFiles: any) => [...prevFiles, ...newFiles]);

    // Simulate API processing (5 seconds per file)
    newFiles.forEach((file: any, index: number) => {
      setTimeout(() => {
        // setFiles((prevFiles: any) =>
        //   prevFiles.map((f: any) =>
        //     f.id === file.id ? { ...f, status: "Completed" } : f
        //   )
        // );
        setUploadedFiles((prevFiles: any) =>
          prevFiles.map((f: any) =>
            f.id === file.id ? { ...f, status: "Completed" } : f
          )
        );
        // if (onFilesSelected) onFilesSelected(file);
      }, 5000 * (index + 1));
    });

    // If no files were previously uploading, set status to "uploading"
    setUploadStatus((prevStatus: string) => (prevStatus === "done" ? "select" : "uploading"));
  };

  const handleDeleteFile = (fileId: string) => {
    // setFiles((prevFiles: any) => prevFiles.filter((file: any) => file.id !== fileId));
    setUploadedFiles((prevFiles: any) => prevFiles.filter((file: any) => file.id !== fileId));
  };

  return (
    <>
      <div
        className={`mt-4 p-2 h-50 border-2 border-dashed rounded-lg shadow flex flex-col items-center justify-center cursor-pointer transition-all ${
          isDragging ? "border-black bg-black" : "border-black bg-white"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        {/* File Drop Area */}
        <div className="rounded-full p-4 bg-blue-200">
          <MdUploadFile size={40} className="text-black" />
        </div>
        <h3 className="font-semibold mb-2">
          Drag and drop files, or{" "}
          <span className="text-black font-bold cursor-pointer">Browse</span>
        </h3>
        <p className="text-xs text-gray-500 truncate">
          Supports single and multiple files.
        </p>
        {/* Hidden File Input */}
        <input
          id="fileInput"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
      {uploadedFiles?.length > 0 ? (
        <div className="file-card-container">
        {uploadedFiles?.map((file: any, index: number) => (
          <div key={index} className="file-card">
            <div className="left-pane">
              <div className="file-icon"><FaRegFileAlt /></div>
              <div className="file-info">
                <h6>{file.name.length > 100 ? `${file.name.substring(0, 97)}...` : file.name}</h6>
                <p>{(file.size / (1024 * 1024) < 1) 
                  ? `${(file.size / 1024).toFixed(2)} KB` 
                  : (file.size / (1024 * 1024) < 1024) 
                  ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` 
                  : `${(file.size / (1024 * 1024 * 1024)).toFixed(2)} GB`}
                </p>
                <div className="progress-bg">
                  <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
            <div className="right-pane">
              {uploadStatus === "select" ? (
                <button onClick={() => handleDeleteFile(file.id)}>
                  <span className="close-icon"><IoClose /></span>
                </button>
              ) : (
                <>
                  {uploadStatus === "uploading" ? (
                    `${progress}%`
                  ) : uploadStatus === "done" ? (
                    <div className="icons">
                      <div className="check-circle" onClick={() => handleDeleteFile(file.id)}>
                        <span className="close-icon"><IoClose /></span>
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        ))}
        </div>
      ) : null}
    </>
  );
};

export default FileUpload;
