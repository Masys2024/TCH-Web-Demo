import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EnquiryDetails from "./enquiry-details";
import StudentDetails from "./student-details";
import ParentDetails from "./parent-details";

export default function NewStudentEnquiry({
  enquiryDetails,
  setEnquiryDetails,
  studentDetails,
  setStudentDetails,
  parentDetails,
  setParentDetails,
  loadingState,
  handleAdd,
  handleUpdate,
  update = false,
}) {
  return (
    <Card className={"p-4"}>
      <div className="w-full grid grid-cols-2 gap-4">
        {/* Enquiry Details */}
        <EnquiryDetails
          formData={enquiryDetails}
          setFormData={setEnquiryDetails}
        />

        {/* Student Details */}
        <StudentDetails
          formData={studentDetails}
          setFormData={setStudentDetails}
        />

        {/* Parent Details */}
        <ParentDetails
          formData={parentDetails}
          setFormData={setParentDetails}
        />
      </div>

      <div className="flex items-center justify-end">
        {update ? (
          <Button disabled={loadingState} onClick={handleUpdate}>
            {loadingState ? "Updating Enquiry" : "Update Enquiry"}
          </Button>
        ) : (
          <Button disabled={loadingState} onClick={handleAdd}>
            {loadingState ? "Creating Enquiry" : "Create Enquiry"}
          </Button>
        )}
      </div>
    </Card>
  );
}
