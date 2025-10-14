import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { WHATSAPP_SETTINGS } from "@/constants/data/whatsapp_settings";
import React, { useState } from "react";
import BankAccountsDialog from "./bank-accounts-dialog";
import SocialMediaDialog from "./social-media-dialog";

export default function AddSettingsForm({
  formData,
  setFormData,
  bankDetails,
  setBankDetails,
  socialMedias,
  setSocialMedias,
}) {
  const handleSwitchChange = (checked, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const [whatsappSettings, setWhatsappSettings] = useState(WHATSAPP_SETTINGS);

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 pb-4">
          {/* Whatsapp Messages */}
          <div className="w-full grid gap-2">
            <div className="flex items-center justify-between">
              <div className="grid gap-2">
                <CardTitle>Whatsapp Messages</CardTitle>
                <CardDescription>
                  Configure Whatsapp to send whatsapp messages to students and
                  their parents when lecture schedules, attendance, fees
                  payment.
                </CardDescription>
              </div>
              <Switch
                checked={formData.whatsapp}
                onCheckedChange={(checked) =>
                  handleSwitchChange(checked, "whatsapp")
                }
              />
            </div>
          </div>

          {/* List View */}
          <div className="grid grid-cols-2 gap-6 p-4 border rounded-lg text-xs">
            {WHATSAPP_SETTINGS?.map((setting, idx) => (
              <div key={setting.Id} className="w-full flex items-center gap-2">
                <Checkbox
                  checked={setting.isEnabled}
                  onCheckedChange={(checked) => {
                    setWhatsappSettings((prev) =>
                      prev.map((item, i) =>
                        i === idx ? { ...item, isEnabled: checked } : item
                      )
                    );
                  }}
                />
                <Label className={"w-full text-xs"}>{setting.Name}</Label>
                <Input
                  type={"text"}
                  value={setting.Message}
                  onChange={(e) => {
                    setWhatsappSettings((prev) =>
                      prev.map((item, i) =>
                        i === idx ? { ...item, Message: e.target.value } : item
                      )
                    );
                  }}
                  className={"w-full text-xs"}
                />
              </div>
            ))}
          </div>

          {/* Payment Gateway */}
          <div className="w-full grid gap-2 pt-8">
            <div className="flex items-center justify-between">
              <div className="grid gap-2">
                <CardTitle>Payment Gateway</CardTitle>
                <CardDescription>
                  Configure payment gateway to receive payments online.
                </CardDescription>
              </div>
              <Switch
                checked={formData.whatsapp}
                onCheckedChange={(checked) =>
                  handleSwitchChange(checked, "paymentGateway")
                }
              />
            </div>
          </div>

          {/* Bank Accounts */}
          <div className="w-full grid gap-2 pt-8">
            <div className="flex items-center justify-between">
              <div className="grid gap-2">
                <CardTitle>Bank Accounts</CardTitle>
                <CardDescription>
                  Save bank account details to use in application.
                </CardDescription>
              </div>
              <BankAccountsDialog
                formData={bankDetails}
                setFormData={setBankDetails}
              />
            </div>
          </div>

          {/* Social Media */}
          <div className="w-full grid gap-2 pt-8">
            <div className="flex items-center justify-between">
              <div className="grid gap-2">
                <CardTitle>Social Media</CardTitle>
                <CardDescription>
                  Save social media details so links are used to share in
                  application.
                </CardDescription>
              </div>
              <SocialMediaDialog
                formData={socialMedias}
                setFormData={setSocialMedias}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
