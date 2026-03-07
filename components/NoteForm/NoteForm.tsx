"use client"

/*css*/
import css from "./NoteForm.module.css";

/*form*/
import * as Yup from "yup";

/*hooks*/
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateNoteStore } from "@/lib/store/noteStore";

/*services*/
import { createNote } from "@/lib/api";

/*types*/
import type { CreateNoteProps } from "@/lib/api";

interface NoteFormProps {
    onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
    const { draft, setDraft, clearDraft } = useCreateNoteStore();

    const fieldId = useId();

    const [error, setError] = useState("");

    type variesOfInputs = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

    const handleChange = (event: React.ChangeEvent<variesOfInputs>) => {
        const { name, value } = event.target;
        if (name === "title") {
            setDraft({ title: value });
        } else if (name === "content") {
            setDraft({ content: value });
        } else if (name === "tag") {
            setDraft({ tag: value as CreateNoteProps["tag"] });
        }
    };

    const queryClient = useQueryClient();

    const mutation = useMutation({
    mutationFn: (data: CreateNoteProps) => createNote(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft();
            onClose();
        },
        onError: (error) => {
            console.error("Create note error:", error);
        },
    });

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    try {
        event.preventDefault();
        await Schema.validate(draft);
        await mutation.mutateAsync(draft);
        setError("");
    } catch (error) {
        console.error("Submit error:", error);

        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError("Something went wrong");
        }
    };
  };

    const Schema = Yup.object().shape({
        title: Yup.string()
            .min(3, "Title must be at least 3 characters")
            .max(50, "Title is too long")
            .required("Title is required!"),
        content: Yup.string()
            .max(500, "Content is too long"),
        tag: Yup.string()
            .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
            .required("Tag is required"),
    });

    const router = useRouter();

    const cancelForm = () => {
        onClose();
        router.back();
    }

    return (
        <form className={css.form} name="createForm" onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-title`}>Title</label>
                <input
                    value={draft.title}
                    onChange={handleChange}
                    id={`${fieldId}-title`}
                    name="title"
                    type="text"
                    className={css.input}
                />
                {error && <span id="title" className={css.error}>{error}</span>}
            </div>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-content`}>Content</label>
                <textarea
                    value={draft.content}
                    onChange={handleChange}
                    id={`${fieldId}-content`}
                    name="content"
                    rows={8}
                    className={css.textarea}
                />
                {error && <span id="content" className={css.error}>{error}</span>}
            </div>
            <div className={css.formGroup}>
                <label htmlFor={`${fieldId}-tag`}>Tag</label>
                <select
                    value={draft.tag}
                    onChange={handleChange}
                    id={`${fieldId}-tag`}
                    name="tag"
                    className={css.select}>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
                {error && <span id="tag" className={css.error}>{error}</span>}
            </div>
            <div className={css.actions}>
                <button onClick={() => cancelForm()} type="button" className={css.cancelButton}>
                    Cancel
                </button>
                <button type="submit" formAction={() => router.back()} className={css.submitButton}>
                    Create note
                </button>
            </div>
        </form>
    )
}