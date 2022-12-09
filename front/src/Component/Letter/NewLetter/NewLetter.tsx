import React, {useRef, useState} from "react";
import n from "../Letter.module.css";
import useAutosizeTextArea, {useAppDispatch} from "../../../hook";
import {setNewLetterThunkCreate} from "../../../Redux/Slice/Thunks/email-thunks-move";

interface INewLetterData {
    title: HTMLInputElement,
    text: HTMLInputElement,
    sender: HTMLInputElement
}

const NewLetter: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [value, setValue] = useState("");
    const [title, setTitle] = useState('Title')

    const dispatch = useAppDispatch();

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useAutosizeTextArea(textAreaRef.current, value);

    const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = evt.target?.value;
        setValue(val);
    };

    let handleSubmit: React.FormEventHandler<HTMLFormElement & INewLetterData> = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const {title, text, sender} = form;
        dispatch(setNewLetterThunkCreate({
            title: title.value,
            text: text.value,
            sender: sender.value,
        }))
        alert('message sent');
        setIsOpen(false);
        if (formRef.current != null) formRef.current.reset();
        setTitle('Title');
    }

    return (
        <>
            <button className={n.button_new_letter} onClick={() => {
                setIsOpen(true)
            }}>
                🖉ᅠNew Letter
            </button>

            <div className={n.popup + (isOpen ? " " + n.open : "")}>
                <form ref={formRef} onSubmit={handleSubmit} className={n.popup_box}>
                    <div className={n.popup_header}>
                        <p>{title}</p>
                        <a className={n.popup_close} onClick={() => {
                            setIsOpen(false);
                        }}>✖</a>
                    </div>
                    <div className={n.popup_middle}>
                        <input name="sender" placeholder="User" required/>
                        <input name="title" placeholder="Title" onBlur={(e) => {
                            setTitle(e.target.value)
                        }} required/>
                    </div>

                    <div className={n.popup_body}>
                        {files.map(c => {
                            return (
                                <div className={n.file}>
                                    <div className={n.file_download}>{c.name} </div>
                                    <button onClick={() => {
                                        setFiles(files.filter(e => {
                                            return e != c;
                                        }))
                                    }}>✖
                                    </button>
                                </div>
                            )
                        })}
                        <textarea name="text" onChange={handleChange} ref={textAreaRef} rows={1} />
                    </div>

                    <div className={n.popup_bottom}>
                        <button type="submit">Sent</button>
                        <label htmlFor="file-upload" className={n.file_upload}>📎</label>
                        <input id="file-upload" type="file" onChange={(e) => {
                            let fileList = e.target.files;
                            if (fileList != null && fileList[0] != null) setFiles([...files, fileList[0]]);

                        }}/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default React.memo(NewLetter);



