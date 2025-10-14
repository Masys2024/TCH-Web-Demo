"use client";

import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ✅ Single Select Datalist
export function DatalistSingle({
  options = [],
  value = "",
  onChange,
  placeholder = "Select an option...",
  emptyMessage = "No results found.",
  className,
  label,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn("w-full", className)}>
      {label && <Label className="mb-1 block">{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {selectedOption ? (
              selectedOption.label
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-60 w-full overflow-y-auto p-0">
          <div className="p-2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ScrollArea className="max-h-60">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="flex cursor-pointer items-center px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </div>
              ))
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// ✅ Multi Select Datalist
export function DatalistMulti({
  options = [],
  value = [],
  onChange,
  placeholder = "Select options...",
  emptyMessage = "No results found.",
  className,
  label,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    console.log(value);
    if (value?.length > 0) {
      setSelectedOptions(options.filter((opt) => value.includes(opt.value)));
    }
  }, [value]);

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (val) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {label && <Label className="mb-1 block">{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            className="w-full justify-between min-h-10"
          >
            <div className="flex flex-wrap gap-1">
              <span className="text-muted-foreground">{placeholder}</span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full overflow-y-auto p-0">
          <div className="p-2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ScrollArea className="max-h-60">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className="flex cursor-pointer items-center px-2 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </div>
              ))
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
      <div className="w-full flex flex-wrap gap-3 p-2">
        {selectedOptions.map((opt) => (
          <Badge
            key={opt.value}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {opt.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
