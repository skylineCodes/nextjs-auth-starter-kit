import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface File {
  id: number;
  name: string;
  organization: string;
  owner: string;
  date: string;
}

interface FileTableProps {
  files: File[];
}

const FileTable: React.FC<FileTableProps> = ({ files }) => {
  return (
    <Table>
      <TableHeader className="bg-gray-100 cursor-pointer">
        <TableRow>
          <TableHead className="w-[100px]">File</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead className="text-right">Owner</TableHead>
          <TableHead className="text-right">Date Uploaded</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="cursor-pointer">
        {files.map((file) => (
          <TableRow key={file.id}>
            <TableCell className="font-medium cursor-pointer">{file.id}</TableCell>
            <TableCell>{file.name}</TableCell>
            <TableCell>{file.organization}</TableCell>
            <TableCell className="text-right">{file.owner}</TableCell>
            <TableCell className="text-right">
              {new Date(file.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FileTable;