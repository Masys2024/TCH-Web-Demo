import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StudentDetails from "./student-details";
import ParentDetails from "./parent-details";
import DocumentsUpload from "./documents-upload";

export default function NewStudentRegistration({
  studentDetails,
  setStudentDetails,
  parentDetails,
  setParentDetails,
  documents,
  setDocuments,
  loadingState,
  handleAdd,
  handleUpdate,
  update = false,
}) {
  return (
    <Card className={"p-4"}>
      <div className="w-full grid md:grid-cols-2 gap-4">
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

        <DocumentsUpload formData={documents} setFormData={setDocuments} />
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
