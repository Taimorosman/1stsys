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
  const locale = dict.nav.switchTo === "العربية" ? "en" : "ar";

  const getPlaceholder = (fieldKey: string) => {
    const placeholders: Record<string, { en: string; ar: string }> = {
      projectName: { en: "e.g., Al Faisaliyah Tower", ar: "مثال: برج الفيصلية" },
      contactPerson: { en: "e.g., John Doe", ar: "مثال: محمد أحمد" },
      email: { en: "e.g., name@company.com", ar: "مثال: name@company.com" },
      ccEmails: { en: "e.g., colleague@company.com, boss@company.com", ar: "مثال: colleague@company.com, manager@company.com" },
      phone: { en: "e.g., +966 50 000 0000", ar: "مثال: +966 50 000 0000" },
      materialsSystem: {
        en: "Specify the concrete/chemical systems or solutions you need (e.g. specialized epoxy flooring, high-strength mortar)...",
        ar: "حدد أنظمة الخرسانة/الكيماويات أو الحلول التي تحتاجها (مثال: أرضيات الإيبوكسي المتخصصة، ملاط عالي القوة)..."
      },
      message: { en: "Describe your project requirements or specific details...", ar: "صف متطلبات مشروعك أو أي تفاصيل محددة..." },
    };
    return placeholders[fieldKey]?.[locale] || "";
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

  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setState((s) => ({ ...s, [key]: e.target.value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert(locale === "ar" ? "يرجى اختيار ملف صورة." : "Please select an image file.");
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
    setTimeout(() => {
      setStatus("sent");
      setState({
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
      setImagePreviewUrl(null);
    }, 800);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="ui-card rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8"
    >
      <div className="mb-6">
        <h3 className="text-display text-2xl font-medium md:text-3xl">{config.title}</h3>
        {"subtitle" in config && config.subtitle && (
          <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{config.subtitle}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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

        <Field label={isContact ? dict.contact.form.fields.date : dict.services.sampleForm.fields.deliveryDate} required>
          <input
            type="date"
            required
            value={state.date}
            onChange={update("date")}
            className={inputClass}
          />
        </Field>

        <Field label={config.fields.materialsSystem} required className="md:col-span-2">
          <textarea
            required
            rows={3}
            value={state.materialsSystem}
            onChange={update("materialsSystem")}
            placeholder={getPlaceholder("materialsSystem")}
            className={`${inputClass} resize-none py-3 h-auto`}
          />
        </Field>

        {isContact && (
          <Field label={dict.contact.form.fields.contactPerson} required>
            <input
              type="text"
              required
              value={state.contactPerson}
              onChange={update("contactPerson")}
              placeholder={getPlaceholder("contactPerson")}
              className={inputClass}
            />
          </Field>
        )}

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

        <Field label={locale === "ar" ? "نسخة كربونية للبريد الإلكتروني (اختياري)" : "CC Email(s) (optional)"} className="md:col-span-2">
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
            {locale === "ar" ? "صورة العينة المطلوبة (اختياري)" : "Reference Image / Spec Sample (optional)"}
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
                {locale === "ar" ? "اضغط لرفع صورة أو اسحبها هنا" : "Click to upload an image or drag & drop"}
              </p>
              <p className="text-[10px] text-[var(--color-fg-subtle)] mt-1">
                {locale === "ar" ? "يدعم صيغ PNG, JPG, WEBP (بحد أقصى 5 ميجابايت)" : "Supports PNG, JPG, WEBP (max 5MB)"}
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
