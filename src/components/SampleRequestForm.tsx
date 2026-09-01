"use client";

import * as React from "react";
import type { Dict } from "@/i18n/getDictionary";
import { Icon } from "./Icon";

interface Props {
  dict: Dict;
  variant?: "services" | "contact";
}

interface FormState {
  projectName: string;
  date: string;
  materialsSystem: string;
  contactPerson: string;
  email: string;
  ccEmails: string;
  phone?: string;
  message: string;
  imageFile: File | null;
}

export function SampleRequestForm({ dict, variant = "contact" }: Props) {
  const config = variant === "contact" ? dict.contact.form : dict.services.sampleForm;
  const isContact = variant === "contact";

  const getPlaceholder = (fieldKey: string) => {
    const placeholders: Record<string, string> = {
      projectName: "e.g., Al Faisaliyah Tower",
      contactPerson: "e.g., John Doe",
      email: "e.g., name@company.com",
      ccEmails: "e.g., colleague@company.com, boss@company.com",
      phone: "e.g., +966 50 000 0000",
      materialsSystem: "Specify the concrete/chemical systems or solutions you need (e.g. specialized epoxy flooring, high-strength mortar)...",
      message: "Describe your project requirements or specific details...",
    };
    return placeholders[fieldKey] || "";
  };

  const [state, setState] = React.useState<FormState>({
    projectName: "",
    date: "",
    materialsSystem: "",
    contactPerson: "",
    email: "",
    ccEmails: "",
    phone: "",
    message: "",
    imageFile: null,
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const service = params.get("service");
      if (service) {
        setState((s) => ({
          ...s,
          materialsSystem: `Inquiry about: ${decodeURIComponent(service)}`,
        }));
      }
    }
  }, []);

  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setState((s) => ({ ...s, [key]: e.target.value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      setState((s) => ({ ...s, imageFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setState((s) => ({ ...s, imageFile: null }));
    setImagePreviewUrl(null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.projectName || !state.materialsSystem || !state.email) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    // Compose professional email body
    const emailSubject = encodeURIComponent(
      `Sample Request: ${state.projectName} - ${state.materialsSystem}`
    );
    const emailBody = encodeURIComponent(
      `Hello The First System Team,

Please find the details for our sample/technical inquiry below:

- Project Name: ${state.projectName}
- Required Date: ${state.date || "As soon as possible"}
- Material/System: ${state.materialsSystem}
- Contact Person: ${state.contactPerson || "N/A"}
- Email: ${state.email}
- CC: ${state.ccEmails || "None"}
- Phone: ${state.phone || "N/A"}

Project Notes / Requirements:
${state.message || "N/A"}

Attached/Uploaded Image Reference: ${state.imageFile ? state.imageFile.name : "None"}

Sent via TFS Portal`
    );

    const ccParam = state.ccEmails ? `&cc=${encodeURIComponent(state.ccEmails)}` : "";
    const mailtoUrl = `mailto:info@firstsystem.sa?subject=${emailSubject}&body=${emailBody}${ccParam}`;

    // Trigger user's email client
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setStatus("sent");
    }, 600);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="ui-card rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8 shadow-xl"
    >
      <div>
        <h3 className="text-display text-2xl font-medium md:text-3xl">{config.title}</h3>
        <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{config.subtitle}</p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Field label={config.fields.projectName} required>
          <input
            type="text"
            required
            value={state.projectName}
            onChange={update("projectName")}
            placeholder={getPlaceholder("projectName")}
            className={inputClass}
          />
        </Field>

        <Field label={isContact ? dict.contact.form.fields.date : dict.services.sampleForm.fields.deliveryDate}>
          <input
            type="date"
            value={state.date}
            onChange={update("date")}
            className={inputClass}
          />
        </Field>

        <Field label={config.fields.materialsSystem} required className="md:col-span-2">
          <input
            type="text"
            required
            value={state.materialsSystem}
            onChange={update("materialsSystem")}
            placeholder={getPlaceholder("materialsSystem")}
            className={inputClass}
          />
        </Field>

        <Field label={config.fields.contactPerson}>
          <input
            type="text"
            value={state.contactPerson}
            onChange={update("contactPerson")}
            placeholder={getPlaceholder("contactPerson")}
            className={inputClass}
          />
        </Field>

        <Field label={isContact ? dict.contact.form.fields.email : dict.services.sampleForm.fields.email} required>
          <input
            type="email"
            required
            value={state.email}
            onChange={update("email")}
            placeholder={getPlaceholder("email")}
            className={inputClass}
            dir="ltr"
          />
        </Field>

        <Field label="CC Email(s) (optional)" className="md:col-span-2">
          <input
            type="text"
            value={state.ccEmails}
            onChange={update("ccEmails")}
            placeholder={getPlaceholder("ccEmails")}
            className={inputClass}
            dir="ltr"
          />
        </Field>

        {isContact && (
          <Field label={dict.contact.form.fields.phone} className="md:col-span-2">
            <input
              type="tel"
              value={state.phone}
              onChange={update("phone")}
              placeholder={getPlaceholder("phone")}
              className={inputClass}
              dir="ltr"
            />
          </Field>
        )}

        {/* Image/File Upload zone */}
        <div className="md:col-span-2">
          <span className="text-xs font-medium text-[var(--color-fg-muted)] block mb-2">
            Reference Image / Spec Sample (optional)
          </span>
          
          {imagePreviewUrl ? (
            <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="h-14 w-14 rounded-lg object-cover border border-[var(--color-border)]"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[var(--color-fg)] truncate max-w-[200px] sm:max-w-xs">
                    {state.imageFile?.name}
                  </p>
                  <p className="text-[10px] text-[var(--color-fg-subtle)] font-mono">
                    {state.imageFile ? (state.imageFile.size / 1024 / 1024).toFixed(2) + " MB" : ""}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="grid h-8 w-8 place-items-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                title="Remove file"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface-elevated)]/30 hover:bg-[var(--color-surface-elevated)]/50 hover:border-[var(--color-accent)]/55 p-6 text-center cursor-pointer transition-all duration-300">
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--color-bg)]/80 text-[var(--color-accent)] mb-3 shadow-sm border border-[var(--color-border)]">
                <Icon name="Upload" size={20} />
              </div>
              <p className="text-xs font-semibold text-[var(--color-fg)]">
                Click to upload an image or drag & drop
              </p>
              <p className="text-[10px] text-[var(--color-fg-subtle)] mt-1">
                Supports PNG, JPG, WEBP (max 5MB)
              </p>
            </label>
          )}
        </div>

        <Field
          label={isContact ? dict.contact.form.fields.message : dict.services.sampleForm.fields.message}
          className="md:col-span-2"
        >
          <textarea
            rows={4}
            value={state.message}
            onChange={update("message")}
            placeholder={getPlaceholder("message")}
            className={`${inputClass} resize-none py-3`}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[var(--color-fg-subtle)]">
          {status === "error" ? dict.common.formError : ""}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1D1D1D] px-6 text-sm font-semibold text-[#F9F7F3] hover:bg-[var(--color-accent)] hover:text-white disabled:opacity-60 transition shadow-sm"
        >
          {status === "sent" ? <Icon name="Check" size={16} /> : <Icon name="Send" size={14} />}
          <span>
            {status === "sending"
              ? dict.common.sending
              : status === "sent"
                ? dict.common.sent
                : config.submit}
          </span>
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-muted)] focus:border-[var(--color-accent)]/50 focus:outline-none transition";

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-xs font-medium text-[var(--color-fg-muted)]">
        {label}
        {required && <span className="text-[var(--color-accent)]"> *</span>}
      </span>
      {children}
    </label>
  );
}
