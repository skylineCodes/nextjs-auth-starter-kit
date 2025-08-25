import { FaDownload } from "react-icons/fa6"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SearchQueryDataTable() {
  const data = [
    {
      query: "buy sneakers online",
      time: "10:32 AM",
      user: "John Doe",
      location: "New York, USA",
      action: "Viewed",
    },
    {
      query: "cheap flights to paris",
      time: "11:45 AM",
      user: "Jane Smith",
      location: "London, UK",
      action: "Clicked",
    },
    {
      query: "best coding bootcamps",
      time: "01:22 PM",
      user: "Ali Khan",
      location: "Lagos, Nigeria",
      action: "Converted",
    },
    {
      query: "laptop deals under 1000",
      time: "02:10 PM",
      user: "Maria Lopez",
      location: "Madrid, Spain",
      action: "Viewed",
    },
    {
      query: "AI tools for marketing",
      time: "03:30 PM",
      user: "Chen Wei",
      location: "Beijing, China",
      action: "Clicked",
    },
    {
      query: "restaurants near me",
      time: "04:12 PM",
      user: "Sarah Johnson",
      location: "Toronto, Canada",
      action: "Viewed",
    },
    {
      query: "crypto price today",
      time: "05:45 PM",
      user: "David Miller",
      location: "Berlin, Germany",
      action: "Converted",
    },
    {
      query: "yoga classes online",
      time: "06:22 PM",
      user: "Anita Sharma",
      location: "Mumbai, India",
      action: "Viewed",
    },
    {
      query: "cheap hotels in dubai",
      time: "07:15 PM",
      user: "Omar Al-Farsi",
      location: "Dubai, UAE",
      action: "Clicked",
    },
    {
      query: "freelance jobs remote",
      time: "08:40 PM",
      user: "Emily Brown",
      location: "San Francisco, USA",
      action: "Viewed",
    },
  ]

  return (
    <Card className="bg-white shadow rounded w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-[16px] font-semibold text-[#1F2937]">Search queries</h2>
        <div className="flex items-center gap-2 text-[#6B7280]">
          <FaDownload className="w-4 h-4 text-[#6B7280]" />
          Export
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-[#E5E7EB]">
            <TableRow>
              <TableHead className="text-[#6B7280] text-[12px]">Search Query</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Time</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">User</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Location</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="text-[#111827] text-[12px]">{row.query}</TableCell>
                <TableCell className="text-[#6B7280] text-[12px]">{row.time}</TableCell>
                <TableCell className="text-[#111827] text-[12px]">{row.user}</TableCell>
                <TableCell className="text-[#6B7280] text-[12px]">{row.location}</TableCell>
                <TableCell className="text-[#111827] text-[12px]">{row.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
