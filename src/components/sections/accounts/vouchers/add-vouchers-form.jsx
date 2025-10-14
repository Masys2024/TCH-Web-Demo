import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { DatalistSingle } from "@/components/ui/datalist";
import { CATEGORIES } from "@/constants/data/categories";
import ImageUpload from "@/components/ui/image-upload";
import { ACADEMIC_YEARS } from "@/constants/academic-years";
import AddCategoryDialog from "../bills/add-category";
import { Button } from "@/components/ui/button";

export default function AddVoucherForm({
  formData,
  setFormData,
  loadingState = false,
  update = false,
  handleAdd = () => {},
  handleUpdate = () => {},
}) {
  const [errorText, setErrorText] = useState({
    serialNo: "",
    voucherNo: "",
    voucherDate: "",
    financialYear: "",
    issuedBy: "",
    receiverName: "",
    amount: "",
    category: "",
    particulars: "",
    paymentMode: "",
    paymentStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 pb-4">
          {/* Serial No */}
          <div className="w-full grid gap-2">
            <Label>Serial No.</Label>
            <Input
              type={"text"}
              disabled={true}
              name="serialNo"
              value={formData.serialNo}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.serialNo}</p>
          </div>

          {/* Voucher / Ref No. */}
          <div className="w-full grid gap-2">
            <Label>Voucher / Ref No.</Label>
            <Input
              type={"text"}
              name="voucherNo"
              value={formData.voucherNo}
              placeholder="Enter Voucher / Ref No."
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.voucherNo}</p>
          </div>

          {/* Voucher Date */}
          <div className="w-full grid gap-2">
            <Label>Voucher Date</Label>
            <Input
              type={"date"}
              name="voucherDate"
              value={formData.voucherDate}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.voucherDate}</p>
          </div>

          {/* Financial Year */}
          <div className="w-full grid gap-2">
            <Label>Financial Year</Label>
            <DatalistSingle
              options={ACADEMIC_YEARS.map((a) => ({
                value: a.Sr_No,
                label: a.Financial_Year,
                ...a,
              }))}
              value={formData.financialYear}
              onChange={(value) =>
                setFormData({ ...formData, financialYear: value })
              }
              placeholder="Financial Year..."
            />
            <p className="text-xs text-destructive">
              {errorText.financialYear}
            </p>
          </div>

          {/* Issued By  */}
          <div className="w-full grid gap-2">
            <Label>Issued By</Label>
            <Input
              type={"text"}
              disabled={true}
              name="issuedBy"
              value={formData.issuedBy}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.issuedBy}</p>
          </div>

          {/* Receiver Name */}
          <div className="w-full grid gap-2">
            <Label>Receiver Name</Label>
            <Input
              type={"text"}
              name="receiverName"
              value={formData.receiverName}
              placeholder="Enter Receiver Name"
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.receiverName}</p>
          </div>

          {/* Amount */}
          <div className="w-full grid gap-2">
            <Label>Amount</Label>
            <Input
              type={"number"}
              name="amount"
              value={formData.amount}
              placeholder="Enter Amount"
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.amount}</p>
          </div>

          {/* Category */}
          <div className="w-full grid gap-2 col-span-2">
            <div className="w-full flex items-center justify-between gap-4">
              <Label>Category</Label>
              <AddCategoryDialog />
            </div>
            <DatalistSingle
              options={CATEGORIES.map((c) => ({
                label: c.CategoryName,
                value: c.Category_ID,
              }))}
              value={formData.category}
              onChange={(values) =>
                setFormData({ ...formData, category: values })
              }
              placeholder="Select Category..."
            />
            <p className="text-xs text-destructive">{errorText.category}</p>
          </div>

          {/* Particulars */}
          <div className="w-full grid gap-2 col-span-2">
            <Label>Particulars</Label>
            <Input
              type={"text"}
              name="particulars"
              value={formData.particulars}
              placeholder="Enter Particulars"
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.particulars}</p>
          </div>

          {/* Payment Status */}
          <div className="w-full grid gap-2">
            <Label>Payment Status</Label>
            <Select
              value={formData.paymentStatus}
              onValueChange={(value) =>
                setFormData({ ...formData, paymentStatus: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value={"Paid"}>Paid</SelectItem>
                  <SelectItem value={"Unpaid"}>Unpaid</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">
              {errorText.paymentStatus}
            </p>
          </div>

          {/* Payment Mode */}
          <div className="w-full grid gap-2">
            <Label>Payment Mode</Label>
            <Select
              value={formData.paymentMode}
              onValueChange={(value) =>
                setFormData({ ...formData, paymentMode: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Payment Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mode</SelectLabel>
                  <SelectItem value={"Cash"}>Cash</SelectItem>
                  <SelectItem value={"Cheque"}>Cheque</SelectItem>
                  <SelectItem value={"Online"}>Online</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">{errorText.paymentMode}</p>
          </div>
        </div>

        <div className="flex items-center justify-end">
          {update ? (
            <Button disabled={loadingState} onClick={handleUpdate}>
              {loadingState ? "Updating Voucher" : "Update Voucher"}
            </Button>
          ) : (
            <Button disabled={loadingState} onClick={handleAdd}>
              {loadingState ? "Creating Voucher" : "Create Voucher"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
